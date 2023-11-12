<script>
	import Display from "$components/Display.svelte";
</script>

<Display
        title="Home"
        buttons={[
        {
            title: "For You",
            href: "/",
            icon: "fluent:person-32-filled"
        },
        {
            title: "Following",
            href: "/following",
            icon: "fluent:person-32-filled"
        }
    ]}
>
    <ul role="list" class="space-y-3 p-4">
        <li class="overflow-hidden rounded-md bg-white px-6 py-4 shadow">
            post
        </li>
        <li class="overflow-hidden rounded-md bg-white px-6 py-4 shadow">
            post
        </li>
    </ul>
</Display>