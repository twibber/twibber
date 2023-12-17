<script>
	import Icon from "@iconify/svelte";
	import UserButtons from "$components/UserButtons.svelte";
	import { request, getURL } from "$lib/request.js";
	import { invalidate } from "$app/navigation";
	import { handleErrors } from "$lib/errors.js";

	export let profile;
	export let session;

	let banner, avatar;

	async function handleUpload(type) {
		let form, action, method;

		if (type === "banner") {
			form = banner;
		} else if (type === "avatar") {
			form = avatar;
		} else {
			return;
		}

		action = getURL(`/account/image/${type}`);
		method = 'POST';

		const data = new FormData(form);

		try {
			let response = await fetch(action, {
				method: method,
				body: data,
				credentials: 'include'
			});

			response = await response.json();

			if (response.success) {
				await invalidate('app:profile');
			} else {
				handleErrors(response);
			}
		} catch (error) {
			console.error('Error uploading image:', error);
			// Handle fetch error
		}
	}
</script>

<div class="relative w-full">
    <img src={profile?.user?.banner}
         alt="banner"
         class="w-full h-64 object-cover object-center bg-gray-950 m-auto"/>

    {#if profile?.user?.id === session?.connection?.user?.id}
        <form bind:this={banner} enctype="multipart/form-data" on:submit|preventDefault={() => handleUpload("banner")}>
            <label for="banner"
                   class="absolute top-3 right-3 p-1 sm:p-2 rounded-full text-gray-400 bg-gray-700 hover:text-gray-300 hover:bg-gray-800 transition cursor-pointer">
                <Icon icon="mdi:edit" class="w-4 h-4 text-gray-400 text-current"/>
                <input type="file" name="banner" id="banner" class="hidden" accept="image/*"
                       on:change={() => banner.requestSubmit()}/>
            </label>
        </form>
    {/if}

    <!-- Avatar Container -->
    <div class="absolute bottom-0 left-0 w-full px-4 flex justify-center">
        <div class="relative w-32 h-32 border-4 border-gray-900 -mb-4 sm:-mb-8 md:-mb-16 mx-auto">
            <!-- User Avatar -->
            <img src={profile?.user?.avatar}
                 alt="avatar"
                 class="w-full h-full object-cover object-center"/>

            <!-- Edit Avatar -->
            {#if profile?.user?.id === session?.connection?.user?.id}
                <form bind:this={avatar} enctype="multipart/form-data" on:submit|preventDefault={() => handleUpload("avatar")}>
                    <label for="avatar"
                           class="absolute top-1 right-1 p-1 sm:p-2 rounded-full text-gray-400 bg-gray-700 hover:text-gray-300 hover:bg-gray-800 transition cursor-pointer">
                        <Icon icon="mdi:edit" class="w-4 h-4 text-gray-400 text-current"/>
                        <input type="file" name="avatar" id="avatar" class="hidden" accept="image/*"
                               on:change={() => avatar.requestSubmit()}/>
                    </label>
                </form>
            {/if}
        </div>
    </div>
</div>

<div class="flex flex-row justify-between items-center w-full bg-gray-900 border-b border-gray-800 p-4">
    <div class="flex flex-col">
        <h1 class="text-lg md:text-xl font-bold flex flex-row justify-start items-center gap-1 w-64 truncate">{profile?.user?.display_name}
            {#if profile?.user?.admin}
                <Icon icon="material-symbols:verified" class="w-5 h-5 text-yellow-500"/>
            {:else if profile?.user?.verified_person}
                <Icon icon="material-symbols:verified" class="w-5 h-5 text-blue-500"/>
            {/if}
        </h1>
        <div class="text-sm">
            <span class="text-gray-400">@{profile?.user?.username}</span>
            {#if profile?.user?.id === session?.connection?.user?.id}
                <span class="badge">Yourself</span>
            {:else if profile?.user?.you_follow && profile?.user?.follows_you}
                <span class="badge">Friends</span>
            {:else if profile?.user?.follows_you}
                <span class="badge">Follows you</span>
            {:else if profile?.user?.you_follow}
                <span class="badge">Following</span>
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
        <UserButtons user={profile?.user}/>
    </div>
</div>

<style lang="postcss">
    .badge {
        @apply text-gray-400 text-xs h-full w-full bg-gray-950 py-0.5 px-1 rounded
    }
</style>