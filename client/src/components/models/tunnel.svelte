<script lang="ts">
    import {T, extend, useThrelte} from "@threlte/core";
    import * as THREE from 'three';


</script>

<T.Mesh>
    <T.Mesh rotation={[0, 0, Math.PI/2]} >
        <T.CylinderGeometry  position={[0, -5, 0]} args={[5, 5, 20]}/>
        <T.MeshStandardMaterial color={"blue"} side = {THREE.BackSide}/>
    </T.Mesh>
    <T.Mesh position={[-9.99, 0, 0]} rotation={[0, Math.PI/2, 0]}>
        <T.CircleGeometry args={[5, 32]}/>
        <T.MeshStandardMaterial color={0xff0000} side = {THREE.DoubleSide}/>
    </T.Mesh>
    <T.Mesh position={[0, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
        <T.PlaneGeometry position={[0, -2, 0]} args={[30, 10]} />
        <T.MeshStandardMaterial color={"grey"} side = {THREE.DoubleSide}/>
    </T.Mesh>
</T.Mesh>

