<script lang="ts">
    import { T, extend, useThrelte } from "@threlte/core";
    import * as THREE from 'three';
    import { isPlacingTurret, turretPosition } from "../../stores";
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

    let hoveredPlatformIndex = -1;
</script>

{#each platforms as platform, i}
    <T.Group raycast={true}>
        <T.Mesh
            position={platform}
            on:pointerenter={(e) => console.log("Hover enter detected", platform)}
            on:pointerleave={(e) => console.log("Hover leave detected", platform)}
            interactive
        >
            <T.BoxGeometry args={[0.9, 0.05, 0.9]} />
            <T.MeshStandardMaterial
                color={hoveredPlatformIndex === i ? "blue" : "red"}
                side={THREE.DoubleSide}
            />
        </T.Mesh>
    </T.Group>
{/each}
