<script lang="ts">
    import { T } from "@threlte/core";
    import type { Ghost as GhostType } from "../../dojo/typescript/models.gen";
    import { Mesh } from "three";

    export let ghost: GhostType;

    let position: [number, number, number]

    // @ts-ignore
    $: position = [(4 - ghost.position) * 2, .25, (ghost.lane - 3) * 2]
</script>

<T.Mesh position={position} scale={0.1} transparent>
    <T.SphereGeometry />
    <T.MeshStandardMaterial color={"white"} opacity={0.1}/>
</T.Mesh>