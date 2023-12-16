<script>
	import { invalidate } from '$app/navigation';
	import { toast } from '$lib/toaster.js';
	import { request } from '$lib/request.js';
	import { handleErrors } from "$lib/errors.js";
	import { page } from "$app/stores";

	export let user;

	let isLoading = false;

	async function follow() {
		isLoading = true;
		const followAction = user.you_follow ? 'DELETE' : 'POST';
		try {
			const response = await request({
				method: followAction,
				url: `/users/${user.id}/follow`
			});

			if (response.body.success) {
				toast.success(`You ${user.you_follow ? 'unfollowed' : 'followed'} ${user.username}`);
				user.you_follow = !user.you_follow; // Directly update the user object

				void invalidate('app:profile');
				void invalidate('app:users');
				void invalidate('app:followers');
				void invalidate('app:following');
			}
		} catch (error) {
			handleErrors(error);
		} finally {
			isLoading = false;
		}
	}
</script>

{#if user.id === $page?.data?.session?.connection?.user?.id}
    <a href={`/u/${$page?.data?.session?.connection?.user?.username}/settings`}
       class="btn bg-gray-600 hover:bg-gray-700">
        Settings
    </a>
{:else}
    <button
            disabled={isLoading}
            class={`btn ${user.you_follow ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            on:click|stopPropagation|preventDefault={follow}
    >
        {#if isLoading}
            {user.you_follow ? 'Unfollowing...' : 'Following...'}
        {:else}
            {user.you_follow ? 'Unfollow' : 'Follow'}
        {/if}
    </button>
{/if}

<style lang="postcss">
    .btn {
        @apply text-white font-medium rounded transition py-1 px-2 text-xs md:text-base sm:py-2 sm:px-4;
    }
</style>
