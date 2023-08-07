<script lang="ts">
	import { onMount } from "svelte";

	let input: string = "";

	const onSubmit = async () => {
		// const test = await fetch("/api/generate", {
    //   headers: {
    //     "Content-Type": "application/json"
		// 	},
    //   method: "POST",
		// 	body: JSON.stringify(input)
		// });

    input = "";

    console.log('input: ', input);
	};

  onMount(async () => {
		const test = await fetch("/api/generate", {
      headers: {
        "Content-Type": "application/json"
			},
		});

    input = "";
    const asd = await test.json()
    console.log('asd: ', asd);
	});
</script>

<section class="p-5">
	<select class="select select-bordered w-full max-w-xs">
		<option disabled selected>Who shot first?</option>
		<option>Han Solo</option>
		<option>Obi Wan</option>
	</select>

	<hr class="my-10" />

	<p>Who is this person?</p>

	<label class="w-fit label cursor-pointer">
		<input type="radio" name="radio-10" class="radio mr-4 checked:bg-red-500" />
		<span class="label-text">Red pill</span>
	</label>

	<label class="w-fit label cursor-pointer">
		<input type="radio" name="radio-10" class="radio mr-4 checked:bg-blue-500" />
		<span class="label-text">Blue pill</span>
	</label>

	<hr class="my-10" />

	<input
		type="text"
		placeholder="Type here"
		class="input input-bordered w-full max-w-xs"
		bind:value={input}
	/>
	<button class="btn btn-primary ml-3" on:click={onSubmit}>Primary</button>
</section>
