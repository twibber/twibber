import {request} from "$lib/request.js";
import {handleErrorsLoad} from "$lib/errors.js";

export const load = (async ({fetch, depends}) => {
	depends('app:users');

	return {
		users: await request({
			method: 'GET',
			url: `/users`,
			fetchHandler: fetch,
		}).catch(handleErrorsLoad).then((res) => res?.body?.data),
	}
})