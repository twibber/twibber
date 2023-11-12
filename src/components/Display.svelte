<script>
	import {env} from "$env/dynamic/public";
	import Icon from "@iconify/svelte";

	export let title = "";
	export let buttons = []
</script>

<svelte:head>
    <title>{title} • {env.PUBLIC_NAME}</title>
</svelte:head>

<!-- Main Content -->
<main class="text-white max-w-screen-md w-full min-h-full">
    <!--Topbar with title-->
    <div class="flex flex-row items-center justify-between w-full h-16 px-4 bg-gray-900 border-b border-gray-800 max-h-screen">
        <div class="flex flex-row items-center justify-center w-8 h-8 mr-2 bg-gray-800 rounded-full">
            <Icon icon="ic:baseline-last-page" class="w-6 h-6 text-gray-400 font-black"/>
        </div>
        <h1 class="text-lg font-semibold">{title}</h1>
        <div class="flex-grow"></div>
        <!--Buttons-->
        {#each buttons as button}
            <div class="flex flex-row items-center justify-center w-8 h-8 ml-2 bg-gray-800 rounded-full text-gray-400">
                {#if button?.href}
                    <a href={button.href}>
                        <Icon icon={button.icon}/>
                    </a>
                {:else}
                    <button on:click={button.action}>
                        <Icon icon={button.icon}/>
                    </button>
                {/if}
            </div>
        {/each}
    </div>

    <!--Buttons-->

    <div class="relative overflow-y-auto">
        <slot/>
    </div>
</main>

<div class="flex-col relative items-start w-full min-h-screen h-full hidden xl:flex max-w-xs mr-auto border-l border-gray-800">

</div>