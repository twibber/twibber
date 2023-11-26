<script>
  import { browser } from "$app/environment";
  import sanitizeHtml from "sanitize-html";
  import { marked } from "marked";

  let currentTime = new Date();
  if (browser) {
    setInterval(() => {
      currentTime = new Date();
    }, 1000);
  }

  let formattedTime;
  let fullDate;

  $: currentTime, formattedTime = post ? timeSince(post?.created) : "";

  function timeSince(postDate) {
    const date = new Date(postDate);
	fullDate = date.toLocaleString();

    let elapsedSeconds = Math.floor((currentTime.getTime() - date.getTime()) / 1000);

    const intervals = [
      { seconds: 31536000, name: "y" },
      { seconds: 2592000, name: "mo" },
      { seconds: 86400, name: "d" },
      { seconds: 3600, name: "h" },
      { seconds: 60, name: "m" },
      { seconds: 1, name: "s" }
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

  console.log(post);
</script>

<li class="overflow-hidden shadow flex flex-col w-full bg-gray-950 rounded">
  <div class="flex flex-row items-center gap-4 h-16 p-3">
    <!--<img class="w-10 h-10 rounded-full"
         src="https://via.placeholder.com/150"
         alt={""}>-->
    <div class="flex flex-col">
      <div class="text-white font-medium">{post?.user?.display_name}</div>
      <div class="text-gray-400 font-medium text-xs">@{post?.user?.username}</div>
    </div>
    <div class="flex-grow"></div>
    <div class="text-gray-400 text-xs h-full cursor-default" title={fullDate}>{formattedTime}</div>
  </div>
  <hr class="border-gray-800">
  <div class="p-4 text-sm font-medium text-font">
    {@html sanitizedContent}
  </div>
</li>