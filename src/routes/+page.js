import {request} from "$lib/request.js";

export const load = (async ({fetch}) => {
	const posts = await request({
		method: 'GET',
		url: '/posts',
		fetchHandler: fetch,
	}).catch(() => null).then((res) => res?.body?.data);

	return {
		posts
	}
})