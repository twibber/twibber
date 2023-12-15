<script>
	import Display from "$components/Display.svelte";

	import UserData from "$components/UserData.svelte";

	export let data;
</script>

<Display
        title={data?.profile?.user?.username || "Profile"}
>
    <UserData profile={data?.profile} session={data.session}/>

    <div class="text-center text-gray-500 py-8">
        This page has not yet been implemented.
    </div>
</Display>