
// Generated by dojo-bindgen on Thu, 31 Oct 2024 08:36:07 +0000. Do not modify this file manually.
// Import the necessary types from the recs SDK
// generate again with `sozo build --typescript` 
import { defineComponent, Type as RecsType, type World } from "@dojoengine/recs";

export type ContractComponents = Awaited<ReturnType<typeof defineContractComponents>>;



// Type definition for `dojo::model::layout::Layout` enum
export type Layout = { type: 'Fixed'; value: RecsType.NumberArray; } | { type: 'Struct'; value: RecsType.StringArray; } | { type: 'Tuple'; value: RecsType.StringArray; } | { type: 'Array'; value: RecsType.StringArray; } | { type: 'ByteArray'; } | { type: 'Enum'; value: RecsType.StringArray; };

export const LayoutDefinition = {
    type: RecsType.String,
    value: RecsType.String
};
        
// Type definition for `core::byte_array::ByteArray` struct
export interface ByteArray {
    data: String[];
    pending_word: BigInt;
    pending_word_len: Number;
    
}
export const ByteArrayDefinition = {
    data: RecsType.StringArray,
    pending_word: RecsType.BigInt,
    pending_word_len: RecsType.Number,
    
};

// Type definition for `dojo::model::layout::FieldLayout` struct
export interface FieldLayout {
    selector: BigInt;
    layout: Layout;
    
}
export const FieldLayoutDefinition = {
    selector: RecsType.BigInt,
    layout: LayoutDefinition,
    
};

// Type definition for `dojo_starter::models::Ghost` struct
export interface Ghost {
    id: Number;
    column: Number;
    row: Number;
    typ: Number;
    health: Number;
    attack: Number;
    rate: Number;
    vel_x: Number;
    target: Number;
    
}
export const GhostDefinition = {
    id: RecsType.Number,
    column: RecsType.Number,
    row: RecsType.Number,
    typ: RecsType.Number,
    health: RecsType.Number,
    attack: RecsType.Number,
    rate: RecsType.Number,
    vel_x: RecsType.Number,
    target: RecsType.Number,
    
};


// Type definition for `dojo_starter::models::Session` struct
export interface Session {
    player: BigInt;
    ghosts: Number[];
    turrets: Number[];
    level: Number;
    ectoplasm: Number;
    
}
export const SessionDefinition = {
    player: RecsType.BigInt,
    ghosts: RecsType.NumberArray,
    turrets: RecsType.NumberArray,
    level: RecsType.Number,
    ectoplasm: RecsType.Number,
    
};


// Type definition for `dojo_starter::models::Turret` struct
export interface Turret {
    id: Number;
    column: Number;
    row: Number;
    typ: Number;
    health: Number;
    attack: Number;
    rate: Number;
    range: Number;
    target: Number;
    
}
export const TurretDefinition = {
    id: RecsType.Number,
    column: RecsType.Number,
    row: RecsType.Number,
    typ: RecsType.Number,
    health: RecsType.Number,
    attack: RecsType.Number,
    rate: RecsType.Number,
    range: RecsType.Number,
    target: RecsType.Number,
    
};


export function defineContractComponents(world: World) {
    return {

        // Model definition for `dojo_starter::models::Ghost` model
        Ghost: (() => {
            return defineComponent(
                world,
                {
                    id: RecsType.Number,
                    column: RecsType.Number,
                    row: RecsType.Number,
                    typ: RecsType.Number,
                    health: RecsType.Number,
                    attack: RecsType.Number,
                    rate: RecsType.Number,
                    vel_x: RecsType.Number,
                    target: RecsType.Number,
                },
                {
                    metadata: {
                        namespace: "bu",
                        name: "Ghost",
                        types: ["u32", "u16", "u16", "u8", "u16", "u16", "u16", "u16", "u32"],
                        customTypes: [],
                    },
                }
            );
        })(),

        // Model definition for `dojo_starter::models::Session` model
        Session: (() => {
            return defineComponent(
                world,
                {
                    player: RecsType.BigInt,
                    ghosts: RecsType.NumberArray,
                    turrets: RecsType.NumberArray,
                    level: RecsType.Number,
                    ectoplasm: RecsType.Number,
                },
                {
                    metadata: {
                        namespace: "bu",
                        name: "Session",
                        types: ["ContractAddress", "array", "array", "u8", "u32"],
                        customTypes: [],
                    },
                }
            );
        })(),

        // Model definition for `dojo_starter::models::Turret` model
        Turret: (() => {
            return defineComponent(
                world,
                {
                    id: RecsType.Number,
                    column: RecsType.Number,
                    row: RecsType.Number,
                    typ: RecsType.Number,
                    health: RecsType.Number,
                    attack: RecsType.Number,
                    rate: RecsType.Number,
                    range: RecsType.Number,
                    target: RecsType.Number,
                },
                {
                    metadata: {
                        namespace: "bu",
                        name: "Turret",
                        types: ["u32", "u16", "u16", "u8", "u16", "u16", "u16", "u16", "u32"],
                        customTypes: [],
                    },
                }
            );
        })(),
    };
}
