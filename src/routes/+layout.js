import {request} from "$lib/request.js";
import {handleErrorsLoad} from "$lib/errors.js";

export const ssr = false;

export const load = (async ({fetch, depends}) => {
	depends('app:session');

	const session = await request({
		method: 'GET',
		url: '/account',
		fetchHandler: fetch,
	}).catch(() => handleErrorsLoad).then((res) => res?.body?.data);

	if (session) {
		session.connection.user.email = await request({
			method: 'GET',
			url: '/account/email',
			fetchHandler: fetch,
		}).catch(() => handleErrorsLoad).then((res) => res?.body?.data);

		return {
			session,
		}
	} else {
		return {}
	}
})