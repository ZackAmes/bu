<script lang="ts">
    import { T } from "@threlte/core";
    import { Mesh } from "three";
    import type { Turret as TurretType } from "../../dojo/typescript/models.gen";

    export let turret: TurretType;

    let position: [number, number, number]

    // @ts-ignore
    $: position = [(-4) * 2, .25, (turret.lane -3) * 2]
    $: console.log(position)
</script>

<T.Mesh position={position} scale={0.25}>
    <T.BoxGeometry/>
    <T.MeshBasicMaterial color={"grey"}/>
</T.Mesh>