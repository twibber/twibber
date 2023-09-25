<script>
	import "$styles/tailwind.css"
</script>

<svelte:head>
    <title>Twibber</title>
</svelte:head>

<div class="grid grid-6 grid-flow-col min-h-screen w-full bg-gray-950">
    <!-- Navbar -->
    <nav class="flex flex-col w-full h-full">
        <div class="bg-black h-full w-64"></div>
    </nav>

    <!-- Main Content -->
    <main class="overflow-x-auto border-x border-gray-900 text-white">
        <slot/>
    </main>

    <!-- Trending -->
    <div class="flex flex-col h-full">

    </div>
</div>