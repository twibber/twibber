import {request} from "$lib/request.js";
import {handleErrorsLoad} from "$lib/errors.js";

export const load = (async ({fetch, params, depends}) => {
	depends('app:connection');

	return {
		connection: await request({
			method: 'GET',
			url: `/account/connections/${params.connection}`,
			fetchHandler: fetch,
		}).catch(handleErrorsLoad).then((res) => res?.body?.data),
	}
})