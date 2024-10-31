<script lang="ts">
    import { T } from "@threlte/core";

    export let position: [number, number, number];
</script>

<T.Mesh position={position} scale={0.1}>
    <T.SphereGeometry />
    <T.MeshBasicMaterial color={"white"}/>
</T.Mesh>