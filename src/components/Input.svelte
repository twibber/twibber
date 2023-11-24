<script>
	export let id, type, value;
</script>

<label for={id} class="flex flex-col gap-2 w-full bg-gray-950 rounded-md">
    <input id={id} {...{type}} bind:value={value} class="w-full bg-gray-800 rounded-md">
</label>