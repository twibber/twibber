import {writable} from 'svelte/store';
import {errors} from "$lib/errors.js";

export const modalStore = writable({modal: '', data: null});

export const setModal = (modal, data) => {
	// reset errors in case of modal change
	errors.set([]);

	// set modal
	modalStore.set({modal, data});
};

export const hideModal = () => {
	// hide modal
	modalStore.set({modal: '', data: null});

	// reset errors
	errors.set([]);
};