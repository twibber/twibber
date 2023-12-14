<script>
	import { invalidate } from '$app/navigation';
	import { toast } from '$lib/toaster.js';
	import { request } from '$lib/request.js';
	import { writable } from 'svelte/store';
	import {handleErrors} from "$lib/errors.js";

	export let user;

	let userW = writable(user);

	let promise = null;

	async function follow() {
		promise = request({
			method: $userW?.you_follow ? 'DELETE' : 'POST',
			url: `/users/${user?.id}/follow`
		}).then((res) => {
			if (res.body.success) {
				toast.success(`You ${$userW?.you_follow ? 'unfollowed' : 'followed'} ${$userW?.username}`);

				userW.update((u) => {
					u.you_follow = !u.you_follow;
					return u;
				});


				void invalidate('app:profile');
				void invalidate('app:users');

				promise = null;
			}
		}).catch(handleErrors)
	}
</script>

<button
        disabled={!!promise}
        class={`btn ${
		$userW?.you_follow ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
	}`}
        on:click|stopPropagation|preventDefault={follow}
>
    {#if !promise}
        {#if $userW?.you_follow}
            Unfollow
        {:else}
            Follow
        {/if}
    {:else if $userW?.you_follow}
        Unfollowing...
    {:else}
        Following...
    {/if}
</button>

<style lang="postcss">
    .btn {
        @apply text-white font-medium py-2 px-4 rounded transition;
    }
</style>