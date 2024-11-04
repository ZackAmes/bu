<script lang="ts">
    import { T, extend, useThrelte } from "@threlte/core";
    import * as THREE from 'three';
    import { isPlacingTurret, turretPosition, tunnelTexture, state, dojoStore, tick, account } from "../../stores";
    import Turret from "./turret.svelte";
    import { interactivity } from "@threlte/extras";

    let platforms_Z = [0, 2, 4, 6, 8];
    let platforms_X = [2, 4, 6, 8, 10, 12, 14, 16, 18];
    let platforms = platforms_Z.map(z => {
        return platforms_X.map(x => {
            let position: [number, number, number] = [x, 0.1, z];
            let lane = z / 2;
            let index = x / 2;
            let res = {position, lane, index};
            return res;
        });
    }).flat();

    interface platform {
        position: [number, number, number],
        lane: number,
        index: number
    }

    interactivity();

    let camera = useThrelte().camera;
    console.log(camera)

    let {client} = $dojoStore;


    let level = $state.level;

    if (parseInt(level) === 0) {
        platforms = platforms.filter(platform => platform.position[2] === 4);
        platforms = platforms.filter(platform => platform.position[0] >= 12);
    }
    else if (parseInt(level) === 1) {
        platforms = platforms.filter(platform => platform.position[2] === 4 || platform.position[2] === 6 || platform.position[2] === 2);
        platforms = platforms.filter(platform => platform.position[0] >= 12);
    }


    function onEnter(e: CustomEvent, platform: platform, index: number) {
        if ($isPlacingTurret) {
            turretPosition.set(platform.position);
            hoveredPlatformIndex = index;
        }
    }

    function onLeave(e: CustomEvent, platform: platform, index: number) {
        if ($isPlacingTurret) {
            hoveredPlatformIndex = -1;
        }
    }

    function handleClick(platform: platform, index: number) {
        if ($account && $isPlacingTurret) {
            client.add_turret($account.account, $tick, platform.lane, platform.index);
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
    <T.MeshStandardMaterial map={$tunnelTexture} side={THREE.DoubleSide} 
        metalness={0.65}
    />
</T.Mesh>


{#if $isPlacingTurret}
{#each platforms as platform, i}
    <T.Group raycast={true}>
        <T.Mesh
            position={platform.position}
            on:pointerenter={(e) => onEnter(e, platform, i)}
            on:pointerleave={(e) => onLeave(e, platform, i)}
            on:click={(e) => handleClick(platform, i)}
            interactive
        >
            <T.BoxGeometry args={[0.9, 0.05, 0.9]} />
            <T.MeshStandardMaterial
                color={hoveredPlatformIndex === i ? "blue" : "red"}
                side={THREE.DoubleSide}
            />
        </T.Mesh>
        {#if hoveredPlatformIndex === i}
            <T.Mesh position={[platform.position[0], platform.position[1] + 0.15, platform.position[2]]}>
                <T.BoxGeometry args={[0.75, 0.25, 0.75]} />
                <T.MeshStandardMaterial color="grey" />
            </T.Mesh>
        {/if}
    </T.Group>
{/each}
{/if}