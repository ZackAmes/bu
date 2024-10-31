<script lang="ts">
    import * as THREE from 'three/webgpu';
    import {T, extend, useThrelte} from "@threlte/core";
    import { texture, uv, MeshStandardNodeMaterial } from 'three/tsl';

    let {renderer} = useThrelte();
    console.log(renderer)
    let material = new MeshStandardNodeMaterial({color: 0xff0000});

</script>

<T.Mesh>
    <T.Mesh rotation={[0, 0, Math.PI/2]}>
        <T.CylinderGeometry  position={[0, -5, 0]} args={[5, 5, 20]}/>
        <T.MeshBasicMaterial color={0x00ff00} side = {THREE.DoubleSide}/>
    </T.Mesh>

    <T.Mesh position={[-5, 0, 0]} rotation={[0, Math.PI/2, 0]}>
        <T.CircleGeometry position={[0, -5, 0]} args={[5, 32]}/>
        <T.MeshBasicMaterial color={0xff0000} side = {THREE.DoubleSide}/>
    </T.Mesh>
    <T.Mesh position={[0, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
        <T.PlaneGeometry position={[0, -2, 0]} args={[10, 10]} />
        <T.MeshBasicMaterial color={0x0000ff} side = {THREE.DoubleSide}/>
    </T.Mesh>
</T.Mesh>