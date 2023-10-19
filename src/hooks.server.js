/** @type {import('@sveltejs/kit').HandleFetch} */
// This is used to authenticate requests to the API from the frontend server, incase data needs to be accessed
// serverside rather than clientside. This is useful as the api is seperate from the frontend.
export function handleFetch({event, request, fetch}) {
	request.headers.set('cookie', event.request.headers.get('cookie'));

	return fetch(request);
}