<script lang="ts">
	import sanitizeHtml from 'sanitize-html';
	import {marked} from 'marked';

	function timeSince(date) {
		const currentTime = new Date();
		let elapsedSeconds = Math.floor((currentTime.getTime() - date.getTime()) / 1000);

		const intervals = [
			{seconds: 31536000, name: "y"},
			{seconds: 2592000, name: "mo"},
			{seconds: 86400, name: "d"},
			{seconds: 3600, name: "h"},
			{seconds: 60, name: "m"},
			{seconds: 1, name: "s"},
		]

		for (const interval of intervals) {
			if (elapsedSeconds >= interval.seconds) {
				return Math.floor(elapsedSeconds / interval.seconds) + interval.name;
			}
		}
	}

	const content = `Test Markdown
# Heading 1
## Heading 2
### Heading 3

*Italic*

**Bold**

***Bold Italic***


[Link](https://google.com)

![Image](https://via.placeholder.com/150)

\`\`\`javascript
console.log("Hello World");
\`\`\`

~~Strikethrough~~

- Unordered
- List

1. Ordered
2. List

> Blockquote
`;

	let sanitizedContent = sanitizeHtml(marked(content));
</script>

<li class="overflow-hidden shadow flex flex-col w-full bg-gray-950 rounded">
    <div class="flex flex-row items-center gap-4 h-16 p-3">
        <img class="w-10 h-10 rounded-full"
             src="https://via.placeholder.com/150"
             alt={""}>
        <div class="flex flex-col">
            <div class="text-white font-medium">User</div>
            <div class="text-gray-400 font-medium text-xs">@username</div>
        </div>
        <div class="flex-grow"></div>
        <div class="text-gray-400 text-xs h-full">{timeSince(new Date())}</div>
    </div>
    <hr class="border-gray-800">
    <div class="p-4 text-sm font-medium text-font">
        {@html sanitizedContent}
    </div>
</li>