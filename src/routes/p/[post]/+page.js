import {request} from "$lib/request.js";

export const load = (async ({fetch, params, depends}) => {
	depends('post');

	return {
		post: await request({
			method: 'GET',
			url: `/posts/${params.post}`,
			fetchHandler: fetch,
		}).catch(() => null).then((res) => res?.body?.data)
	}
})