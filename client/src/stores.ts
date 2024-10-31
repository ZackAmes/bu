import { writable, derived } from "svelte/store";
import { type SetupResult } from "./dojo/setup";

export const dojoStore = writable<SetupResult>();
export const burnerManagerStore = derived(dojoStore, $store => $store.burnerManager);
export const account = writable<Account | null>(null);


export const ghostPositions = writable<[number, number, number][]>([]);
export const turretPositions = writable<[number, number, number][]>([]);