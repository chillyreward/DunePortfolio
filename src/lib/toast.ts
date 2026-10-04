// Tiny event bus for the site-wide status toast (see ToastHost).
export const TOAST_EVENT = 'site-toast';

export function showToast(message: string) {
  window.dispatchEvent(new CustomEvent<string>(TOAST_EVENT, { detail: message }));
}

export const OPEN_SEARCH_EVENT = 'site-open-search';

export function openSearch() {
  window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));
}
