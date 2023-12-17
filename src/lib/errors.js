import {writable} from 'svelte/store';
import {toast} from '$lib/toaster.js';
import {setModal} from "$lib/modals.js";

export const errors = writable([{}]);

export const addError = (field, message) => {
	errors.update((fields) => {
		fields.push({name: field, errors: [message]});
		return fields;
	});
};

export const handleErrorsLoad = (err) => {
	console.log(err);

	throw err
};


export const handleErrors = (err) => {
	console.log(err?.body?.data)
	console.log(err?.data)

	// this allows us to use it with normal fetch requests as well
	let data = err?.body?.data || err?.data;

	toast.error(data?.message);
	errors.set(data?.details?.fields || []);

	switch (data?.code) {
		case "UNAUTHORIZED":
			setModal('login');
			break;
		case "UNVERIFIED":
			setModal('verify');
			break;
	}
};
