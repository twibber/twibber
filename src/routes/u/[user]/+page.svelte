<script>
	import Display from "$components/Display.svelte";

	import UserData from "$components/UserData.svelte";

	import Post from "$components/Post.svelte";

	export let data;
</script>

<Display
        title={data?.profile?.user?.username || "Profile"}
>
    <UserData profile={data?.profile} session={data?.session}/>

    <ul role="list" class="space-y-3 p-4">
        {#each data?.profile?.posts || [] as post (post.id)}
            <Post {post}/>
        {/each}
    </ul>
</Display>