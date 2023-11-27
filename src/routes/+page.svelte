<script>
	import Display from "$components/Display.svelte";
	import Post from "$components/Post.svelte";
	import {invalidate} from "$app/navigation";
	import {request} from "$lib/request.js";
	import {toast} from "$lib/toaster.js";
	import {errors, handleErrors} from "$lib/errors.js";

	let content = "";

	async function handlePostCreate() {
		return await request({
			method: 'POST',
			url: '/posts',
			body: {
				content,
			},
			captcha: "post",
		}).then((res) => {
			if (res?.body?.success) {
				content = "";
				toast.success("Post created!");
				invalidate("app:posts");
			}
		}).catch(handleErrors);
	}

	export let data;

	let errorMessages = [];
	errors.subscribe((fields) => {
		errorMessages = fields.filter((field) => field.name === "content").map((field) => field.errors[0]);
	});
</script>

<Display
        title="Feed"
>
    {#if data?.session}
        <form on:submit|preventDefault={handlePostCreate}
              class="flex flex-col relative border-b border-gray-800 p-4 w-full">
            <textarea bind:value={content}
                      class="w-full rounded-md bg-gray-950 text-gray-200 p-4 focus:ring-0 focus:outline-none border-2 border-gray-900 focus:border-blue-900"
                      placeholder="Tweeb your mind..."/>
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


    <ul role="list" class="space-y-3 p-4">
        {#each data?.posts || [] as post (post.id)}
            <Post {post}/>
        {/each}
    </ul>
</Display>