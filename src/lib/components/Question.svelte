<script lang="ts">
	import type { Question } from "$lib/types";

	export let question: Question;
</script>

<section class="mb-10">
	<p class="mb-3 font-bold text-lg">{question.question}</p>

	{#each question.answers as item}
		<label class="w-fit label cursor-pointer">
			<input
				type="radio"
				name="radio-10"
				class="radio radio-primary checked:bg-blue-500"
				data-id={item.id}
			/>
			<span class="ml-5 label-text">{item.answer}</span>
		</label>
	{/each}
</section>
