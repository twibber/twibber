<script>
	import Template from './Template.svelte';
	import Input from './Input.svelte';

	import {goto, invalidate} from '$app/navigation';
	import {getURL, request} from '$lib/request.js';
	import {hideModal, setModal} from '$lib/modals.js';
	import {handleErrors} from '$lib/errors.js';

	let email = "", password = "";

	async function emailLogin() {
		return await request({
			method: 'POST',
			url: '/auth/login',
			body: {
				email,
				password
			}
		})
			.then((res) => {
				invalidate(getURL('/'))
					.catch((err) => handleErrors(err))
					.finally(() => {
						goto('/' + res?.body?.project?.id);
						hideModal();
					});
			})
			.catch((err) => handleErrors(err));
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
    <Input id="email" name="Email Address" placeholder="Email Address" type="email" bind:value={email}/>
    <Input id="password" name="Password" placeholder="Password" type="password" bind:value={password}/>
    <div class="text-xs font-medium text-gray-400">
        Don't have an account? <button on:click={() => setModal("register")} class="underline hover:text-gray-300 transition">Register</button>
    </div>
</Template>
