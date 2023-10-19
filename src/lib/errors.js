import { writable } from 'svelte/store';
import { toast } from '$lib/toaster.js';

export const errors = writable([{}]);

export const addError = (field, message) => {
	errors.update((fields) => {
		fields.push({ name: field, errors: [message] });
		return fields;
	});
};

export const handleErrors = (err) => {
	if (err) {
		if (err.status) {
			toast.error(err.body?.error?.message);
			errors.set(err.body?.error?.details?.fields || []);
		} else {
			toast.error(err.error?.message);
			errors.set(err.error?.details?.fields || []);
		}
	}
};

export const handleErrorsPage = (data) => {
	if (data?.error) {
		toast.error(data.error?.message);
		errors.set(data.error?.details?.fields || []);
		delete data.error;
		delete data.success;
	}
};