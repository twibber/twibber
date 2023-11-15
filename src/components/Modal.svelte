<script>
	import {hideModal, modalStore as modal} from '$lib/modals.js';

	import Login from "$components/Modal/Login.svelte";
	import Register from "$components/Modal/Register.svelte";
	import Verify from "$components/Modal/Verify.svelte";
</script>

<svelte:window
        on:keydown={(e) => {
		if (e.key === 'Escape') {
			hideModal();
		}
	}}
/>

{#if $modal?.modal}
    {#if $modal?.modal === 'login'}
        <Login/>
    {:else if $modal?.modal === 'register'}
        <Register/>
    {:else if $modal?.modal === 'verify'}
        <Verify/>
    {/if}
{/if}
