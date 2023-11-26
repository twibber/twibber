<script>
	import { browser } from "$app/environment";
	import sanitizeHtml from "sanitize-html";
	import { marked } from "marked";
	import { page } from "$app/stores";
	import {toast} from "$lib/toaster.js";

	let currentTime = new Date();

	// Update the current time every second if in a browser environment
	if (browser) {
		setInterval(() => {
			currentTime = new Date();
		}, 1000);
	}

	let formattedTime;
	let fullDate;

	// Reactive statement to update time since the post was created
	$: formattedTime = post ? timeSince(post.created) : "";
	$: fullDate = post ? new Date(post.created).toLocaleString() : "";

	// Function to calculate the elapsed time in a compact format
	function timeSince(dateString) {
		const date = new Date(dateString);
		let elapsedSeconds = Math.floor((currentTime - date) / 1000);
		const intervals = [
			{ seconds: 31536000, name: "year" },
			{ seconds: 2592000, name: "month" },
			{ seconds: 86400, name: "day" },
			{ seconds: 3600, name: "hour" },
			{ seconds: 60, name: "minute" },
			{ seconds: 1, name: "second" }
		];

		for (const interval of intervals) {
			if (elapsedSeconds >= interval.seconds) {
				const count = Math.floor(elapsedSeconds / interval.seconds);
				return `${count} ${interval.name}${count !== 1 ? 's' : ''} ago`;
			}
		}
		return "Just now";
	}

	export let post;
	let sanitizedContent;

	// Reactive statement to sanitize and render the post content
	$: if (post) {
		sanitizedContent = sanitizeHtml(marked(post.content), {
			allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
			allowedAttributes: {
				...sanitizeHtml.defaults.allowedAttributes,
				img: ["src", "alt", "width", "height"]
			}
		});
	}
</script>

<li class="bg-gray-800 rounded-md overflow-hidden">
    <div class="flex items-center justify-between p-2 border-b border-gray-700">
        <a
                href={`/profile/${post?.user?.username}`}
                class="flex items-center justify-center gap-2 hover:bg-gray-900 pl-2 py-2 w-48 rounded-md">
            <img class="w-12 h-12 rounded-full border-2 border-gray-600"
                 src={post?.user?.avatar || "https://via.placeholder.com/100"}
                 alt="User avatar" />
            <div class="w-full">
                <div class="font-semibold text-white truncate">{post?.user?.display_name}</div>
                <div class="text-sm text-gray-400">@{post?.user?.username}</div>
            </div>
        </a>
        <div class="text-sm text-gray-400 pr-2" title={fullDate}>{formattedTime}</div>
    </div>
    <div class="p-4 text-gray-300">
        {@html sanitizedContent}
    </div>
</li>