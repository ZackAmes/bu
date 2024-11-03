<script lang="ts">
    import type { ComponentStore } from "./componentValueStore";
    import { Canvas, T, useTask } from "@threlte/core";
    import Tunnel from "./components/models/tunnel.svelte";
    import { OrbitControls } from "@threlte/extras";
    import Ghost from "./components/models/ghost.svelte";
    import Turret from "./components/models/turret.svelte";
    import { ghostsRender, turretsRender } from "./stores";
    import { AmbientLight } from "three";
    import Lights from "./components/lights.svelte";
    import Ghosts from "./components/ghosts.svelte";
    import Turrets from "./components/turrets.svelte";
    import Grid from "./components/models/grid.svelte";
    import type { Ghost as GhostType } from "./dojo/typescript/models.gen";
    import type { Turret as TurretType } from "./dojo/typescript/models.gen";
    import { useThrelte } from "@threlte/core";

    export let session: ComponentStore;
    let ghosts: GhostType[] = [];
    let turrets: TurretType[] = [];

    const { invalidate } = useThrelte()

    
    useTask((delta) => {
        ghostsRender.update(ghosts => {
            let newGhosts = ghosts.map(ghost => {
                // @ts-ignore
                ghost.pos = ghost.pos + .1 * delta
                return ghost
            })
            return newGhosts
        })

    }) 

    $: ghosts = $ghostsRender
    $: turrets = $turretsRender

</script>

<T.PerspectiveCamera rotation={[0, 0, Math.PI/2]} makeDefault position={[6, 3, 4]} on:create={(ref) => {
    ref.ref.lookAt(0,0,0)
}}>
    <OrbitControls />
</T.PerspectiveCamera>
<T.AmbientLight intensity={0.5}/>
<Lights />
<T.Group position={[10,0,4]}>
    <Tunnel />
    <Ghosts ghosts={ghosts}/>
    <Turrets turrets={turrets}/>
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