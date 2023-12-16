<script>
	import Display from "$components/Display.svelte";

	import UserData from "$components/UserData.svelte";
	import UserCard from "$components/UserCard.svelte";
	import {buttons} from "$lib/buttons.js";

	export let data;
</script>

<Display
        title={`${data?.profile?.user?.username}'s Following` || "Following"}
        buttons={buttons.account}
>
    <UserData profile={data?.profile} session={data.session}/>

    <ul role="list" class="space-y-3 p-4">
        {#each data?.following as user (user.id)}
            <UserCard user={user}/>
        {/each}
    </ul>
</Display>