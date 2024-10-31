<script lang="ts">
    import type { Entity } from "@dojoengine/recs";
    import { componentValueStore } from "./componentValueStore";
    import { dojoStore, burnerManagerStore } from "./stores";
    import type { ComponentStore } from "./componentValueStore";
    import Scene from "./Scene.svelte";
    import { Canvas } from "@threlte/core";

    let entityId: Entity;
    let address: string;
    let position: ComponentStore;
    let moves: ComponentStore;
    

    $: ({ clientComponents, torii, burnerManager, client } = $dojoStore);

    $: if (torii) entityId = torii.poseidonHash([burnerManager.getActiveAccount()?.address!])

    $: if (dojoStore) position = componentValueStore(clientComponents.Position, entityId);
    $: if (dojoStore) moves = componentValueStore(clientComponents.Moves, entityId);

</script>

<main>
    <Canvas>
        <Scene {moves} {position}/>
    </Canvas>

</main>
