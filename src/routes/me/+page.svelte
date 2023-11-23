<script>
	import Display from "$components/Display.svelte";

	export let data;
</script>

<Display
        title={"Profile"}
>
    <pre>{JSON.stringify(data?.session?.connection, null, 2)}</pre>
</Display>