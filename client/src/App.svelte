<script lang="ts">
    import type { Entity } from "@dojoengine/recs";
    import { componentValueStore } from "./componentValueStore";
    import { dojoStore, burnerManagerStore } from "./stores";
    import type { ComponentStore } from "./componentValueStore";
    import Scene from "./Scene.svelte";
    import { account, currentSession } from "./stores";
    import { Canvas } from "@threlte/core";
    import { getEntityIdFromKeys } from "@dojoengine/utils";
    import { getComponentValue } from "@dojoengine/recs";
    import { ghostsOnchain, turretsOnchain, ghostsRender, turretsRender } from "./stores";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import type {Turret as TurretType} from "./dojo/typescript/models.gen";
    import type {Ghost as GhostType} from "./dojo/typescript/models.gen";
    import * as THREE from "three";

    let entityId: Entity;
    let session: any;
    let ghost_ids: number[] = [];
    let turret_ids: number[] = [];


    onMount(() => {

        account.set(burnerManager.account);
        entityId = getEntityIdFromKeys([
            BigInt($account!.address),
        ]) as Entity;

        session = componentValueStore(clientComponents.Session, entityId);
        currentSession.set(session);

        console.log($session)
        $: ghost_ids = $session.ghosts;
        $: turret_ids = $session.turrets;
        console.log(ghost_ids)
        console.log(turret_ids)

        let ghosts = ghost_ids.map((id: Number) => {
            // @ts-ignore
            let entityId = getEntityIdFromKeys([BigInt(id.value)]) as Entity;
            let ghost: GhostType = getComponentValue(clientComponents.Ghost, entityId)!;
            return ghost;
        })

        let turrets = turret_ids.map((id: Number) => {
            // @ts-ignore
            let entityId = getEntityIdFromKeys([BigInt(id.value)]) as Entity;
            let turret: TurretType = getComponentValue(clientComponents.Turret, entityId)!;
            return turret;
        })

        ghostsOnchain.set(ghosts);
        turretsOnchain.set(turrets);

        ghostsRender.set(ghosts);
        turretsRender.set(turrets);
        
    });
    

    $: ({ clientComponents, torii, burnerManager, client } = $dojoStore);

    function handleButtonClick() {
        // Add your button click logic here
        if (client){
            if (!$account) {
                account.set(burnerManager.account);
            }
            client.spawn($account!);
        }
        else {
            console.log("Client not found");
        }
    }
</script>

<style>
    .canvas-container {
        position: relative;
        width: 100%;
        height: 98vh; /* Adjust as needed */
    }

    .overlay-button {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 10px 20px;
        background-color: #007bff;
        color: #ffffff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease;
    }

    .overlay-button:hover {
        background-color: #0056b3;
    }
</style>

<main class="canvas-container">
    <Canvas>
        <Scene {session}/>
    </Canvas>
    <button class="overlay-button" on:click={handleButtonClick}>
        Spawn
    </button>
</main>
