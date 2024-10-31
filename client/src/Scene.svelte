<script lang="ts">
    import type { ComponentStore } from "./componentValueStore";
    import { Canvas, T } from "@threlte/core";
    import Tunnel from "./components/tunnel.svelte";
    import { OrbitControls } from "@threlte/extras";
    import Ghost from "./components/ghost.svelte";


    export let position: ComponentStore;
    export let moves: ComponentStore;
</script>

<Canvas>

    <T.PerspectiveCamera rotation={[0, 0, Math.PI/2]} makeDefault position={[6, 3, 4]} on:create={(ref) => {
        ref.ref.lookAt(0,0,0)
    }}>
        <OrbitControls />
    </T.PerspectiveCamera>
    <Tunnel />
    <Ghost position={[0, .1, 0]}/>
</Canvas>

<style>
    body {
        background-color: black;
    }
    canvas {
        width: 100vw;
        height: 100vh;
    }
</style>