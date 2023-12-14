<script>
	import Icon from "@iconify/svelte";

	import FollowButton from "$components/FollowButton.svelte";

	export let profile;
	export let session;
</script>

<div class="relative w-full">
    <img src={profile?.user?.banner || "https://open-placeholder.vercel.app/1920x1080"}
         alt="banner"
         class="w-full h-64 object-cover object-center bg-gray-950 m-auto"/>
    <!--Rounded image-->
    <div class="absolute bottom-0 left-0 w-full px-4">
        <img class="bg-gray-800 w-32 h-32 border-4 border-gray-900 -mb-4 sm:-mb-8 md:-mb-16 m-auto object-cover object-center"
             src={profile?.user?.avatar || "https://open-placeholder.vercel.app/100"}
             alt="avatar"/>
    </div>
</div>

<div class="flex flex-row justify-between items-center w-full bg-gray-900 border-b border-gray-800 p-4">
    <div class="flex flex-col">
        <h1 class="text-lg md:text-xl font-bold flex flex-row justify-start items-center gap-1 w-32 truncate">{profile?.user?.display_name}
            {#if profile?.user?.admin}
                <Icon icon="material-symbols:verified" class="w-5 h-5 text-yellow-500"/>
            {:else if profile?.user?.verified_person}
                <Icon icon="material-symbols:verified" class="w-5 h-5 text-blue-500"/>
            {/if}
        </h1>
        <div class="text-sm">
            <span class="text-gray-400">@{profile?.user?.username}</span>
            {#if profile?.user?.following && profile?.user?.follows_you}
                <span class="text-gray-400 text-xs h-full w-full bg-gray-900 py-1 px-2 rounded">Friends</span>
            {:else if profile?.user?.follows_you}
                <span class="text-gray-400 text-xs h-full w-full bg-gray-900 py-1 px-2 rounded">Follows you</span>
            {:else if profile?.user?.following}
                <span class="text-gray-400 text-xs h-full w-full bg-gray-900 py-1 px-2 rounded">Following</span>
            {/if}
        </div>
        <div class="mt-2 w-full">
            {#if profile?.user?.counts}
                <div class="flex flex-wrap justify-start md:justify-around text-xs gap-2 mt-2 w-24 sm:w-48 md:w-full">
                    <a href={`/u/${profile?.user?.username}/followers`}>
                        <span class="font-bold">{profile?.user?.counts?.followers}</span>
                        <span class="text-gray-400">Followers</span>
                    </a>
                    <a href={`/u/${profile?.user?.username}/following`}>
                        <span class="font-bold">{profile?.user?.counts?.following}</span>
                        <span class="text-gray-400">Following</span>
                    </a>
                    <a href={`/u/${profile?.user?.username}`}>
                        <span class="font-bold">{profile?.user?.counts?.posts}</span>
                        <span class="text-gray-400">Posts</span>
                    </a>
                    <div>
                        <span class="font-bold">{profile?.user?.counts?.likes}</span>
                        <span class="text-gray-400">Likes</span>
                    </div>
                </div>
            {/if}
        </div>
    </div>
    <div>
        <!-- Show settings if own page -->
        {#if profile?.user?.id === session?.connection?.user?.id}
            <a href={`/u/${profile?.user?.username}/settings`}
               class="btn bg-gray-600 hover:bg-gray-700">
                Settings
            </a>
        {:else}
            <FollowButton user={profile?.user}/>
        {/if}
    </div>
</div>