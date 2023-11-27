import {request} from "$lib/request.js";

export const load = (async ({fetch, depends}) => {
	depends('app:session');

	const session = await request({
		method: 'GET',
		url: '/account',
		fetchHandler: fetch,
	}).catch(() => null).then((res) => res?.body?.data);

	if (session) {
		return {
			session: session
		}
	} else {
		return {}
	}
})