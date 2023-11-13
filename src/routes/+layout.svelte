<script>
	import "$styles/tailwind.css";
	import "$styles/nprogress.css";

	import Toaster from '$components/Toaster.svelte';
	import Modal from '$components/Modal.svelte';

	import NProgress from "nprogress";
	import {navigating} from "$app/stores";

	import {env} from "$env/dynamic/public";

	NProgress.configure({
		minimum: 0.16,
		showSpinner: false
	});

	$: NProgress[$navigating ? 'start' : 'done']();
</script>

<svelte:head>
    <title>{env.PUBLIC_NAME}</title>
    <script src="https://www.google.com/recaptcha/api.js?render={env.PUBLIC_SITEKEY}" async defer></script>
</svelte:head>

<div class="flex flex-row min-h-screen w-full bg-gray-900 text-white">
    <Toaster/>
    <Modal/>

    <slot/>
</div>
