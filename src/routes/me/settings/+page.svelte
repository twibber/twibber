<script>
	import Display from "$components/Display.svelte";

	export let data;
</script>

<Display
        title={"Settings"}
>
    <pre>{JSON.stringify(data?.session?.connection?.user, null, 2)}</pre>
</Display>