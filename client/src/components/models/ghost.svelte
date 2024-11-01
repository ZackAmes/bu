<script lang="ts">
    import { T } from "@threlte/core";
    import type { Ghost as GhostType } from "../../dojo/typescript/models.gen";

    export let ghost: GhostType;

    console.log(ghost)
    // @ts-ignore
    let position: [number, number, number] = [ghost.position.value * 2, 0, ghost.lane.value * 2]
</script>

<T.Mesh position={position} scale={0.1} transparent>
    <T.SphereGeometry />
    <T.MeshStandardMaterial color={"white"} opacity={0.1}/>
</T.Mesh>