<script>
	import {onMount} from 'svelte';
	import {request} from '$lib/request.js';
	import {goto} from "$app/navigation";
	import {toast} from "$lib/toaster.js";

	onMount(async () => {
		await request({
			method: 'GET',
			url: '/account',
		}).catch(err => {
			switch (err?.body?.error?.code) {
				case 'UNAUTHORIZED':
					toast.error(err?.body?.error?.message);
					goto('/')
					break;
				default:
					toast.error(err?.body?.error?.message);
					goto('/')
					break;
			}
		});
	});
</script>

<slot/>
