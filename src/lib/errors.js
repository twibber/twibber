import {writable} from 'svelte/store';
import {toast} from '$lib/toaster.js';
import {redirect} from "@sveltejs/kit";
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

	switch (err?.body?.data?.code) {
		case "UNAUTHORIZED":
			throw redirect(302, '/');
		case "UNVERIFIED":
			throw redirect(302, '/auth/flow/verify');
	}

	throw err
};


export const handleErrors = (err) => {
	console.log(err)

	console.log(err?.body?.data?.code)
	switch (err?.body?.data?.code) {
		case "UNAUTHORIZED":
			throw redirect(302, '/');
		case "UNVERIFIED":
			setModal('verify');
	}

	if (err?.body?.success === false) {
		toast.error(err.body?.data?.message);
		errors.set(err.body?.data?.details?.fields || []);
	}
};
