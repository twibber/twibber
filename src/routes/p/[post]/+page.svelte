<script>
	import Display from "$components/Display.svelte";
	import Post from "$components/Post.svelte";
	import PostContent from "$components/PostContent.svelte";
	import {request} from "$lib/request.js";
	import {handleErrors} from "$lib/errors.js";
	import {invalidate} from "$app/navigation";
	import {toast} from "$lib/toaster.js";

	export let data;

	let content = "";

	async function handleReply() {
		return await request({
			method: 'POST',
			url: '/posts/' + data?.post?.id + '/reply',
			body: {
				content,
			},
			captcha: "post",
		}).then((res) => {
			if (res?.body?.success) {
				content = "";
				toast.success("Post created!");
				void invalidate("app:post");
			}
		}).catch(handleErrors);
	}
</script>

<Display title={"Post"}>
    <ul role="list" class="p-4">
        <Post post={data?.post}/>
    </ul>

    <hr class="border-gray-800">

    <PostContent bind:content={content} handler={handleReply} placeholder={"Got something to say?"}/>

    <ul role="list" class="space-y-3 p-4">
        {#each data?.post?.posts || [] as post (post.id)}
            <Post {post}/>
        {/each}
    </ul>
</Display>