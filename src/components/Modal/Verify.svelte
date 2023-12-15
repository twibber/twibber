<script>
	import Template from './Template.svelte';
	import Input from './Input.svelte';

	import {invalidateAll} from '$app/navigation';
	import {request} from '$lib/request.js';
	import {hideModal} from '$lib/modals.js';
	import {handleErrors} from '$lib/errors.js';
	import {toast} from "$lib/toaster.js";
	import {env} from "$env/dynamic/public"
	import {page} from "$app/stores";

	let code = "";

	async function emailVerify() {
		return await request({
			method: 'POST',
			url: '/auth/email/verify',
			body: {
				code
			},
			captcha: "verify",
		}).then((res) => {
			if (res?.body?.success) {
				toast.success("Email address was successfully verified!");
				invalidateAll();
				hideModal();
			}
		}).catch(handleErrors);
	}

	console.log("page", $page);
</script>

<Template
        title={"Verify"}
        subtitle={"Verify your email address"}
        confirm={{
            name: 'Verify',
            handler: emailVerify,
        }}
>
    <Input id="code" name="Code" placeholder="Code" type="text" bind:value={code}/>
    <div class="text-xs font-medium text-gray-400">
        {$page.data?.session?.connection?.user?.email || ""}
        <a href={`${env.PUBLIC_API_URL}/auth/logout`} class="underline hover:text-gray-300 transition">Logout</a>
    </div>
    <div class="text-xs font-medium text-gray-400">
        Haven't received the email?
        <button class="underline hover:text-gray-300 transition" type="button" on:click={() => {
            request({
                method: 'POST',
                url: '/auth/email/resend',
                body: {
                    email: $page.data?.session?.connection?.user?.email || ""
                },
                captcha: "resend",
            }).then((res) => {
                if (res?.body?.success) {
                    toast.success("Email was successfully resent!");
                }
            }).catch(handleErrors);
        }}>Resend
        </button>
    </div>
</Template>
