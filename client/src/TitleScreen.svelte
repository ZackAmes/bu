<script lang="ts">
    import { state, dojoStore, tick, account } from './stores';
    import { connect } from './controller';
    import { onMount } from 'svelte';

    async function handleConnect() {
        await connect();
        let new_state = await $dojoStore.client?.iterate($account!.account!, $tick);
        console.log(new_state)
        state.set(new_state)
    }

    // Animation for floating ghosts
    let ghostElements: HTMLElement[] = [];
    
    onMount(() => {
        ghostElements = Array.from(document.querySelectorAll('.ghost'));
        ghostElements.forEach(ghost => {
            animateGhost(ghost);
        });
    });

    function animateGhost(ghost: HTMLElement) {
        const speed = 2 + Math.random() * 4;
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 100;
        
        ghost.style.left = `${startX}px`;
        ghost.style.top = `${startY}px`;
        
        let position = startY;
        
        function float() {
            position -= speed;
            ghost.style.top = `${position}px`;
            
            if (position < -100) {
                position = window.innerHeight + 100;
                ghost.style.left = `${Math.random() * window.innerWidth}px`;
            }
            
            requestAnimationFrame(float);
        }
        
        float();
    }
</script>

<style>
    .title-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: linear-gradient(
            to bottom,
            #000000,
            #1a0f2e,
            #2a1b3d
        );
        position: relative;
        overflow: hidden;
    }

    .fog {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url('/fog-texture.png') repeat;
        opacity: 0.3;
        animation: fog-animation 30s linear infinite;
        pointer-events: none;
    }

    @keyframes fog-animation {
        0% { background-position: 0 0; }
        100% { background-position: 100% 100%; }
    }

    .ghost {
        position: absolute;
        width: 50px;
        height: 50px;
        background: radial-gradient(circle at 50% 40%, 
            rgba(255, 255, 255, 0.8),
            rgba(255, 255, 255, 0.2) 60%,
            transparent 70%);
        border-radius: 50% 50% 0 0;
        pointer-events: none;
        filter: blur(2px);
    }

    .title {
        font-size: 72px;
        color: #ffffff;
        margin-bottom: 40px;
        text-shadow: 
            0 0 10px rgba(255, 255, 255, 0.5),
            0 0 20px rgba(255, 255, 255, 0.3),
            0 0 30px rgba(255, 255, 255, 0.2);
        font-family: 'Creepster', cursive;
        animation: glow 2s ease-in-out infinite alternate;
        z-index: 1;
    }

    @keyframes glow {
        from {
            text-shadow: 
                0 0 10px rgba(255, 255, 255, 0.5),
                0 0 20px rgba(255, 255, 255, 0.3),
                0 0 30px rgba(255, 255, 255, 0.2);
        }
        to {
            text-shadow: 
                0 0 20px rgba(255, 255, 255, 0.6),
                0 0 30px rgba(255, 255, 255, 0.4),
                0 0 40px rgba(255, 255, 255, 0.3);
        }
    }

    .start-button {
        padding: 20px 40px;
        font-size: 24px;
        background: rgba(40, 167, 69, 0.8);
        color: #ffffff;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        z-index: 1;
        font-family: 'Arial', sans-serif;
        text-transform: uppercase;
        letter-spacing: 2px;
        box-shadow: 
            0 0 10px rgba(40, 167, 69, 0.3),
            0 0 20px rgba(40, 167, 69, 0.2);
    }

    .start-button:hover {
        background: rgba(40, 167, 69, 1);
        transform: scale(1.05);
        box-shadow: 
            0 0 20px rgba(40, 167, 69, 0.5),
            0 0 40px rgba(40, 167, 69, 0.3);
    }

    .start-button:active {
        transform: scale(0.95);
    }

    /* Add this to your HTML head */
    @import url('https://fonts.googleapis.com/css2?family=Creepster&display=swap');
</style>

<div class="title-screen">
    <div class="fog"></div>
    <!-- Add multiple ghost elements -->
    {#each Array(10) as _}
        <div class="ghost"></div>
    {/each}
    <h1 class="title">Bu</h1>
    <button class="start-button" on:click={handleConnect}>
        Connect
    </button>
</div>

<!-- Add to your HTML head -->
<svelte:head>
    <link href="https://fonts.googleapis.com/css2?family=Creepster&display=swap" rel="stylesheet">
</svelte:head> 