import {redirect} from "@sveltejs/kit";

export const load = (async () => {
	throw redirect('/', {status: 302})
})