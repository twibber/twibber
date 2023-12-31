<script>
	import "$styles/tailwind.css";
	import "$styles/nprogress.css";

	import Toaster from '$components/Toaster.svelte';
	import Modal from '$components/Modal.svelte';

	import NProgress from "nprogress";
	import {navigating} from "$app/stores";

	import {env} from "$env/dynamic/public";
	import {setModal} from "$lib/modals.js";
	import {logout} from "$lib/buttons.js";
	import Icon from "@iconify/svelte";

	export let data;

	NProgress.configure({
		minimum: 0.30,
		showSpinner: false
	});

	$: NProgress[$navigating ? 'start' : 'done']();

	let links = [];

	// make it state dependant, to prevent it from having undefined values on profile and settings
	$: links = [
		{
			title: "Feed",
			icon: "material-symbols:document-scanner-outline-sharp",
			href: "/"
		},
		{
			title: "Users",
			icon: "material-symbols:group-outline",
			href: `/u`
		},
		{
			title: "Profile",
			icon: "material-symbols:person-outline",
			href: `/u/${data?.session?.connection?.user?.username}`,
			auth: true
		},
		{
			title: "Settings",
			icon: "material-symbols:settings-outline",
			href: `/u/${data?.session?.connection?.user?.username}/settings`,
			auth: true
		}
	]
</script>

<svelte:head>
    <title>{env.PUBLIC_NAME}</title>
    <script src="https://www.google.com/recaptcha/api.js?render={env.PUBLIC_SITEKEY}" async defer></script>
</svelte:head>

<div class="flex flex-row min-h-screen w-full bg-gray-900 text-white">
    <Toaster/>
    <Modal/>

    <!-- Navbar -->
    <div class="flex flex-col relative items-start w-full min-h-screen h-full max-w-[5rem] xl:max-w-xs ml-auto border-r border-gray-800">
        <div class="flex flex-row items-center justify-center xl:justify-start w-full px-4 pt-4">
            <img src="/favicon-dark.png" alt="Twibber Logo" class="w-10 h-10"/>
        </div>

        <nav class="flex flex-col items-start justify-start w-full h-full p-4 gap-2 flex-grow">
            {#each links as link}
                {#if !link.auth || !!data?.session === link.auth}
                    <a href={link.href}
                       class="flex flex-row gap-2 items-center w-full h-12 rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800 px-3 py-2 transition">
                        <Icon icon={link.icon} class="w-6 h-6"/>
                        <span class="text-md font-medium hidden xl:block">{link.title}</span>
                    </a>
                {/if}
            {/each}

            <div class="flex-grow"></div>

            {#if !data?.session}
                <button on:click={() => setModal("login")}
                        class="flex flex-row gap-2 items-center w-full h-12 rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800 px-3 py-2 transition">
                    <Icon icon="material-symbols:key-outline" class="w-6 h-6"/>
                    <span class="text-md font-medium hidden xl:block">Login</span>
                </button>
            {:else}
                <!-- Profile Section -->
                <div class="w-full p-2 border border-gray-800 rounded-full font-medium items-center hidden xl:flex">
                    <a href="/u/{data?.session?.connection?.user?.username}"
                       class="flex flex-row justify-between items-center w-full">
                        <div class="text-sm font-medium text-gray-300 group-hover:text-gray-900 pl-2">Logged in as <span
                                class="font-semibold">{data?.session?.connection?.user?.username}</span></div>
                    </a>
                    <button on:click|preventDefault={logout}
                            type="button"
                            class="text-sm font-medium rounded-full bg-gray-800 hover:bg-red-900 transition py-1.5 px-4">
                        Logout
                    </button>
                </div>
                <button on:click|preventDefault={logout}
                        type="button"
                        class="flex flex-row gap-2 items-center w-full h-12 rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800 px-3 py-2 transition xl:hidden">
                    <Icon icon="material-symbols:logout-sharp" class="w-6 h-6"/>
                    <span class="text-md font-medium hidden xl:block">Logout</span>
                </button>
            {/if}
        </nav>
    </div>

    <!--  If content is empty, display a loader  -->
    <main class="text-white max-w-screen-md w-full min-h-screen max-h-screen">
        <div class="h-screen max-h-screen min-h-screen">
            {#if $navigating}
                <div class="w-full"/>
            {/if}
            <slot/>
        </div>
    </main>


    <div class="flex-col relative items-start w-full min-h-screen h-full hidden xl:flex max-w-xs mr-auto border-l border-gray-800">

    </div>
</div>
