<script>
	import {browser} from "$app/environment";
	import sanitizeHtml from "sanitize-html";
	import {marked} from "marked";
	import {page} from "$app/stores";
	import Icon from "@iconify/svelte";
	import {toast} from "$lib/toaster.js";
	import {handleErrors} from "$lib/errors.js";
	import {request, getURL} from "$lib/request.js";
	import {invalidate} from "$app/navigation";

	let currentTime = new Date();
	if (browser) {
		setInterval(() => {
			currentTime = new Date();
		}, 1000);
	}

	let formattedTime;
	let secondsElapsed = 0;
	let fullDate;

	$: currentTime, formattedTime = post ? timeSince(post?.created) : "";
	$: secondsElapsed = post ? Math.floor((currentTime.getTime() - new Date(post?.created).getTime()) / 1000) : 0;

	function timeSince(postDate) {
		const date = new Date(postDate);
		fullDate = date.toLocaleString();

		let elapsedSeconds = Math.floor((currentTime.getTime() - date.getTime()) / 1000);

		const intervals = [
			{seconds: 31536000, name: "y"},
			{seconds: 2592000, name: "mo"},
			{seconds: 86400, name: "d"},
			{seconds: 3600, name: "h"},
			{seconds: 60, name: "m"},
			{seconds: 1, name: "s"}
		];

		for (const interval of intervals) {
			if (elapsedSeconds >= interval.seconds) {
				const count = Math.floor(elapsedSeconds / interval.seconds);
				return `${count}${interval.name}`;
			}
		}
		return "0s";
	}


	export let post;
	let sanitizedContent;

	$: if (post) {
		sanitizedContent = sanitizeHtml(marked(post?.content), {
			allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
			allowedAttributes: {
				...sanitizeHtml.defaults.allowedAttributes,
				img: ["src", "alt", "width", "height"]
			}
		});
	}

	function notImpl() {
		toast.error("Not implemented yet!");
	}

	async function handleLike() {
		request({
			method: 'POST',
			url: '/posts/' + post.id,
		}).then((res) => {
			if (res?.body?.success) {
				toast.success("Post deleted!");
				invalidate(getURL("/posts"));
				invalidate(getURL("/u/" + post.user.username));
			}
		}).catch(handleErrors);
	}

	async function handleDelete() {
		request({
			method: 'DELETE',
			url: '/posts/' + post.id,
		}).then((res) => {
			if (res?.body?.success) {
				toast.success("Post deleted!");
				invalidate(getURL("/posts"));
				invalidate(getURL("/u/" + post.user.username));
			}
		}).catch(handleErrors);
	}
</script>

<li class="bg-gray-800 rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <a href={`/u/${post?.user?.username}`}
       class="block hover:bg-gray-900/[15%] transition-colors duration-300">
        <div class="flex items-center justify-between p-2 border-b border-gray-700">
            <!-- User Info -->
            <div class="flex items-center gap-3">
                <img class="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-600"
                     src={post?.user?.avatar || "https://via.placeholder.com/100"}
                     alt="User avatar"/>
                <div class="truncate">
                    <div class="font-semibold text-white text-xs sm:text-sm">{post?.user?.display_name}</div>
                    <div class="text-xs text-gray-400">@{post?.user?.username}</div>
                </div>
            </div>
            <!-- Post Time -->
            <div class="text-xs sm:text-sm text-gray-400" title={fullDate}>{formattedTime}</div>
        </div>
    </a>
    <!-- Post Content -->
    <div class="p-4 text-gray-300 border-b border-gray-700 text-sm md:text-md lg:text-base">
        {@html sanitizedContent}
    </div>
    <!-- Interaction Buttons -->
    <div class="flex flex-wrap justify-between items-center px-4 py-2 bg-gray-800 rounded-b-lg">
        <div class="flex gap-2">
            <!-- Like Button -->
            <button on:click={notImpl}
                    class="flex items-center gap-1 sm:gap-2 text-gray-300 hover:text-blue-400 transition duration-150 ease-in-out px-2 py-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-700 ">
                <Icon icon="material-symbols:thumb-up-outline" class="w-5 h-5 text-current"/>
                <span class="text-xs hidden sm:inline">Like</span>
            </button>
            <!-- Repost Button -->
            <button on:click={notImpl}
                    class="flex items-center gap-1 sm:gap-2 text-gray-300 hover:text-green-400 transition duration-150 ease-in-out px-2 py-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-700">
                <Icon icon="material-symbols:repeat" class="w-5 h-5 text-current"/>
                <span class="text-xs hidden sm:inline">Repost</span>
            </button>
            <!-- Replies Button -->
            <button on:click={notImpl}
                    class="flex items-center gap-1 sm:gap-2 text-gray-300 hover:text-yellow-400 transition duration-150 ease-in-out px-2 py-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-700">
                <Icon icon="material-symbols:reply" class="w-5 h-5 text-current"/>
                <span class="text-xs hidden sm:inline">Replies</span>
            </button>
        </div>
        <!-- Delete Button (Conditional) -->
        {#if $page?.session?.connection?.user?.admin || (post?.user?.id === $page?.data?.session?.connection?.user?.id && secondsElapsed < 300)}
            <div class="flex-grow"></div>
            <button on:click={handleDelete}
                    class="flex items-center gap-1 sm:gap-2 text-gray-300 hover:text-red-500 transition duration-150 ease-in-out px-2 py-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-700">
                <Icon icon="material-symbols:delete-outline" class="w-5 h-5 text-current"/>
                <span class="text-xs hidden sm:inline">Delete</span>
            </button>
        {/if}
    </div>
</li>
