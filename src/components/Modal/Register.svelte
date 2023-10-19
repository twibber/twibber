<script>
	import Template from './Template.svelte';
	import Input from './Input.svelte';

	import {goto, invalidate, invalidateAll} from '$app/navigation';
	import {getURL, request} from '$lib/request.js';
	import {hideModal, setModal} from '$lib/modals.js';
	import {addError, handleErrors} from '$lib/errors.js';

	let username = "", email = "", password = "", cPassword = "";

	async function emailRegister() {
		if (password !== cPassword) {
			addError("password", 'Passwords do not match')
			addError("cPassword", 'Passwords do not match')
		}

		return await request({
			method: 'POST',
			url: '/auth/register',
			body: {
				username,
				email,
				password
			}
		})
			.then((res) => {
				invalidate(getURL('/'))
					.catch((err) => handleErrors(err))
					.finally(() => {
						invalidateAll();
						goto('/');
						hideModal();
					});
			})
			.catch((err) => handleErrors(err));
	}
</script>

<Template
        title={"Register"}
        subtitle={"Register with your email address"}
        confirm={{
            name: 'Register',
            handler: emailRegister,
        }}
>
    <Input id="username" name="Username" placeholder="Username" type="text" bind:value={username}/>
    <Input id="email" name="Email Address" placeholder="Email Address" type="email" bind:value={email}/>
    <Input id="password" name="Password" placeholder="Password" type="password" bind:value={password}/>
    <Input id="cPassword" name="Confirm Password" placeholder="Confirm Password" type="password" bind:value={cPassword}/>
    <div class="text-xs font-medium text-gray-400">
        Don't have an account? <button on:click={() => setModal("register")} class="underline hover:text-gray-300 transition">Register</button>
    </div>
</Template>
