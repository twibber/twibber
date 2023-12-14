<script>
	import {errors} from "$lib/errors.js";
	import {page} from "$app/stores";

	export let content = "";

	export let handler;
	export let placeholder = "Tweeb your mind...";

	let errorMessages = [];
	errors.subscribe((fields) => {
		errorMessages = fields.filter((field) => field.name === "content").map((field) => field.errors[0]);
	});
</script>

{#if $page?.data?.session}
    <form on:submit|preventDefault={handler}
          class="flex flex-col relative border-b border-gray-800 p-4 w-full">
            <textarea bind:value={content}
                      class="w-full rounded-md bg-gray-950 text-gray-200 p-4 focus:ring-0 focus:outline-none border-2 border-gray-900 focus:border-blue-900"
                      placeholder={placeholder}/>
        {#if errorMessages?.length > 0}
            <div class="text-xs text-red-600 font-medium">{errorMessages[0]}</div>
        {/if}
        <div class="flex flex-row justify-end items-center gap-2">
            <button class="border-2 border-gray-800 hover:bg-blue-600/[25%] hover:border-blue-600/[25%] rounded-full text-white px-4 py-1 mt-2 transition">
                Tweeb
            </button>
        </div>
    </form>
{/if}