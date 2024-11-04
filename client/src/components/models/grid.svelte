<script lang="ts">
    import { T, extend, useThrelte } from "@threlte/core";
    import * as THREE from 'three';
    import { isPlacingTurret, turretPosition, tunnelTexture } from "../../stores";
    import Turret from "./turret.svelte";
    import { interactivity } from "@threlte/extras";

    let platforms_Z = [0, 2, 4, 6, 8];
    let platforms_X = [2, 4, 6, 8, 10, 12, 14, 16, 18];
    let platforms = platforms_Z.map(z => {
        return platforms_X.map(x => {
            let res: [number, number, number] = [x, 0.1, z];
            return res;
        });
    }).flat();

    interactivity();

    function onEnter(e: CustomEvent, platform: [number, number, number], index: number) {
        if ($isPlacingTurret) {
            turretPosition.set(platform);
            hoveredPlatformIndex = index;
        }
    }

    function onLeave(e: CustomEvent, platform: [number, number, number], index: number) {
        if ($isPlacingTurret) {
            hoveredPlatformIndex = -1;
        }
    }

    let hoveredPlatformIndex = -1;
</script>


<T.Mesh
    position={[10, -0.15, 10]}
    rotation={[-Math.PI / 2, 0, 0]}
    raycast={false}
    receiveShadow
>
    <T.PlaneGeometry args={[40, 40]} />
    <T.MeshStandardMaterial map={$tunnelTexture} side={THREE.DoubleSide} />
</T.Mesh>


{#each platforms as platform, i}
    <T.Group raycast={true}>
        <T.Mesh
            position={platform}
            on:pointerenter={(e) => onEnter(e, platform, i)}
            on:pointerleave={(e) => onLeave(e, platform, i)}
            interactive
        >
            <T.BoxGeometry args={[0.9, 0.05, 0.9]} />
            <T.MeshStandardMaterial
                color={hoveredPlatformIndex === i ? "blue" : "red"}
                side={THREE.DoubleSide}
            />
        </T.Mesh>
        {#if hoveredPlatformIndex === i}
            <T.Mesh position={[platform[0], platform[1] + 0.15, platform[2]]}>
                <T.BoxGeometry args={[0.75, 0.25, 0.75]} />
                <T.MeshStandardMaterial color="grey" />
            </T.Mesh>
        {/if}
    </T.Group>
{/each}
