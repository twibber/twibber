<script>
    import {errors} from '$lib/errors';

    export let id, type, name, value, placeholder, autocomplete;

    let errorMessages = [];

    errors.subscribe((fields) => {

        errorMessages = fields.filter((field) => field.name === id).map((field) => field.errors[0]);
    });
</script>

<label class="flex w-full flex-col gap-1 text-sm text-white">
    <span class="text-xs font-medium tracking-wide text-gray-300">{name}</span>
    <input
            {...{type}}
            {autocomplete}
            class="bg-gray-950 py-2 px-2 font-medium outline-none ring-0 transition placeholder:text-gray-400 bg-opacity-25 focus:bg-opacity-50 focus:border-blue-600 focus:outline-none focus:ring-0 rounded-lg"
            {placeholder}
            bind:value
    />

    {#if errorMessages?.length > 0}
        <div class="text-xs text-red-600 font-medium">{errorMessages[0]}</div>
    {/if}
</label>
