<script>
	import "$styles/tailwind.css";
	import "$styles/nprogress.css";

	import Icon from "@iconify/svelte";

	import Toaster from '$components/Toaster.svelte';
	import Modal from '$components/Modal.svelte';

	import NProgress from "nprogress";
	import {navigating} from "$app/stores";

	import {env} from "$env/dynamic/public";
	import {onMount} from "svelte";
	import {request} from "$lib/request.js";
	import {toast} from "$lib/toaster.js";
	import {setModal} from "$lib/modals.js";

	NProgress.configure({
		minimum: 0.16,
		showSpinner: false
	});

	$: NProgress[$navigating ? 'start' : 'done']();

	const links = [
		{title: "Home", icon: "bx:bx-home", href: "/"},
		{title: "Profile", icon: "bx:bx-user", href: "/me", auth: true},
		{title: "Settings", icon: "bx:bx-cog", href: "/me/settings", auth: true}
	];

	let auth = false;
	onMount(async () => {
		await request({
			method: 'GET',
			url: '/account',
		}).then(() => {
			auth = true;
		}).catch(err => {
			if (err?.body?.error?.code === "UNAUTHORIZED") {
				auth = false;
			} else {
				toast.error(err?.body?.error?.message ?? "An unexpected server side error occurred.");
			}
		});
	});
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
            <img src="/assets/img/q/transparent_white_128x128.png" alt="Twibber Logo" class="w-10 h-10"/>
        </div>

        <nav class="flex flex-col items-start justify-start w-full h-full p-4 gap-2 flex-grow">
            {#each links as link}
                {#if !link.auth || link.auth === auth}
                    <a href={link.href}
                       class="flex flex-row gap-2 items-center w-full h-12 rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800 px-3 py-2 transition">
                        <Icon icon={link.icon} class="w-6 h-6"/>
                        <span class="text-md font-bold hidden xl:block">{link.title}</span>
                    </a>
                {/if}
            {/each}

            <div class="flex-grow"></div>

            {#if !auth}
                <button on:click={() => setModal("login")}
                        class="flex flex-row gap-2 items-center w-full h-12 rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800 px-3 py-2 transition">
                    <Icon icon="bx:bx-log-in" class="w-6 h-6"/>
                    <span class="text-md font-bold hidden xl:block">Login</span>
                </button>
            {:else}
                <!-- Profile Section -->
                <a href="/me"
                   class="flex flex-row gap-4 items-center justify-center lg:justify-start w-full h-12 rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800 transition p-0 xl:px-3 xl:py-8">
                    <img src="/assets/img/q/transparent_white_128x128.png" alt="pfp"
                         class="w-10 h-10 rounded-full object-cover bg-black"/>
                    <div class="hidden xl:flex flex-col text-left w-full gap-0">
                        <div class="block text-lg">Twibber</div>
                        <div class="block text-sm text-gray-400">@twibber</div>
                    </div>
                </a>
            {/if}
        </nav>
    </div>

    <slot/>
</div>
