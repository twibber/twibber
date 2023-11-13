<script>
	import Display from "$components/Display.svelte";
	import Post from "$components/Post.svelte";
	import {onMount} from "svelte";
	import {invalidateAll} from "$app/navigation";

	let posts = [
		{
			id: 1,
		},
		{
			id: 1,
		},
		{
			id: 1,
		},
		{
			id: 1,
		}
	]

    onMount(async () => invalidateAll())

    export let data
</script>

<Display
        title="Feed"
>
    {#if data.session}
        <div class="flex flex-col border-b border-gray-800 p-4 w-full">
            <textarea type="text" class="w-full rounded-md bg-gray-950 text-gray-200 p-4 focus:ring-0 focus:outline-none border-2 border-gray-900 focus:border-blue-900" placeholder="Tweeb your mind..."/>
            <div class="flex flex-row justify-end items-center gap-2">
                <button class="border-2 border-gray-800 hover:bg-blue-600/[25%] hover:border-blue-600/[25%] rounded-full text-white px-4 py-1 mt-2 transition">
                    Tweeb
                </button>
            </div>
        </div>
    {/if}


    <ul role="list" class="space-y-3 p-4">
        {#each posts as post}
            <Post/>
        {/each}
    </ul>
</Display>