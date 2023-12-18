<script>
	import Display from "$components/Display.svelte";
	import UserData from "$components/UserData.svelte";

	import {buttons} from "$lib/buttons.js";
	import {page} from "$app/stores";
	import NotImplemented from "$components/NotImplemented.svelte";

	export let data;
</script>

<Display
        title={`${data?.profile?.user?.username}'s Security` || "Security"}
        buttons={data?.session?.connection?.user?.username === $page.params.user ? buttons.account : []}
>
    <UserData profile={data?.profile} session={data?.session}/>

    <NotImplemented/>
</Display>