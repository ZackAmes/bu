<script lang="ts">
    import { T } from "@threlte/core";
    import { onMount } from "svelte";
    import { Vector3 } from "three";
    import * as THREE from "three";

    export let start_pos: [number, number, number];
    export let end_pos: [number, number, number];

    let position = [0, 0, 0];
    let rotation = [0, 0, 0];
    let scale = [1, 1, 1];

    onMount(() => {
        const start = new Vector3(...start_pos);
        const end = new Vector3(...end_pos);

        // Calculate midpoint
        const midpoint = new Vector3().addVectors(start, end).multiplyScalar(0.5);
        position = [midpoint.x, midpoint.y, midpoint.z];

        // Calculate direction
        const direction = new Vector3().subVectors(end, start);
        const length = direction.length();

        // Scale the cylinder to match the distance between start and end
        scale = [1, length / 2, 1]; // Assuming the default cylinder height is 2

        // Calculate rotation to align the cylinder with the direction
        // Default cylinder in Three.js is aligned along Y-axis
        const axis = new Vector3(0, 1, 0);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, direction.clone().normalize());
        const euler = new THREE.Euler().setFromQuaternion(quaternion);
        rotation = [euler.x, euler.y, euler.z];
    });
</script>

<T.Mesh position={position} rotation={rotation} scale={scale}>
    <T.CylinderGeometry args={[0.05, 0.05, 2, 32]} />
    <T.MeshStandardMaterial color={"red"} />
</T.Mesh> 