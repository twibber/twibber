<script>
	import Display from "$components/Display.svelte";
	import {page} from "$app/stores";
</script>

<Display title={"Error"}>
    <div class="flex flex-col w-full h-full justify-center items-center">
        <h1 class="text-2xl font-bold mb-4">{$page.status}</h1>
        <p class="text-center mb-4">{$page.error.message}</p>
    </div>
</Display>
