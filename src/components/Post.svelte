<script>
	import {browser} from "$app/environment";
	import sanitizeHtml from "sanitize-html";
	import {marked} from "marked";
	import {page} from "$app/stores";
	import Icon from "@iconify/svelte";
	import {toast} from "$lib/toaster.js";
	import {handleErrors} from "$lib/errors.js";
	import {request} from "$lib/request.js";
	import {invalidate} from "$app/navigation";
	import {onMount} from "svelte";
	import {setModal} from "$lib/modals.js";
	import Post from './Post.svelte';

	export let post, repost = null;
	let currentTime = new Date();
	let sanitizedContent = '';
	let fullDate = '';
	let formattedTime = '';
	let secondsElapsed = 0;

	const timeIntervals = [
		{seconds: 31536000, name: "years"},
		{seconds: 2592000, name: "months"},
		{seconds: 86400, name: "days"},
		{seconds: 3600, name: "hours"},
		{seconds: 60, name: "minutes"},
		{seconds: 1, name: "seconds"}
	];

	const updateTime = () => {
		currentTime = new Date();
		if (post?.created_at) {
			secondsElapsed = Math.floor((currentTime.getTime() - new Date(post.created_at).getTime()) / 1000);
			formattedTime = formatElapsedTime(secondsElapsed);
			fullDate = new Date(post.created_at).toLocaleString();
		}
	};

	const formatElapsedTime = (elapsedSeconds) => {
		for (const interval of timeIntervals) {
			if (elapsedSeconds >= interval.seconds) {
				const count = Math.floor(elapsedSeconds / interval.seconds);
				return `${count} ${count === 1 ? interval.name.slice(0, -1) : interval.name} ago`;
			}
		}
		return "0s";
	};

	if (browser) {
		setInterval(updateTime, 1000);
	}

	onMount(() => {
		if (post) {
			sanitizedContent = sanitizeHtml(marked(post.content), {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
				allowedAttributes: {
					...sanitizeHtml.defaults.allowedAttributes,
					img: ["src", "alt", "width", "height"]
				}
			});
		}
	});

	async function handleAction(action = {
		method: '',
		url: ''
	}, successMessage) {
		try {
			const res = await request({method: action.method, url: '/posts/' + post.id + action?.url ?? ""});
			if (res?.body?.success) {
				toast.success(successMessage);

				void invalidate("app:posts")
				void invalidate("app:profile")

				// Optimistically update the post
				if (action.method === 'DELETE' && action.url === '') {
					post = null;
				} else if (action.method === 'POST' && action.url === '/like') {
					post.liked = true;
					post.counts.likes = post.counts.likes + 1;
				} else if (action.method === 'DELETE' && action.url === '/like') {
					post.liked = false;
					post.counts.likes = Math.max(0, post.counts.likes - 1);
				}
			}
		} catch (error) {
			handleErrors(error);
		}
	}

	function handleDelete() {
		handleAction({
			method: 'DELETE',
			url: ''
		}, "Post deleted!");
	}

	function handleLike() {
		if (post?.liked) {
			handleAction({method: 'DELETE', url: '/like'}, "Post unliked!");
		} else {
			handleAction({method: 'POST', url: '/like'}, "Post liked!");
		}
	}
</script>

{#if post}
    <li class={`bg-gray-800 rounded-md overflow-hidden transition duration-300 ${repost ? "border border-gray-700" : ""}`}>
        <a href={`/u/${post?.user?.username}`}
           class="block hover:bg-gray-900/[15%] transition-colors duration-300">
            <div class="flex items-center justify-between p-2 border-b border-gray-700">
                <!-- User Info -->
                <div class="flex items-center gap-2">
                    <img class="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-600"
                         src={post?.user?.avatar || "https://via.placeholder.com/100"}
                         alt="User avatar"/>
                    <div class="truncate">
                        <div class="font-semibold text-white text-xs sm:text-sm flex justify-center items-center flex-row gap-1">{post?.user?.display_name}
                            {#if post?.user?.admin}
                                <Icon icon="material-symbols:verified" class="w-4 h-4 text-yellow-500"/>
                            {:else if post?.user?.verified_person}
                                <Icon icon="material-symbols:verified" class="w-4 h-4 text-blue-500"/>
                            {/if}
                        </div>
                        <div class="text-xs text-gray-400">@{post?.user?.username}</div>
                    </div>
                </div>
                <!-- Post Time -->
                <div class="text-xs text-gray-400 pr-2" title={fullDate}>{formattedTime}</div>
            </div>
        </a>
        <!-- Post Content -->
        <div class="flex flex-col p-4 text-gray-300 border-b border-gray-700 text-xs md:text-sm hover:bg-opacity-75 transition duration-300 gap-2 max-w-full break-all sm:break-words">
            {@html sanitizedContent}
            {#if post?.type === "repost"}
                <Post post={post?.parent} repost={post}/>
            {/if}
        </div>
        <!-- Interaction Buttons -->
        <div class="flex flex-wrap justify-between items-center px-4 py-2 bg-gray-800 rounded-b-lg">
            <div class="flex gap-1 sm:gap-2">
                <!-- Like Button -->
                <button on:click={handleLike}
                        class="flex items-center gap-1 sm:gap-2 text-gray-300 hover:text-red-400 transition duration-150 ease-in-out px-2 py-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-700 ">
                    {#if post?.liked}
                        <Icon icon="mdi:heart" class="w-4 h-4 sm:w-5 sm:h-5 text-red-500"/>
                    {:else}
                        <Icon icon="mdi:heart-outline" class="w-4 h-4 sm:w-5 sm:h-5 text-current"/>
                    {/if}
                    <span class="text-xs">({post?.counts?.likes})</span>
                </button>

                <!-- Repost Button -->
                {#if post.type !== "repost"}
                    <button on:click={() => {
					setModal("repost", {post})
                }}
                            class="flex items-center gap-1 sm:gap-2 text-gray-300 hover:text-green-400 transition duration-150 ease-in-out px-2 py-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-700">
                        <Icon icon="material-symbols:repeat" class="w-4 h-4 sm:w-5 sm:h-5 text-current"/>
                        <span class="text-xs">({post?.counts?.reposts})</span>
                    </button>
                {/if}

                <!-- Replies Button -->
                <a href={`/p/${post?.id}`}
                   class="flex items-center gap-1 sm:gap-2 text-gray-300 hover:text-yellow-400 transition duration-150 ease-in-out px-2 py-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-700">
                    <Icon icon="material-symbols:reply" class="w-4 h-4 sm:w-5 sm:h-5 text-current"/>
                    <span class="text-xs">({post?.counts?.replies})</span>
                </a>
            </div>
            <!-- Delete Button (Conditional) -->
            {#if $page?.data?.session?.connection?.user?.admin || (post?.user?.id === $page?.data?.session?.connection?.user?.id && secondsElapsed < 300)}
                <div class="flex-grow"></div>
                <button on:click={handleDelete}
                        class="flex items-center gap-1 sm:gap-2 text-gray-300 hover:text-red-500 transition duration-150 ease-in-out px-2 py-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-700">
                    <Icon icon="material-symbols:delete-outline" class="w-4 h-4 sm:w-5 sm:h-5 text-current"/>
                </button>
            {/if}
        </div>
    </li>
{/if}