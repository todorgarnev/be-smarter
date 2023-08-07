import { json } from "@sveltejs/kit";
import { OPENAI_KEY } from "$env/static/private";
import type { ChatCompletionRequestMessage, CreateChatCompletionRequest } from "openai";
import type { RequestHandler } from "./$types";

export const Post: RequestHandler = async ({ request }) => {
	try {
		if (!OPENAI_KEY) {
			throw new Error("OPENAI_KEY env variable not set");
		}

		const requestData = await request.json();

		if (!requestData) {
			throw new Error("No request data");
		}

		const reqMessages: ChatCompletionRequestMessage[] = requestData.messages;

		if (!reqMessages) {
			throw new Error("No messages provided");
		}

		const moderationRes = await fetch("https://api.openai.com/v1/moderations", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${OPENAI_KEY}`
			},
			method: "POST",
			body: JSON.stringify({
				input: reqMessages[reqMessages.length - 1].content
			})
		});

		const moderationData = await moderationRes.json();
		const [results] = moderationData.results;

		if (results.flagged) {
			throw new Error("Query flagged by openai");
		}

		const chatRequestOpts: CreateChatCompletionRequest = {
			model: "gpt-3.5-turbo",
			messages: reqMessages,
			temperature: 0.9
		};
		const chatResponse = await fetch("https://api.openai.com/v1/chat/completions", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${OPENAI_KEY}`
			},
			method: "POST",
			body: JSON.stringify(chatRequestOpts)
		});

		if (!chatResponse.ok) {
			const err = await chatResponse.json();
			throw new Error(err);
		}

		return new Response(chatResponse.body);
	} catch (err) {
		console.error(err);
		return json({ error: "There was an error processing your request" }, { status: 500 });
	}
};
