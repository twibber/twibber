<script>
	import Display from "$components/Display.svelte";
	import Post from "$components/Post.svelte";

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
</script>

<Display
        title="Feed"
>
    <ul role="list" class="space-y-3 p-4">
        {#each posts as post}
            <Post/>
        {/each}
    </ul>
</Display>