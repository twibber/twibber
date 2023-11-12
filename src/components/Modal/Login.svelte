<script>
	import Template from './Template.svelte';
	import Input from './Input.svelte';

	import {invalidateAll} from '$app/navigation';
	import {request} from '$lib/request.js';
	import {hideModal, setModal} from '$lib/modals.js';
	import {handleErrors} from '$lib/errors.js';
	import {toast} from "$lib/toaster.js";

	let email = "", password = "";

	async function emailLogin() {
		return await request({
			method: 'POST',
			url: '/auth/email/login',
			body: {
				email,
				password
			}
		}).then((res) => {
			if (res?.body?.success) {
				toast.success("Logged in successfully!");
				invalidateAll();
				hideModal();
			}
		}).catch(handleErrors);
	}
</script>

<Template
        title={"Login"}
        subtitle={"Log in to your account"}
        confirm={{
            name: 'Login',
            handler: emailLogin,
        }}
>
    <Input id="email" autocomplete="username" name="Email Address" placeholder="Email Address" type="email"
           bind:value={email}/>
    <Input id="password" autocomplete="current-password" name="Password" placeholder="Password" type="password"
           bind:value={password}/>
    <div class="text-xs font-medium text-gray-400">
        Don't have an account?
        <button on:click={() => setModal("register")} type="button" class="underline hover:text-gray-300 transition">
            Register
        </button>
    </div>
</Template>
