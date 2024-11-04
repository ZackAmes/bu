import { writable, derived } from "svelte/store";
import { type SetupResult } from "./dojo/setup";
import type { Account } from "starknet";
import type { ComponentStore } from "./componentValueStore";
import type { Ghost as GhostType } from "./dojo/typescript/models.gen";
import type { Turret as TurretType } from "./dojo/typescript/models.gen";
import * as THREE from 'three';
import Controller from "@cartridge/controller";

export const dojoStore = writable<SetupResult>();

export const account = writable<Controller | null>(null);

export const tick = writable<number>(0);
export const state = writable<any>(null);

export const username = writable<string>("");

export const isPlacingTurret = writable<boolean>(false);
export const turretPosition = writable<[number, number, number]>([0, 0, 0]);

export const isTurretSelected = writable<boolean>(false);
export const selectedTurret = writable<TurretType | null>(null);

export const tunnelTexture = writable<THREE.Texture | null>(null);
export const portalTexture = writable<THREE.Texture | null>(null);

export const timer = writable<number>(0);
export const paused = writable<boolean>(false);