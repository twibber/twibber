import {request} from "$lib/request.js";
import {handleErrorsLoad} from "$lib/errors.js";

export const load = (async ({fetch, params, depends}) => {
	depends('app:following');

	return {
		following: await request({
			method: 'GET',
			url: `/users/${params.user}/following`,
			fetchHandler: fetch,
		}).catch(handleErrorsLoad).then((res) => res?.body?.data),
	}
})