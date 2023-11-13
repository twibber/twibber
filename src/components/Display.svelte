<script>
	import {env} from "$env/dynamic/public";
	import Icon from "@iconify/svelte";
	import {setModal} from "$lib/modals.js";
	import {page} from "$app/stores";
	import {request} from "$lib/request.js";
	import {goto, invalidateAll} from "$app/navigation";

	export let title = "";
	export let buttons = []

	const links = [
		{title: "Home", icon: "material-symbols:home-outline", href: "/"},
		{title: "Profile", icon: "material-symbols:person-outline", href: "/me", auth: true},
		{title: "Settings", icon: "material-symbols:settings-outline", href: "/me/settings", auth: true}
	];
</script>

<svelte:head>
    <title>{title} • {env.PUBLIC_NAME}</title>
</svelte:head>

<!-- Navbar -->
<div class="flex flex-col relative items-start w-full min-h-screen h-full max-w-[5rem] xl:max-w-xs ml-auto border-r border-gray-800">
    <div class="flex flex-row items-center justify-center xl:justify-start w-full px-4 pt-4">
        <img src="/favicon-dark.png" alt="Twibber Logo" class="w-10 h-10"/>
    </div>

    <nav class="flex flex-col items-start justify-start w-full h-full p-4 gap-2 flex-grow">
        {#each links as link}
            {#if !link.auth || !!$page.data.session === link.auth}
                <a href={link.href}
                   class="flex flex-row gap-2 items-center w-full h-12 rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800 px-3 py-2 transition">
                    <Icon icon={link.icon} class="w-6 h-6"/>
                    <span class="text-md font-medium hidden xl:block">{link.title}</span>
                </a>
            {/if}
        {/each}

        <div class="flex-grow"></div>

        {#if !$page.data?.session}
            <button on:click={() => setModal("login")}
                    class="flex flex-row gap-2 items-center w-full h-12 rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800 px-3 py-2 transition">
                <Icon icon="bx:bx-log-in" class="w-6 h-6"/>
                <span class="text-md font-medium hidden xl:block">Login</span>
            </button>
        {:else}
            <!-- Profile Section -->
            <div class="w-full p-2 border border-gray-800 rounded-full font-medium flex items-center">
                <a href="/me" class="flex flex-row justify-between items-center w-full">
                    <div class="text-sm font-medium text-gray-300 group-hover:text-gray-900 pl-2">Logged in as <span
                            class="font-semibold">{$page.data?.session?.connection?.user?.username}</span></div>
                </a>
                <button on:click={() => request({
                                            method: 'GET',
                                            url: '/auth/logout',
                                            fetchHandler: fetch,
                                        })
                                        .catch(() => invalidateAll().then(() => goto('/')))
                                        .then(() => invalidateAll().then(() => goto('/')))
                                 }
                        class="text-sm font-medium rounded-full bg-gray-800 hover:bg-red-900 transition py-2 px-4"
                >
                    Logout
                </button>
            </div>
        {/if}
    </nav>
</div>

<!-- Main Content -->
<main class="text-white max-w-screen-md w-full min-h-screen max-h-screen">
    <div class="h-screen max-h-screen min-h-screen">
        <div class="flex relative flex-row items-center justify-between w-full h-16 px-4 bg-gray-900 border-b border-gray-800">
            <div class="flex flex-row items-center justify-center w-8 h-8 mr-2 bg-gray-800 rounded-full">
                <Icon icon="ic:baseline-last-page" class="w-6 h-6 text-gray-400 font-black"/>
            </div>
            <h1 class="text-lg font-semibold">{title}</h1>
            <div class="flex-grow"></div>
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

        <div class="relative overflow-y-auto" style="height: calc(100vh - 4rem);"> <!-- h-16 = 4rem -->
            <slot/>
        </div>
    </div>
</main>

<div class="flex-col relative items-start w-full min-h-screen h-full hidden xl:flex max-w-xs mr-auto border-l border-gray-800">

</div>

<style>
    /* width */
    ::-webkit-scrollbar {
        width: 1px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #111827;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #fff;
    }
</style>