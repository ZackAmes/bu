<script lang="ts">
    import {T, extend, useThrelte} from "@threlte/core";
    import * as THREE from 'three';

    let platforms_Z = [0, 2, 4, 6, 8]
    let platforms_X = [2, 4, 6, 8, 10, 12, 14, 16, 18]
    let platforms = platforms_Z.map(z => {
        return platforms_X.map(x => {
            let res: [number, number, number] = [x, .1, z]
            return res
        })
    }).flat()


</script>

<T.Mesh position={[10, 0, 4]}>
    <T.Mesh rotation={[0, 0, Math.PI/2]}>
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

{#each platforms as platform}
<T.Mesh position={platform}>
    <T.BoxGeometry args={[.9, .05, .9]} />
    <T.MeshStandardMaterial color={"red"} side = {THREE.DoubleSide}/>
</T.Mesh>
{/each}