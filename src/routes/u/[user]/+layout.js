import {request} from "$lib/request.js";
import {handleErrorsLoad} from "$lib/errors.js";

export const load = (async ({fetch, params, depends}) => {
	depends('profile');

	return {
		profile: {
			user: await request({
				method: 'GET',
				url: `/users/${params.user}`,
				fetchHandler: fetch,
			}).catch(handleErrorsLoad).then((res) => res?.body?.data),
			posts: await request({
				method: 'GET',
				url: `/users/${params.user}/posts`,
				fetchHandler: fetch,
			}).catch(handleErrorsLoad).then((res) => res?.body?.data),
		}
	}
})