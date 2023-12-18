<script>
	import Display from "$components/Display.svelte";

	import UserData from "$components/UserData.svelte";
	import UserCard from "$components/UserCard.svelte";
	import {buttons} from "$lib/buttons.js";
	import {page} from "$app/stores";

	export let data;
</script>

<Display
        title={`${data?.profile?.user?.username}'s Followers` || "Followers"}
        buttons={data?.session?.connection?.user?.username === $page.params.user ? buttons.account : []}
>
    <UserData profile={data?.profile} session={data.session}/>

    <ul role="list" class="space-y-3 p-4">
        {#each data?.followers || [] as user (user.id)}
            <UserCard user={user}/>
        {/each}
    </ul>
</Display>