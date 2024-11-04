<script lang="ts">
    import {T, extend, useThrelte} from "@threlte/core";
    import * as THREE from 'three';
    import { isPlacingTurret, turretPosition } from "../../stores";
    import Turret from "./turret.svelte";

    let platforms_Z = [0, 2, 4, 6, 8]
    let platforms_X = [2, 4, 6, 8, 10, 12, 14, 16, 18]
    let platforms = platforms_Z.map(z => {
        return platforms_X.map(x => {
            let res: [number, number, number] = [x, .1, z]
            return res
        })
    }).flat()

    function onEnter(e: MouseEvent, position: [number, number, number]) {
        console.log(position)
        if ($isPlacingTurret) {
            turretPosition.set(position);
        }
    }

    function onLeave(e: MouseEvent) {
        if ($isPlacingTurret) {
            turretPosition.set([100, 0, 0]);
        }
    }

    function onClic(e: MouseEvent) {
        console.log("over")
    }

    function handleClick(e: MouseEvent) {
        console.log(e)
    }


</script>

{#each platforms as platform}
<T.Mesh position={platform} on:mouseover={(e) => onEnter(e, platform)} on:mouseout={(e) => onLeave(e)}>
    <T.BoxGeometry args={[.9, .05, .9]} />
    <T.MeshStandardMaterial color={"red"} side = {THREE.DoubleSide}/>
</T.Mesh>
{/each}
