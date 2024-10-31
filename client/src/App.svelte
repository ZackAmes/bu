<script lang="ts">
    import type { Entity } from "@dojoengine/recs";
    import { componentValueStore } from "./componentValueStore";
    import { dojoStore, burnerManagerStore } from "./stores";
    import type { ComponentStore } from "./componentValueStore";
    import Scene from "./Scene.svelte";
    import { account } from "./stores";
    import { Canvas } from "@threlte/core";

    let entityId: Entity;
    let address: string;
    let session: ComponentStore;
    

    $: ({ clientComponents, torii, burnerManager, client } = $dojoStore);

    $: if (torii) entityId = torii.poseidonHash([burnerManager.getActiveAccount()?.address!])

    $: if (dojoStore) session = componentValueStore(clientComponents.Session, entityId);

    function handleButtonClick() {
        // Add your button click logic here
        if (client){
            if (!$account) {
                account.set(burnerManager.account);
            }
            console.log("Account set to", $account);
            client.spawn($account);
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
        height: 100vh; /* Adjust as needed */
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
