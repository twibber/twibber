import {env} from "$env/dynamic/public";

/** @type {import('@sveltejs/kit').HandleFetch} */
// This is used to authenticate requests to the API from the frontend server, incase data needs to be accessed
// serverside rather than clientside. This is useful as the api is seperate from the frontend.
export async function handleFetch({event, request, fetch}) {
	if (request.url.startsWith(env.PUBLIC_API_URL)) {
		request.headers.set('cookie', event.request.headers.get('cookie'));
	}

	return fetch(request);
}