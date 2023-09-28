<script>
	import "$styles/tailwind.css"
    import Icon from "@iconify/svelte"

    let links = [
        {
            title: "Home",
            icon: "bx:bx-home",
            href: "/"
        },
        {
            title: "Profile",
            icon: "bx:bx-user",
            href: "/me"
        },
        {
            title: "Settings",
            icon: "bx:bx-cog",
            href: "/me/settings"
        }
    ]
</script>

<svelte:head>
    <title>Twibber</title>
</svelte:head>

<div class="flex flex-row min-h-screen w-full bg-gray-900 text-white">
    <!-- Navbar -->
    <div class="flex flex-col relative items-start w-full min-h-screen h-full max-w-[5rem] xl:max-w-xs ml-auto border-l border-gray-800">
        <div class="flex flex-row items-center justify-center xl:justify-start w-full px-4 pt-4">
            <img
                src="/assets/img/q/transparent_white_128x128.png"
                alt="Twibber Logo"
                class="w-10 h-10"
            />
        </div>
        <nav class="flex flex-col items-start justify-start w-full h-full p-4 gap-2">
            {#each links as link}
                <a href={link.href} class="flex flex-row gap-2 items-center w-full h-12 rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800 px-3 py-2 transition">
                    <Icon icon={link.icon} class="w-6 h-6"/>
                    <span class="text-md font-bold hidden xl:block">{link.title}</span>
                </a>
            {/each}
        </nav>
        <div class="flex-grow"></div>
        <!--Profile-->
        <div class="flex flex-row items-center justify-center xl:justify-start w-full px-4 pb-4 border-t border-gray-800 p-4">
            <img
                src="/assets/img/q/transparent_white_128x128.png"
                alt="Twibber Logo"
                class="w-10 h-10"
            />
            <div class="flex flex-col ml-2">
                <span class="text-md font-bold">Twibber</span>
                <span class="text-sm text-gray-400">@twibber</span>
            </div>
        </div>
    </div>


    <!-- Main Content -->
    <main class="overflow-x-auto border-x border-gray-800 text-white max-w-screen-md w-full min-h-full">
        <slot/>
    </main>

    <!-- Navbar -->
    <div class="flex flex-col relative items-start w-full min-h-screen h-full max-w-[5rem] xl:max-w-xs mr-auto border-r border-gray-800">

    </div>
</div>