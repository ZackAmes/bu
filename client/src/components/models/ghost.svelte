<script lang="ts">
    import { T } from "@threlte/core";

    export let position: [number, number, number];
</script>

<T.Mesh position={position} scale={0.1} transparent>
    <T.SphereGeometry />
    <T.MeshStandardMaterial color={"white"} opacity={0.1}/>
</T.Mesh>