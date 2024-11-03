<script lang="ts">
    import type { Entity } from "@dojoengine/recs";
    import { componentValueStore } from "./componentValueStore";
    import { dojoStore } from "./stores";
    import type { ComponentStore } from "./componentValueStore";
    import Scene from "./Scene.svelte";
    import { account, currentSession } from "./stores";
    import { Canvas } from "@threlte/core";
    import { getEntityIdFromKeys } from "@dojoengine/utils";
    import { getComponentValue } from "@dojoengine/recs";
    import { ghostsOnchain, turretsOnchain, ghostsRender, turretsRender, tick, state, isPlacingTurret, isTurretSelected, selectedTurret } from "./stores";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import type {Turret as TurretType} from "./dojo/typescript/models.gen";
    import type {Ghost as GhostType} from "./dojo/typescript/models.gen";
    import * as THREE from "three";
    import { connect } from "./controller";

    let entityId: Entity;
    let session: any;
    let ghost_ids: number[] = [];
    let turret_ids: number[] = [];


    onMount(() => {
        
        if($account){
        entityId = getEntityIdFromKeys([
            BigInt($account!.account!.address),
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

        document.addEventListener("click", onMouseMove);

        }
        
    });
    

    $: ({ clientComponents, client } = $dojoStore);

    function handleSpawnClick() {
        // Add your spawn button click logic here
        if (client){
            if (!$account) {
                console.log("No account found");
            }
            client.start_game($account!.account!);
        }
        else {
            console.log("Client not found");
        }
    }

    function handleResetClick() {
        // Add your reset button click logic here
        console.log("Reset button clicked");
        // Implement reset functionality as needed
    }

    async function handleTickClick() {

        if (!$account) {
            await connect();
        }
        if (client){
            state.set(await client.iterate($account!.account!, $tick));
            tick.set($tick + 1);
            console.log($state)
        }
    }

    function handlePlaceTurretClick() {
        isPlacingTurret.set(!$isPlacingTurret);
    }

    function onMouseMove(e: MouseEvent) {
        console.log(e)
    }
</script>

<style>
    .canvas-container {
        position: relative;
        width: 100%;
        height: 98vh; /* Adjust as needed */
    }

    /* Button Containers */
    .button-container {
        position: absolute;
        top: 20px;
        display: flex;
        flex-direction: column; /* Arrange buttons vertically */
        gap: 10px; /* Space between buttons */
    }

    .right-button-container {
        right: 20px;
    }

    .left-button-container {
        left: 20px;
    }

    /* Button Styles */
    .overlay-button {
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

    /* Optional: Different color for the left button */
    .overlay-button.reset {
        background-color: #28a745;
    }

    .overlay-button.reset:hover {
        background-color: #1e7e34;
    }
</style>

<main class="canvas-container">
    <Canvas>
        <Scene {session}/>
    </Canvas>
    
    <!-- Right Button Container -->
    {#if $account}
    <div class="button-container right-button-container">
        <button class="overlay-button" on:click={handleSpawnClick}>
            Spawn
        </button>

        <button class="overlay-button" on:click={handleTickClick}>
            Tick {$tick}
        </button>

        <button class="overlay-button" on:click={handlePlaceTurretClick}>
            {#if $isPlacingTurret}
                Cancel
            {/if}
            Place Tower
        </button>
    </div>
    {/if}
    {#if !$account}
        <div class="button-container right-button-container">
            <button class="overlay-button" on:click={() => connect()}>
                Connect
            </button>
        </div>
    {/if}

    <!-- Left Button Container -->
    <div class="button-container left-button-container">
        <button class="overlay-button reset" on:click={handleResetClick}>
            Reset
        </button>
    </div>
</main>
