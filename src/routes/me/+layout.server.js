import {request} from "$lib/request.js";
import {handleErrorsLoad} from "$lib/errors.js";

export const load = (async ({fetch}) => {
	return await request({
		method: 'GET',
		url: '/account',
		fetchHandler: fetch,
	}).catch(handleErrorsLoad).then((res) => {
		return {
			session: res?.body?.data
		}
	});
})