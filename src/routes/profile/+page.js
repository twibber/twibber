import {request} from "$lib/request.js";
import {redirect} from "@sveltejs/kit";
import {handleErrorsLoad} from "$lib/errors.js";

export const load = (async ({fetch}) => {
	const session = await request({
		method: 'GET',
		url: '/account',
		fetchHandler: fetch,
	}).catch(handleErrorsLoad).then((res) => res?.body?.data);

	if (session) {
		throw redirect(302, `/profile/${session?.connection?.user?.username}`);
	} else {
		throw redirect(302, '/');
	}
})