<script lang="ts">
    import { dojoStore, account, state, tick, isPlacingTurret, paused, finished } from "./stores";
    import Scene from "./Scene.svelte";
    import { Canvas } from "@threlte/core";
    import { connect } from "./controller";
    import TitleScreen from "./TitleScreen.svelte";
    import { handleTickClick } from "./handlers";
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    // Define game states
    type GameState = 'title' | 'loading' | 'game';

    const currentGameState = writable<GameState>('title');

    $: ({ clientComponents, client } = $dojoStore);

    // Add this to check the state
    $: if ($state) {
        console.log("Current state:", $state);
        console.log("Is finished:", $state.finished);
    }

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

    function handlePauseClick() {
        // Existing spawn logic
        $paused = !$paused;
       
    }

    function handleResetClick() {
        // Existing reset logic
        console.log("Reset button clicked");
        $finished = false;
        $tick = 0;
        // Implement reset functionality as needed
    }

  

    function handlePlaceTurretClick() {
        isPlacingTurret.set(!$isPlacingTurret);
    }

    function handleRestartClick() {
        // Reset game logic here
        $tick = 0;
        state.set(null);
        currentGameState.set('title');
    }

    // Add this if you need to format numbers
    function formatNumber(num: number) {
        return num.toLocaleString();
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

    .stats-container {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 20px;
        background: rgba(0, 0, 0, 0.7);
        padding: 10px 20px;
        border-radius: 10px;
        color: white;
        font-family: 'Arial', sans-serif;
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .stat-item {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .stat-label {
        font-size: 14px;
        opacity: 0.8;
        text-transform: uppercase;
    }

    .stat-value {
        font-size: 18px;
        font-weight: bold;
        color: #ffd700; /* Gold color */
    }

    .tick-value {
        color: #00ff00; /* Green color for tick */
    }

    .game-over-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .game-over-popup {
        background: rgba(40, 40, 40, 0.95);
        padding: 2rem 4rem;
        border-radius: 15px;
        text-align: center;
        border: 2px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        animation: popup 0.3s ease-out;
    }

    @keyframes popup {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    .game-over-title {
        color: #ff4444;
        font-size: 48px;
        margin-bottom: 20px;
        font-family: 'Creepster', cursive;
        text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
    }

    .game-over-score {
        color: #ffd700;
        font-size: 24px;
        margin-bottom: 30px;
    }

    .restart-button {
        background: #ff4444;
        color: white;
        border: none;
        padding: 15px 30px;
        font-size: 20px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .restart-button:hover {
        background: #ff6666;
        transform: scale(1.05);
    }
</style>

<main class="canvas-container">
    {#if !$account}
        <TitleScreen on:start={handleStart} />
    {:else if $state}
            <Canvas>
                <Scene/>
            </Canvas>

            <!-- Stats Display -->
            <div class="stats-container">
                <div class="stat-item">
                    <span class="stat-label">Gold:</span>
                    <span class="stat-value">{formatNumber($state.gold ?? 0)}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Tick:</span>
                    <span class="stat-value tick-value">{$tick}</span>
                </div>
            </div>

            <!-- Game Over Popup - Modified to ensure it's showing -->
            {#if $finished}
                <div class="game-over-overlay">
                    <div class="game-over-popup">
                        <h1 class="game-over-title">Game Over!</h1>
                        <div class="game-over-score">
                            <p>Final Score: {formatNumber($state.gold ?? 0)}</p>
                            <p>Survived until tick: {$tick}</p>
                        </div>
                        <button class="restart-button" on:click={handleRestartClick}>
                            Play Again
                        </button>
                    </div>
                </div>
            {/if}

            <!-- For debugging - remove this later -->
            <div style="position: absolute; bottom: 10px; left: 10px; color: white;">
                Debug - Finished: {$state.finished ? 'true' : 'false'}
            </div>

            <!-- Right Button Container -->
            {#if $account}
                <div class="button-container right-button-container">
                    <button class="overlay-button" on:click={handlePauseClick}>
                        {#if $paused}
                            Resume
                        {/if}
                        {#if !$paused}
                            Pause
                        {/if}
                    </button>
                    <button class="overlay-button" on:click={handlePlaceTurretClick}>
                        {#if $isPlacingTurret}
                            Cancel
                        {/if}
                        Place Tower
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
