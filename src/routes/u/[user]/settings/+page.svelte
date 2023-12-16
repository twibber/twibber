<script>
	import Display from "$components/Display.svelte";

	import UserData from "$components/UserData.svelte";
	import Input from "$components/Input.svelte";
	import {request} from "$lib/request.js";
	import {toast} from "$lib/toaster.js";
	import {goto, invalidate, invalidateAll} from "$app/navigation";
	import {handleErrors} from "$lib/errors.js";

	export let data;

	let displayName = data?.profile?.user?.display_name || "";
	let username = data?.profile?.user?.username || "";

	let promise = null;

	async function handleUpdateUser() {
		if (displayName === data?.profile?.user?.display_name && username === data?.profile?.user?.username) {
			toast.error("No changes to update.");
			return;
		}

		promise = request({
			method: 'PATCH',
			url: '/account',
			body: {
				display_name: displayName,
				username: username,
			},
		}).then((res) => {
			if (res?.body?.success) {
				toast.success("Profile updated successfully!");

				if (username !== data?.profile?.user?.username) {
					void invalidate("app:session")
					void goto(`/u/${username}/settings`);
				} else {
					void invalidate("app:profile");
				}
			}
		}).catch(handleErrors).finally(() => {
			promise = null;
		});
	}
</script>

<Display
        title={`${data?.profile?.user?.username}'s Settings` || "Settings"}
>
    <UserData profile={data?.profile} session={data.session}/>

    <div class="flex flex-col p-4 gap-3">
        <Input
                id="display_name"
                type="text"
                name="Display Name"
                bind:value={displayName}
        />

        <Input
                id="username"
                type="text"
                name="Username"
                bind:value={username}
        />

        <button
                class="text-white bg-blue-700 hover:bg-blue-800 rounded-md p-2 transition text-sm"
                disabled={promise}
                on:click={handleUpdateUser}
        >
            Update Profile
        </button>
    </div>
</Display>