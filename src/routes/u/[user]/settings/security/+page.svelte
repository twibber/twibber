<script>
	import Display from "$components/Display.svelte";
	import UserData from "$components/UserData.svelte";
	import NotImplemented from "$components/NotImplemented.svelte";

	import {buttons} from "$lib/buttons.js";
	import {page} from "$app/stores";

	export let data;
</script>

<Display
        title={`${data?.profile?.user?.username}'s Settings` || "Settings"}
        buttons={data?.session?.connection?.user?.username === $page.params.user ? buttons.account : []}
>
    <UserData profile={data?.profile} session={data?.session}/>

    <NotImplemented/>

    <!--<div class="flex flex-col gap-2 w-full p-4">
        <div class="text-xl font-bold">Sessions</div>
        <div class="grid grid-cols-2">
            {#each data?.security?.sessions as session (session.id)}
                <div class="flex flex-col gap-2 p-4 border rounded">
                    <div class="flex flex-col justify-between">
                        <div class="font-bold">{session?.info?.ip_addresses?.join(", ")}</div>
                        <div class="text-xs text-gray-400">Created At: {new Date(session.created_at).toDateString()}</div>
                        <div class="text-xs text-gray-400">Expires At: {new Date(session.expires_at).toDateString()}</div>
                    </div>
                    <div class="flex flex-row justify-between">
                        <div class="text-xs text-gray-500">{session?.info?.user_agent}</div>
                    </div>
                </div>
            {/each}
        </div>
    </div>-->
</Display>