<script>
	import {toast} from "$lib/toaster.js";
	export let user;

	async function toggleFollow() {
		toast.error("Not implemented yet!");
	}
</script>

<a
        href="/u/{user?.username}"
        class="block relative bg-gray-800 rounded-md duration-300 border-2 border-transparent hover:border-blue-900 p-4">
    <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
            <img class="w-12 h-12 rounded-full border-2 border-gray-600"
                 src={user?.avatar || "https://via.placeholder.com/100"}
                 alt="User avatar" />
            <div>
                <div class="font-semibold text-white">{user?.display_name}</div>
                <div class="text-sm text-gray-400">@{user?.username}</div>
            </div>
        </div>
        <button
                class="btn bg-blue-600 hover:bg-blue-700"
                on:click|stopPropagation|preventDefault={toggleFollow}
        >
            Follow
        </button>
    </div>
</a>

<style lang="postcss">
    .btn {
        @apply text-white font-medium py-2 px-4 rounded transition;
    }
</style>