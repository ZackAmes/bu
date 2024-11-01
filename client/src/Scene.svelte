<script lang="ts">
    import type { ComponentStore } from "./componentValueStore";
    import { Canvas, T, useTask } from "@threlte/core";
    import Tunnel from "./components/models/tunnel.svelte";
    import { OrbitControls } from "@threlte/extras";
    import Ghost from "./components/models/ghost.svelte";
    import Turret from "./components/models/turret.svelte";
    import { ghostPositions, turretPositions } from "./stores";
    import { AmbientLight } from "three";
    import Lights from "./components/lights.svelte";
    import Ghosts from "./components/ghosts.svelte";
    import Turrets from "./components/turrets.svelte";

    export let session: ComponentStore;

    useTask((delta) => {
        ghostPositions.update(positions => {
            return positions.map((pos) => {
                return [pos[0] + .1 * delta, pos[1], pos[2]]
            })
        })
    })

    $: console.log($session)
    $: console.log($session.ghosts)

    $: ghosts = $session.ghosts.value
    $: turrets = $session.turrets.value


</script>

<T.PerspectiveCamera rotation={[0, 0, Math.PI/2]} makeDefault position={[6, 3, 4]} on:create={(ref) => {
    ref.ref.lookAt(0,0,0)
}}>
    <OrbitControls />
</T.PerspectiveCamera>
<T.AmbientLight intensity={0.5}/>
<Lights />
<Tunnel />
<Ghosts {ghosts}/>
<Turrets {turrets}/>




<style>
    body {
        background-color: black;
    }
    canvas {
        width: 100vw;
        height: 100vh;
    }
</style>