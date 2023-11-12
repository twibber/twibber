<script>
	import Display from "$components/Display.svelte";

	export let data;
</script>

<Display
        title={data?.session?.connection?.user?.username}
>
    <pre>{JSON.stringify(data, null, 2)}</pre>

</Display>