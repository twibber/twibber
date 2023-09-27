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
            title: "Explore",
            icon: "bx:bx-compass",
            href: "/explore"
        },
        {
            title: "Notifications",
            icon: "bx:bx-bell",
            href: "/notifications"
        },
        {
            title: "Messages",
            icon: "bx:bx-message",
            href: "/messages"
        },
        {
            title: "Bookmarks",
            icon: "bx:bx-bookmark",
            href: "/bookmarks"
        },
        {
            title: "Lists",
            icon: "bx:bx-list-ul",
            href: "/lists"
        },
        {
            title: "Profile",
            icon: "bx:bx-user",
            href: "/profile"
        },
        {
            title: "More",
            icon: "bx:bx-dots-horizontal-rounded",
            href: "/more"
        }
    ]
</script>

<svelte:head>
    <title>Twibber</title>
</svelte:head>

<div class="flex flex-row min-h-screen w-full bg-gray-900 text-white">
    <!-- Navbar -->
    <div class="flex flex-col relative items-start w-full h-full max-w-[5rem] md:max-w-xs ml-auto">
        <div class="flex flex-row items-center justify-center md:justify-start w-full px-4 pt-4">
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
                    <span class="text-md font-bold hidden md:block">{link.title}</span>
                </a>
            {/each}
        </nav>
    </div>


    <!-- Main Content -->
    <main class="overflow-x-auto border-x border-gray-700 text-white max-w-screen-md w-full min-h-full">
        <slot/>
    </main>

    <!-- Navbar -->
    <div class="flex flex-col relative items-start w-full h-full max-w-[5rem] md:max-w-xs ml-auto">

    </div>
</div>