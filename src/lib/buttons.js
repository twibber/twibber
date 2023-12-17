import {request} from '$lib/request.js';
import {handleErrors} from '$lib/errors.js';
import {invalidateAll} from '$app/navigation';

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
		// profile
		{
			href: `/u/[user]/settings`,
			icon: 'mdi:cog'
		},
		// security
		{
			href: `/u/[user]/settings/security`,
			icon: 'mdi:account-lock'
		},
	]
}