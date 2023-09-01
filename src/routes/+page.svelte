<script lang="ts">
	import { onMount } from "svelte";
	import Question from "$lib/components/Question.svelte";
	import { userAnswers } from "$lib/stores/answers";
	import { numberOfCorrectAnswers } from "$lib/utils";

	const mockData = {
		questions: [
			{
				question: "Кой български владетел управляваше през 7-ми век?",
				answers: [
					{
						id: "q1a",
						answer: "Хан Крум"
					},
					{
						id: "q1b",
						answer: "Хан Тервел"
					},
					{
						id: "q1c",
						answer: "Хан Аспарух"
					},
					{
						id: "q1d",
						answer: "Хан Кубрат"
					}
				],
				correctAnswer: "q1c"
			},
			{
				question: "Коя българска княгиня управляваше в Странджа планина през 13 век?",
				answers: [
					{
						id: "q2a",
						answer: "Княгиня Тамара"
					},
					{
						id: "q2b",
						answer: "Княгиня Косара"
					},
					{
						id: "q2c",
						answer: "Княгиня Витиня"
					},
					{
						id: "q2d",
						answer: "Княгиня Милтиада"
					}
				],
				correctAnswer: "q2b"
			},
			{
				question: "Кой български цар стана известен с прозвището 'Освободител'?",
				answers: [
					{
						id: "q3a",
						answer: "Цар Симеон Велики"
					},
					{
						id: "q3b",
						answer: "Цар Иван Асен II"
					},
					{
						id: "q3c",
						answer: "Цар Борис I"
					},
					{
						id: "q3d",
						answer: "Цар Освободител"
					}
				],
				correctAnswer: "q3d"
			},
			{
				question: "Коя битка е важната победа за България през 1912 година?",
				answers: [
					{
						id: "q4a",
						answer: "Битката при Кресна"
					},
					{
						id: "q4b",
						answer: "Битката при Марица"
					},
					{
						id: "q4c",
						answer: "Битката при Лозенград"
					},
					{
						id: "q4d",
						answer: "Битката при Скопие"
					}
				],
				correctAnswer: "q4a"
			},
			{
				question: "Кога е обявена България за самостоятелна държава?",
				answers: [
					{
						id: "q5a",
						answer: "3 март 1878 г."
					},
					{
						id: "q5b",
						answer: "22 септември 1908 г."
					},
					{
						id: "q5c",
						answer: "5 октомври 1908 г."
					},
					{
						id: "q5d",
						answer: "9 септември 1944 г."
					}
				],
				correctAnswer: "q5a"
			}
		]
	};

	const correctAnswers = mockData.questions.map((question) => question.correctAnswer);
	let loading: boolean = true;
	let showAnswer: boolean = false;

	$: answers = Object.values($userAnswers);

	onMount(async () => {
		// const res = await fetch("/api/generate", {
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	}
		// });

		// const data = await res.json();

		// loading = false;

		setTimeout(() => {
			loading = false;
		}, 1000);
		// console.log("data>> ", JSON.parse(res.choices[0].message.content));
	});

	const submitHandler = () => {
		showAnswer = true;
	};
</script>

<section class="p-5 flex items-start flex-col">
	{#if loading}
		<span class="block mx-auto loading loading-infinity w-40" />
	{:else}
		{#each mockData.questions as question}
			<Question {question} {showAnswer} />
		{/each}

		<div class="flex justify-between items-center w-full">
			<button class="btn btn-secondary" on:click={submitHandler} disabled={answers.length < 5}>Submit</button>

			{#if showAnswer}
				<p class="text-lg font-bold">
					Верни отговори:
					<span class="text-green-500">{numberOfCorrectAnswers(answers, correctAnswers)}</span>
					/5
				</p>
			{/if}
		</div>
	{/if}
</section>
