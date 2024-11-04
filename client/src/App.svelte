<script lang="ts">
    import { dojoStore, account, state, tick, isPlacingTurret } from "./stores";
    import Scene from "./Scene.svelte";
    import { Canvas } from "@threlte/core";
    import { connect } from "./controller";
    import TitleScreen from "./TitleScreen.svelte";

    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    // Define game states
    type GameState = 'title' | 'loading' | 'game';

    const currentGameState = writable<GameState>('title');

    $: ({ clientComponents, client } = $dojoStore);

    function handleStart() {
        currentGameState.set('loading');
        initializeGame();
    }

    async function initializeGame() {
        // Perform any initialization or loading logic here
        if (!$account) {
            await connect();
        }
        if (client && $account) {
            const initialState = await client.iterate($account.account, 0);
            state.set(initialState);
            tick.set($tick + 1);
        }
        currentGameState.set('game');
    }

    function handleSpawnClick() {
        // Existing spawn logic
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
        // Existing reset logic
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

    /* Title and Loading Screens will handle their own styling */
</style>

<main class="canvas-container">
    {#if !$account}
        <TitleScreen on:start={handleStart} />
    {:else if $state}
            <Canvas>
                <Scene/>
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
                    <button class="overlay-button" on:click={handleConnect}>
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
    {/if}
</main>
