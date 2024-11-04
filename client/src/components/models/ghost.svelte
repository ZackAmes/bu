<script lang="ts">
    import { T } from "@threlte/core";
    import type { Ghost as GhostType } from "../../dojo/typescript/models.gen";
    import { Mesh } from "three";

    //export let ghost: GhostType;

    export let pos: number 
    export let lane: number

    console.log(pos, lane)

    // @ts-ignore
    $: position = [ - 10 + (pos * 2), .25, lane * 2]

    $: console.log(position)


</script>

<T.Mesh position={position} scale={0.1} >
    <T.SphereGeometry />
    <T.MeshStandardMaterial transparent={true} metalness={0.1} roughness={0.5} color={"0xaaaaaa"} opacity={0.6} shininess={100} emissive={"red"} emissiveIntensity={10} />
</T.Mesh>
