<script lang="ts">
    import {T} from "@threlte/core";
    import * as THREE from 'three';
</script>

<T.RectAreaLight rotation={[Math.PI/2, Math.PI/2, 0]} position={[20, 0, 4]} intensity={10}/>
<T.RectAreaLight rotation={[Math.PI/2, -Math.PI/2, 0]} color={"red"} position={[0, 0, 4]} intensity={4}/>