import { writable, derived } from "svelte/store";
import { type SetupResult } from "./dojo/setup";
import type { Account } from "starknet";
import type { ComponentStore } from "./componentValueStore";
import type { Ghost as GhostType } from "./dojo/typescript/models.gen";
import type { Turret as TurretType } from "./dojo/typescript/models.gen";
import { Mesh } from "three";

export const dojoStore = writable<SetupResult>();
export const burnerManagerStore = derived(dojoStore, $store => $store.burnerManager);
export const account = writable<Account | null>(null);
export const currentSession = writable<ComponentStore | null>(null);

export const ghostsOnchain = writable<GhostType[]>([]);
export const turretsOnchain = writable<TurretType[]>([]);

export const ghostsRender = writable<GhostType[]>([]);
export const turretsRender = writable<TurretType[]>([]);

export const tick = writable<number>(0);
export const state = writable<any>(null);
