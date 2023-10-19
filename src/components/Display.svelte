<script>
	import {env} from "$env/dynamic/public";

	export let title = "";
	export let buttons = []
</script>

<svelte:head>
    <title>{title} • {env.PUBLIC_NAME}</title>
</svelte:head>

<!-- Main Content -->
<main class="overflow-x-auto text-white max-w-screen-md w-full min-h-full">
    <slot/>
</main>

<div class=" flex-col relative items-start w-full min-h-screen h-full hidden xl:flex max-w-xs mr-auto border-l border-gray-800">

</div>