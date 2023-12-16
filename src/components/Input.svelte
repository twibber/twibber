<script>
	import {errors} from '$lib/errors';

	export let id, type, name, value, placeholder, autocomplete;

	let errorMessages = [];

	errors.subscribe((fields) => {
		errorMessages = fields.filter((field) => field.name === id).map((field) => field.errors[0]);
	});
</script>

<div class="flex flex-col gap-2 p-3 bg-gray-800 rounded-md">
    <label for={id} class="text-xs font-medium text-gray-300">{name}</label>
    <input
            id={id}
            {...{type}}
            {autocomplete}
            class={`block w-full px-3 py-2 text-sm font-medium leading-6 text-white bg-gray-900 border ${errorMessages.length > 0 ? 'border-red-500' : 'border-gray-700'} rounded-md focus:outline-none focus:ring-0 focus:border-blue-600 transition duration-150 ease-in-out`}
            placeholder={placeholder}
            bind:value
    />
    {#if errorMessages?.length > 0}
        <span class="text-xs text-red-500">{errorMessages[0]}</span>
    {/if}
</div>
