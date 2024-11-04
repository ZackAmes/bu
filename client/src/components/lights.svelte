<script lang="ts">
    import {T} from "@threlte/core";
    import * as THREE from 'three';
</script>

<T.RectAreaLight rotation={[Math.PI/2, Math.PI/2, 0]} position={[20, 0, 4]} intensity={3}/>
<T.RectAreaLight rotation={[Math.PI/2, -Math.PI/2, 0]} color={0x5500ff} position={[0, 0, 4]} intensity={2}/>