import type { SchemaType } from "@dojoengine/sdk";

// Type definition for `bu::models::GhostValue` struct
export interface GhostValue {
	fieldOrder: string[];
	lane: number;
	pos: number;
	typ: number;
	health: number;
	attack: number;
	rate: number;
	range: number;
	target: number;
}

// Type definition for `bu::models::Ghost` struct
export interface Ghost {
	fieldOrder: string[];
	id: number;
	lane: number;
	pos: number;
	typ: number;
	health: number;
	attack: number;
	rate: number;
	range: number;
	target: number;
}

// Type definition for `bu::models::Session` struct
export interface Session {
	fieldOrder: string[];
	player: string;
	ghosts: Array<number>;
	turrets: Array<number>;
	level: number;
	ectoplasm: number;
}

// Type definition for `bu::models::SessionValue` struct
export interface SessionValue {
	fieldOrder: string[];
	ghosts: Array<number>;
	turrets: Array<number>;
	level: number;
	ectoplasm: number;
}

// Type definition for `bu::models::TurretValue` struct
export interface TurretValue {
	fieldOrder: string[];
	lane: number;
	pos: number;
	typ: number;
	health: number;
	attack: number;
	rate: number;
	vel: number;
	target: number;
}

// Type definition for `bu::models::Turret` struct
export interface Turret {
	fieldOrder: string[];
	id: number;
	lane: number;
	pos: number;
	typ: number;
	health: number;
	attack: number;
	rate: number;
	vel: number;
	target: number;
}

export interface BuSchemaType extends SchemaType {
	bu: {
		GhostValue: GhostValue,
		Ghost: Ghost,
		Session: Session,
		SessionValue: SessionValue,
		TurretValue: TurretValue,
		Turret: Turret,
		ERC__Balance: ERC__Balance,
		ERC__Token: ERC__Token,
		ERC__Transfer: ERC__Transfer,
	},
}
export const schema: BuSchemaType = {
	bu: {
		GhostValue: {
			fieldOrder: ['lane', 'pos', 'typ', 'health', 'attack', 'rate', 'range', 'target'],
			lane: 0,
			pos: 0,
			typ: 0,
			health: 0,
			attack: 0,
			rate: 0,
			range: 0,
			target: 0,
		},
		Ghost: {
			fieldOrder: ['id', 'lane', 'pos', 'typ', 'health', 'attack', 'rate', 'range', 'target'],
			id: 0,
			lane: 0,
			pos: 0,
			typ: 0,
			health: 0,
			attack: 0,
			rate: 0,
			range: 0,
			target: 0,
		},
		Session: {
			fieldOrder: ['player', 'ghosts', 'turrets', 'level', 'ectoplasm'],
			player: "",
			ghosts: [0],
			turrets: [0],
			level: 0,
			ectoplasm: 0,
		},
		SessionValue: {
			fieldOrder: ['ghosts', 'turrets', 'level', 'ectoplasm'],
			ghosts: [0],
			turrets: [0],
			level: 0,
			ectoplasm: 0,
		},
		TurretValue: {
			fieldOrder: ['lane', 'pos', 'typ', 'health', 'attack', 'rate', 'vel', 'target'],
			lane: 0,
			pos: 0,
			typ: 0,
			health: 0,
			attack: 0,
			rate: 0,
			vel: 0,
			target: 0,
		},
		Turret: {
			fieldOrder: ['id', 'lane', 'pos', 'typ', 'health', 'attack', 'rate', 'vel', 'target'],
			id: 0,
			lane: 0,
			pos: 0,
			typ: 0,
			health: 0,
			attack: 0,
			rate: 0,
			vel: 0,
			target: 0,
		},
		ERC__Balance: {
			fieldOrder: ['balance', 'type', 'tokenmetadata'],
			balance: '',
			type: 'ERC20',
			tokenMetadata: {
				fieldOrder: ['name', 'symbol', 'tokenId', 'decimals', 'contractAddress'],
				name: '',
				symbol: '',
				tokenId: '',
				decimals: '',
				contractAddress: '',
			},
		},
		ERC__Token: {
			fieldOrder: ['name', 'symbol', 'tokenId', 'decimals', 'contractAddress'],
			name: '',
			symbol: '',
			tokenId: '',
			decimals: '',
			contractAddress: '',
		},
		ERC__Transfer: {
			fieldOrder: ['from', 'to', 'amount', 'type', 'executed', 'tokenMetadata'],
			from: '',
			to: '',
			amount: '',
			type: 'ERC20',
			executedAt: '',
			tokenMetadata: {
				fieldOrder: ['name', 'symbol', 'tokenId', 'decimals', 'contractAddress'],
				name: '',
				symbol: '',
				tokenId: '',
				decimals: '',
				contractAddress: '',
			},
			transactionHash: '',
		},

	},
};
// Type definition for ERC__Balance struct
export type ERC__Type = 'ERC20' | 'ERC721';
export interface ERC__Balance {
    fieldOrder: string[];
    balance: string;
    type: string;
    tokenMetadata: ERC__Token;
}
export interface ERC__Token {
    fieldOrder: string[];
    name: string;
    symbol: string;
    tokenId: string;
    decimals: string;
    contractAddress: string;
}
export interface ERC__Transfer {
    fieldOrder: string[];
    from: string;
    to: string;
    amount: string;
    type: string;
    executedAt: string;
    tokenMetadata: ERC__Token;
    transactionHash: string;
}