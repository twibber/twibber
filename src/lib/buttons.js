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
