<script lang="ts">
    import type { ComponentStore } from "./componentValueStore";
    import { Canvas, T, useTask } from "@threlte/core";
    import Tunnel from "./components/tunnel.svelte";
    import { OrbitControls } from "@threlte/extras";
    import Ghost from "./components/ghost.svelte";
    import Turret from "./components/turret.svelte";
    import { ghostPositions } from "./stores";

    ghostPositions.set([[0, .1, 0]])




    export let position: ComponentStore;
    export let moves: ComponentStore;

    useTask((delta) => {
        ghostPositions.update(positions => {
            return positions.map((pos) => {
                return [pos[0] + .1 * delta, pos[1], pos[2]]
            })
        })
    })

</script>

<T.PerspectiveCamera rotation={[0, 0, Math.PI/2]} makeDefault position={[6, 3, 4]} on:create={(ref) => {
    ref.ref.lookAt(0,0,0)
}}>
    <OrbitControls />
</T.PerspectiveCamera>
<Tunnel />
{#each $ghostPositions as position}
    <Ghost position={position}/>
{/each}


<style>
    body {
        background-color: black;
    }
    canvas {
        width: 100vw;
        height: 100vh;
    }
</style>