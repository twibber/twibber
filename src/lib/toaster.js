import { writable } from 'svelte/store';

export const toasts = writable([]);

function createToast(type, message, duration = 5000) {
	const id = Date.now();
	toasts.update((toasts) => [...toasts, { id, message, type, duration }]);
	setTimeout(() => removeToast(id), duration);
}

export function removeToast(id) {
	toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
}

export const toast = {
	error: (msg, duration) => createToast('error', msg, duration),
	success: (msg, duration) => createToast('success', msg, duration)
};