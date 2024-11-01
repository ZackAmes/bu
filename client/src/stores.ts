import { writable, derived } from "svelte/store";
import { type SetupResult } from "./dojo/setup";
import type { Account } from "starknet";
import type { ComponentStore } from "./componentValueStore";

export const dojoStore = writable<SetupResult>();
export const burnerManagerStore = derived(dojoStore, $store => $store.burnerManager);
export const account = writable<Account | null>(null);
export const currentSession = writable<ComponentStore | null>(null);

export const ghostPositions = writable<[number, number, number][]>([]);
export const turretPositions = writable<[number, number, number][]>([]);