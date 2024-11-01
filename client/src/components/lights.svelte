<script lang="ts">
    import {T} from "@threlte/core";
    import * as THREE from 'three';
</script>

<T.RectAreaLight rotation={[Math.PI/2, Math.PI/2, 0]} position={[10, 0, 0]} intensity={10}/>
<T.RectAreaLight rotation={[Math.PI/2, Math.PI/2, 0]} color={"red"} position={[-9.999, 0, 0]} intensity={4} side={THREE.DoubleSide}/>