<script lang="ts">
	import { userAnswers } from "$lib/stores/answers";
	import type { Question } from "$lib/types";

	export let question: Question;
	export let showAnswer: boolean;

	const correctAnswer = question.correctAnswer;
	const questionId: string = crypto.randomUUID();
	let userAnswer: string = "";

	const onChangeHandler = (answerId: string) => {
		const questionNumber: string = answerId.slice(0, 2);

		userAnswer = answerId;
		$userAnswers[questionNumber] = answerId;
	};
</script>

<section class="mb-10">
	<p class="mb-3 font-bold text-lg">{question.question}</p>

	{#each question.answers as answer}
		<label class="w-fit label cursor-pointer">
			<input
				type="radio"
				name={questionId}
				class="radio radio-primary checked:bg-blue-500"
				on:change={() => onChangeHandler(answer.id)}
			/>

			<span
				class="ml-5 label-text"
				class:text-red-500={showAnswer && answer.id === userAnswer && userAnswer !== correctAnswer}
				class:text-green-500={showAnswer && answer.id === correctAnswer}
				class:font-bold={showAnswer && answer.id === correctAnswer}>{answer.answer}</span
			>
		</label>
	{/each}
</section>
