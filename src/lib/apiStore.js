import { writable } from 'svelte/store';

export const api = writable('https://pointercrate.com/api/v2/demons/listed/?limit=75');