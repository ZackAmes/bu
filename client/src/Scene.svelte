<script lang="ts">
    import type { ComponentStore } from "./componentValueStore";
    import { Canvas, T, useTask } from "@threlte/core";
    import Tunnel from "./components/models/tunnel.svelte";
    import Ghost from "./components/models/ghost.svelte";
    import Turret from "./components/models/turret.svelte";
    import { AmbientLight } from "three";
    import Lights from "./components/lights.svelte";
    import Ghosts from "./components/ghosts.svelte";
    import Turrets from "./components/turrets.svelte";
    import Grid from "./components/models/grid.svelte";
    import type { Ghost as GhostType } from "./dojo/typescript/models.gen";
    import type { Turret as TurretType } from "./dojo/typescript/models.gen";
    import { state, timer, tick, paused } from "./stores";
    import { handleTickClick } from "./handlers";
    import { useThrelte } from "@threlte/core";
    import { get } from "svelte/store";

    let ghosts: any[];
    let turrets: any[];
    useTask((delta) => {
        if ($state && !$paused){
            $timer = $timer + delta
            if ($timer > 3){
                console.log("tick")
                $timer = 0
                handleTickClick()
            }
        }
    }) 

    $: if ($state) {
        ghosts = $state.attackers
        turrets = $state.defenders
    }
</script>

<T.PerspectiveCamera
    makeDefault
    position={[22, 4, 4]}
    fov={75}
    near={0.1}
    far={1000}
    on:create={(ref) => {
        ref.ref.lookAt(10,0,4)
    }}
/>

<Lights />
<T.Group position={[10,0,4]}>
    <Tunnel />
    <Ghosts {ghosts} />
    <Turrets {turrets} />
</T.Group>

<Grid/>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: black;
    }
    :global(canvas) {
        width: 100vw;
        height: 100vh;
    }
</style>