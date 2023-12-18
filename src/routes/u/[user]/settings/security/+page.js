export const load = (async ({/*fetch, params,*/ depends}) => {
	depends('app:security');

	return {
		/*security: {
			sessions: await request({
				method: 'GET',
				url: `/account/sessions`,
				fetchHandler: fetch,
			}).catch(handleErrorsLoad).then((res) => res?.body?.data),
			connections: await request({
				method: 'GET',
				url: `/account/connections`,
				fetchHandler: fetch,
			}).catch(handleErrorsLoad).then((res) => res?.body?.data),
		},*/
	}
})