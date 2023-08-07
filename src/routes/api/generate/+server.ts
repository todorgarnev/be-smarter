import { json } from "@sveltejs/kit";
import { OPENAI_KEY } from "$env/static/private";
import type { ChatCompletionRequestMessage, CreateChatCompletionRequest } from "openai";
import type { RequestHandler } from "./$types";

// export const POST: RequestHandler = async ({ request }) => {
// 	try {
// 		if (!OPENAI_KEY) {
// 			throw new Error("OPENAI_KEY env variable not set");
// 		}

// 		const requestData = await request.json();
// 		console.log("requestData: ", requestData);

// 		if (!requestData) {
// 			throw new Error("No request data");
// 		}

// 		const moderationRes = await fetch("https://api.openai.com/v1/moderations", {
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: `Bearer ${OPENAI_KEY}`
// 			},
// 			method: "POST",
// 			body: JSON.stringify({
// 				input: reqMessages[reqMessages.length - 1].content
// 			})
// 		});

// 		const moderationData = await moderationRes.json();
// 		const [results] = moderationData.results;

// 		if (results.flagged) {
// 			throw new Error("Query flagged by openai");
// 		}

// 		const chatRequestOpts: CreateChatCompletionRequest = {
// 			model: "gpt-3.5-turbo",
// 			messages: reqMessages,
// 			temperature: 0.9
// 		};
// 		const chatResponse = await fetch("https://api.openai.com/v1/chat/completions", {
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: `Bearer ${OPENAI_KEY}`
// 			},
// 			method: "POST",
// 			body: JSON.stringify(chatRequestOpts)
// 		});

// 		if (!chatResponse.ok) {
// 			const err = await chatResponse.json();
// 			throw new Error(err);
// 		}

// 		return new Response(chatResponse.body);
// 	} catch (err) {
// 		console.error(err);
// 		return json({ error: "There was an error processing your request" }, { status: 500 });
// 	}
// };

export const GET: RequestHandler = async () => {
	try {
		if (!OPENAI_KEY) {
			throw new Error("OPENAI_KEY env variable not set");
		}

		const input =
			"Give me five questions about Bulgarian history. Each question should have four answers. Give me also the correct answer. The returned data should be a json with the following structure: array of property 'question' with the question, property 'answers' which should be an array of objects, each object should contain property 'id' which should be unique and property 'answer' with an answer, and property 'correctAnswer' which should contain the correct answer's id from the previous property.";
		const requestMessage: ChatCompletionRequestMessage = {
			role: "system",
			content: input
		};

		const moderationRes = await fetch("https://api.openai.com/v1/moderations", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${OPENAI_KEY}`
			},
			method: "POST",
			body: JSON.stringify({ input })
		});

		const moderationData = await moderationRes.json();

		if (moderationData.error) {
			return json({ error: moderationData.error.message }, { status: 500 });
		}

		const [results] = moderationData.results;

		if (results.flagged) {
			throw new Error("Query flagged by openai");
		}

		const chatRequestOpts: CreateChatCompletionRequest = {
			model: "gpt-3.5-turbo",
			messages: [requestMessage],
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
