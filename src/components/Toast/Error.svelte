<script>
	import {onMount} from 'svelte'
	import {tweened} from 'svelte/motion'
	import {linear} from 'svelte/easing'

	export let id = "", message = "", duration = 5000

	const progress = tweened(1, {duration: duration, easing: linear})
	onMount(() => {
		progress.set(0)
	})
</script>

<div id={id} class="relative flex w-full bg-gray-900 p-2 border border-gray-800">
    <div class="bg-red-600 px-0.5 mr-2"></div>
    <div class="text-sm">{message}</div>
    <progress class="absolute bottom-0 right-0 w-full h-px" value={$progress} max={1}></progress>
</div>

<style lang="postcss">
    progress {
    }

    progress::-webkit-progress-bar {
        @apply bg-gray-800;
    }

    progress::-webkit-progress-value {
        @apply bg-red-600;
    }
</style>