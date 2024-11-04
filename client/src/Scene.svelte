<script lang="ts">
    import type { ComponentStore } from "./componentValueStore";
    import { Canvas, T, useTask } from "@threlte/core";
    import Tunnel from "./components/models/tunnel.svelte";
    import { OrbitControls } from "@threlte/extras";
    import Ghost from "./components/models/ghost.svelte";
    import Turret from "./components/models/turret.svelte";
    import { AmbientLight } from "three";
    import Lights from "./components/lights.svelte";
    import Ghosts from "./components/ghosts.svelte";
    import Turrets from "./components/turrets.svelte";
    import Grid from "./components/models/grid.svelte";
    import type { Ghost as GhostType } from "./dojo/typescript/models.gen";
    import type { Turret as TurretType } from "./dojo/typescript/models.gen";
    import { state } from "./stores";

    let ghosts: any[];
    let turrets: any[];
    useTask((delta) => {
        if ($state){
            
        }

    }) 

    $: if ($state) {
        ghosts = $state.attackers
        turrets = $state.defenders
    }

</script>

<T.PerspectiveCamera rotation={[0, 0, Math.PI/2]} makeDefault position={[6, 3, 4]} on:create={(ref) => {
    ref.ref.lookAt(0,0,0)
}}>
    <OrbitControls />
</T.PerspectiveCamera>
<T.AmbientLight intensity={0.5}/>
<Lights />
<T.Group position={[10,0,4]} on:mouseover={(e) => console.log(e)}>
    <Tunnel />
    <Ghosts {ghosts} />
</T.Group>
<Grid/>

<style>
    body {
        background-color: black;
    }
    canvas {
        width: 100vw;
        height: 100vh;
    }
</style>