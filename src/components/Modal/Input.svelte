<script>
    import {errors} from '$lib/errors';

    export let id, type, name, value, placeholder;

    let errorMessages = [];

    errors.subscribe((fields) => {
        errorMessages = fields.filter((field) => field.name === id).map((field) => field.errors[0]);
    });
</script>

<label class="flex w-full flex-col gap-1 text-sm text-white">
    <span class="text-xs font-medium tracking-wide text-gray-300">{name}</span>
    <input
            {...{type}}
            class="border border-gray-700 bg-gray-900 py-1.5 px-2 font-medium outline-none ring-0 transition placeholder:text-gray-400 focus:border-gray-600 focus:outline-none focus:ring-0 rounded"
            {placeholder}
            bind:value
    />

    {#if errorMessages?.length > 0}
        <div class="text-xs text-red-600 font-medium">{errorMessages[0]}</div>
    {/if}
</label>
