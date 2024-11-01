<script lang="ts">
    import { T } from "@threlte/core";
    import { Mesh } from "three";
    import type { Turret as TurretType } from "../../dojo/typescript/models.gen";

    export let turret: TurretType;
    export let ref: Mesh;

    console.log(turret)

    // @ts-ignore
    let position: [number, number, number] = [(-4) * 2, .25, (turret.lane -3) * 2]
</script>

<T.Mesh bind:ref={ref} position={position} scale={0.25}>
    <T.BoxGeometry/>
    <T.MeshBasicMaterial color={"grey"}/>
</T.Mesh>