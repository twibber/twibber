<script>
	import Template from './Template.svelte';

	import {invalidate, invalidateAll} from '$app/navigation';
	import {request} from '$lib/request.js';
	import {hideModal} from '$lib/modals.js';
	import {handleErrors} from '$lib/errors.js';
	import {toast} from "$lib/toaster.js";
	import TextareaInput from "$components/Modal/TextareaInput.svelte";

	export let post;

	let content = "";

	async function repostPost() {
		return await request({
			method: 'POST',
			url: `/posts/${post?.id}/repost`,
			body: {
				content: content,
			},
		}).then((res) => {
			if (res?.body?.success) {
				hideModal();
				toast.success("Reposted successfully!");
				invalidate("posts")
			}
		}).catch(handleErrors);
	}
</script>

<Template
        title={"Repost"}
        confirm={{
            name: 'Repost',
            handler: repostPost,
        }}
>
    <TextareaInput id="content" name="Content" placeholder="Content" bind:value={content}/>
</Template>
