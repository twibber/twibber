<script>
	import Display from "$components/Display.svelte";
	import Post from "$components/Post.svelte";
	import PostContent from "$components/PostContent.svelte";
	import {handleErrors} from "$lib/errors.js";
	import {invalidate} from "$app/navigation";
	import {toast} from "$lib/toaster.js";
	import {request} from "$lib/request.js";

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
				void invalidate("app:posts");
			}
		}).catch(handleErrors);
	}

	export let data;
</script>

<Display
        title="Feed"
>
    <PostContent handler={handlePostCreate} bind:content={content}/>

    <ul role="list" class="space-y-3 p-4">
        {#each data?.posts || [] as post (post.id)}
            <Post {post}/>
        {/each}
    </ul>
</Display>