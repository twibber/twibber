import { request } from '$lib/request.js';
import { handleErrors } from '$lib/errors.js';
import { invalidateAll } from '$app/navigation';

export const logout = async () =>
	await request({
		method: 'DELETE',
		url: '/auth/logout'
	})
		.then((res) => {
			if (res?.body?.success) {
				invalidateAll();
			}
		})
		.catch(handleErrors);

export let buttons = {
	account: [
		{
			href: `/account/[user]/settings`,
			icon: 'mdi:cog'
		},
		{
			href: `/account/[user]/settings/security`,
			icon: 'mdi:shield-lock'
		},
	]
}