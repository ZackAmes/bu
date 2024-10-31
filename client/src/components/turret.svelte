<script lang="ts">
    import { T } from "@threlte/core";

    export let position: [number, number, number];
</script>

<T.Mesh position={position} scale={0.1}>
    <T.BoxGeometry/>
    <T.MeshBasicMaterial color={"grey"}/>
</T.Mesh>