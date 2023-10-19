<script>
	import Display from "$components/Display.svelte";
	import {onMount} from "svelte";
	import {request} from "$lib/request.js";
	import {toast} from "$lib/toaster.js";

	let data = {};

	onMount(async () => {
		await request({
			method: 'GET',
			url: '/account',
		}).then(res => {
            data = res.data;
        }).catch(err => {
            toast.error(err.response.data.message);
        });
	});
</script>

<Display>
    <pre>{JSON.stringify(data, null, 2)}</pre>
</Display>