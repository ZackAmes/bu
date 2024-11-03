<script lang="ts">
    import { T } from "@threlte/core";
    import type { Ghost as GhostType } from "../../dojo/typescript/models.gen";
    import { Mesh } from "three";

    export let ghost: GhostType;

    let position: [number, number, number]

    // @ts-ignore
    $: position = [(4 - ghost.pos) * 2, .25, (ghost.lane - 3) * 2]


</script>

<T.Mesh position={position} scale={0.1} >
    <T.SphereGeometry />
    <T.MeshStandardMaterial transparent={true} metalness={0.1} roughness={0.5} color={"0xaaaaaa"} opacity={0.6} shininess={100} emissive={"red"} emissiveIntensity={10} />
</T.Mesh>
