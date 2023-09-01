<script lang="ts">
	import { userAnswers } from "$lib/stores/answers";
	import type { Question } from "$lib/types";

	export let question: Question;
	export let showCorrectAnswer: boolean;

	const correctAnswer = question.correctAnswer;
	const questionId: string = crypto.randomUUID();

	const onChangeHandler = (answerId: string) => {
		const questionNumber: string = answerId.slice(0, 2);
		$userAnswers[questionNumber] = answerId;
	};
</script>

<section class="mb-10">
	<p class="mb-3 font-bold text-lg">{question.question}</p>

	{#each question.answers as item}
		<label class="w-fit label cursor-pointer">
			<input
				type="radio"
				name={questionId}
				class="radio radio-primary checked:bg-blue-500"
				class:bg-green-500={showCorrectAnswer && item.id === correctAnswer}
				on:change={() => onChangeHandler(item.id)}
			/>

			<span
				class="ml-5 label-text"
				class:text-green-500={showCorrectAnswer && item.id === correctAnswer}
				class:font-bold={showCorrectAnswer && item.id === correctAnswer}>{item.answer}</span
			>
		</label>
	{/each}
</section>
