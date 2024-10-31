<script lang="ts">
    import type { ComponentStore } from "./componentValueStore";
    import { Canvas, T } from "@threlte/core";
    import Tunnel from "./components/tunnel.svelte";
    import { OrbitControls } from "@threlte/extras";


    export let position: ComponentStore;
    export let moves: ComponentStore;
</script>

<Canvas>

    <T.PerspectiveCamera makeDefault position={[0, 2, 5]} >
        <OrbitControls />
    </T.PerspectiveCamera>
    <Tunnel />
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