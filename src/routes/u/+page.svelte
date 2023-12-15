<script>
	import Display from "$components/Display.svelte";
	import UserCard from "$components/UserCard.svelte";

	export let data;
</script>

<Display title={"Users"}>
    <ul role="list" class="space-y-3 p-4">
        {#each data?.users as user (user.id)}
            <UserCard user={user}/>
        {/each}
    </ul>
</Display>