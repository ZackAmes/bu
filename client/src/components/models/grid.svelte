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

{#each platforms as platform}
<T.Mesh position={platform}>
    <T.BoxGeometry args={[.9, .05, .9]} />
    <T.MeshStandardMaterial color={"red"} side = {THREE.DoubleSide}/>
</T.Mesh>
{/each}