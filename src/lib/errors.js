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
	console.log(err)

	if (err?.body?.success === false) {
		toast.error(err.body?.data?.message);
		errors.set(err.body?.data?.details?.fields || []);
	}

	switch (err?.body?.data?.code) {
		case "UNAUTHORIZED":
			setModal('login');
			break;
		case "UNVERIFIED":
			setModal('verify');
			break;
	}
};
