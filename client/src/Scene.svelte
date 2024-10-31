<script lang="ts">
    import type { ComponentStore } from "./componentValueStore";
    import { Canvas, T, useTask } from "@threlte/core";
    import Tunnel from "./components/tunnel.svelte";
    import { OrbitControls } from "@threlte/extras";
    import Ghost from "./components/ghost.svelte";
    import Turret from "./components/turret.svelte";
    import { ghostPositions, turretPositions } from "./stores";
  import { AmbientLight } from "three";
  import Lights from "./components/lights.svelte";

    ghostPositions.set([[0, .1, 0]])
    turretPositions.set([[1, .1, 1]])


    export let session: ComponentStore;

    useTask((delta) => {
        ghostPositions.update(positions => {
            return positions.map((pos) => {
                return [pos[0] + .1 * delta, pos[1], pos[2]]
            })
        })

        $turretPositions.map( (tur_pos) => {
            $ghostPositions.map((ghost_pos) => {
                return [ghost_pos[0] + .1 * delta, ghost_pos[1], ghost_pos[2]]
            })
        })
    })

</script>

<T.PerspectiveCamera rotation={[0, 0, Math.PI/2]} makeDefault position={[6, 3, 4]} on:create={(ref) => {
    ref.ref.lookAt(0,0,0)
}}>
    <OrbitControls />
</T.PerspectiveCamera>
<T.AmbientLight intensity={0.5}/>
<Lights />
<Tunnel />
{#each $ghostPositions as position}
    <Ghost position={position}/>
{/each}
{#each $turretPositions as position}
    <Turret position={position}/>
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