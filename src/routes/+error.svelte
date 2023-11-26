<script>
	import {page} from "$app/stores";
	import Display from "$components/Display.svelte";
</script>

<Display
        title="Error"
>
    <div class="m-auto p-4">
        <div class="p-4 w-full gap-4 flex flex-col bg-gray-950 bg-opacity-90 rounded">
            <div class="flex flex-col">
                <h1 class="text-2xl font-bold text-gray-200">{$page?.error?.data?.code || $page?.error?.message}</h1>
                <p class="text-gray-500">{$page?.error?.data?.message || $page?.error?.message}</p>
            </div>
            <pre class="text-sm text-gray-300 bg-white/[4%] rounded border-2 border-red-900 p-4 overflow-y-auto">{JSON.stringify($page, null, 2)}</pre>
        </div>
    </div>
</Display>