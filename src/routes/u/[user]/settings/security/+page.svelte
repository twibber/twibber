<script>
	import Display from "$components/Display.svelte";

	import UserData from "$components/UserData.svelte";
	import {buttons} from "$lib/buttons.js";
	import {page} from "$app/stores";

	export let data;
</script>

<Display
        title={`${data?.profile?.user?.username}'s Settings` || "Settings"}
        buttons={data?.session?.connection?.user?.username === $page.params.user ? buttons.account : []}
>
    <UserData profile={data?.profile} session={data.session}/>

    <!--Not Implemented-->
    <div class="text-center text-gray-400 text-xs">
        This page is not implemented yet.
    </div>
</Display>