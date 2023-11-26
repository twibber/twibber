<script>
	import Display from "$components/Display.svelte";
	import Icon from "@iconify/svelte";
	import Post from "$components/Post.svelte";

	export let data;
</script>

<Display
        title={data?.profile?.user?.username || "Profile"}
>
    <div class="relative w-full">
        <img src={data?.profile?.user?.banner || "https://open-placeholder.vercel.app/1920x1080"}
             alt="banner"
             class="w-full h-64 object-cover object-center bg-gray-950 m-auto"/>
        <!--Rounded image-->
        <div class="absolute bottom-0 left-0 w-full px-4">
            <img class="bg-gray-800 w-32 h-32 border-4 border-gray-900 -mb-16 m-auto object-cover object-center"
                 src={data?.profile?.user?.avatar || "https://open-placeholder.vercel.app/100"}
                 alt="avatar"/>
        </div>
    </div>
    <div class="flex flex-row justify-between items-center w-full bg-gray-900 border-b border-gray-800 p-4">
        <div class="flex flex-col">
            <h1 class="text-xl font-bold flex flex-row justify-start items-center gap-1 w-32 truncate">{data?.profile?.user?.display_name}
                {#if data?.profile?.user?.username === "petar"}
                    <Icon icon="material-symbols:verified" class="w-5 h-5 text-blue-500"/>
                {/if}
            </h1>
            <div class="text-sm">
                <span class="text-gray-400">@{data?.profile?.user?.username}</span>
                {#if data?.profile?.user?.following && data?.profile?.user?.follows_you}
                    <span class="text-gray-400 text-xs h-full w-full bg-gray-900 py-1 px-2 rounded">Friends</span>
                {:else if data?.profile?.user?.follows_you}
                    <span class="text-gray-400 text-xs h-full w-full bg-gray-900 py-1 px-2 rounded">Follows you</span>
                {:else if data?.profile?.user?.following}
                    <span class="text-gray-400 text-xs h-full w-full bg-gray-900 py-1 px-2 rounded">Following</span>
                {/if}
            </div>
        </div>
        <div>
            {#if data?.profile?.user?.id === data.session.connection?.user?.id}
                <button class="btn bg-gray-600 hover:bg-gray-700">
                    Settings
                </button>
            {:else if data?.profile?.user?.following}
                <button class="btn bg-red-500 hover:bg-red-600">
                    Unfollow
                </button>
            {:else}
                <button class="btn bg-blue-600 hover:bg-blue-700">
                    Follow
                </button>
            {/if}
        </div>
    </div>

    <ul role="list" class="space-y-3 p-4">
        {#each data?.profile?.posts || [] as post (post.id)}
            <Post {post}/>
        {/each}
    </ul>
</Display>

<style lang="postcss">
    .btn {
        @apply text-white font-medium py-2 px-4 rounded transition;
    }
</style>