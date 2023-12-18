<script>
	import {goto, invalidate} from '$app/navigation';
	import {toast} from '$lib/toaster.js';
	import {request} from '$lib/request.js';
	import {handleErrors} from "$lib/errors.js";
	import {page} from "$app/stores";
	import Icon from "@iconify/svelte";

	export let user;

	let following = false;
	let deleting = false;

	async function follow() {
		following = true;
		const followAction = user?.you_follow ? 'DELETE' : 'POST';
		try {
			const response = await request({
				method: followAction,
				url: `/users/${user?.username}/follow`
			});

			if (response.body.success) {
				toast.success(`You ${user?.you_follow ? 'unfollowed' : 'followed'} ${user?.username}`);
				user.you_follow = !user?.you_follow; // Directly update the user object

				void invalidate('app:profile');
				void invalidate('app:users');
				void invalidate('app:followers');
				void invalidate('app:following');
			}
		} catch (error) {
			handleErrors(error);
		} finally {
			following = false;
		}
	}

	async function deleteUser() {
		deleting = true;
		try {
			const response = await request({
				method: 'DELETE',
				url: `/users/${user?.username}`
			});

			if (response.body.success) {
				toast.success(`You deleted ${user?.username}`);
				user = null;

				if ($page.url.pathname === "/u" || $page.url.pathname === "/u/") {
					void invalidate('app:users');
				} else {
					void goto('/u');
				}
			}
		} catch (error) {
			handleErrors(error);
		} finally {
			deleting = false;
		}
	}
</script>

{#if user?.id === $page?.data?.session?.connection?.user?.id}
    <a href={`/u/${$page?.data?.session?.connection?.user?.username}/settings`}
       class="btn bg-gray-600 hover:bg-gray-700 flex items-center gap-2">
        <Icon icon={"mdi:cog"} class="text-lg"/>
        Settings
    </a>
{:else}
    <div class={`flex ${$page.url.pathname === "/u" ? 'flex-row' : 'flex-col'} justify-center items-end gap-2`}>
        <button
                disabled={following}
                class={`btn ${user?.you_follow ? 'bg-red-700 disabled:bg-red-800' : 'bg-blue-700 disabled:bg-blue-800'} flex items-center gap-2`}
                on:click|stopPropagation|preventDefault={follow}
        >
            {#if following}
                <Icon icon={"mdi:loading"} class="text-lg animate-spin"/>
            {:else}
                <Icon icon={user?.you_follow ? "mdi:account-remove" : "mdi:account-plus"} class="text-lg"/>
            {/if}
            {user?.you_follow ? 'Unfollow' : 'Follow'}
        </button>

        {#if $page?.data?.session?.connection?.user?.admin}
            <button
                    disabled={deleting}
                    class="btn bg-red-700 disabled:bg-red-800 flex items-center gap-2"
                    on:click|stopPropagation|preventDefault={deleteUser}
            >
                {#if deleting}
                    <Icon icon={"mdi:loading"} class="text-lg animate-spin"/>
                {:else}
                    <Icon icon={"mdi:account-remove"} class="text-lg"/>
                {/if}
                Delete
            </button>
        {/if}
    </div>
{/if}

<style>
    .btn {
        @apply text-white font-medium rounded transition px-2 py-1.5 text-sm;
    }
</style>