<script lang="ts">
    import { T } from "@threlte/core";
    import * as THREE from "three";
    import { onMount } from "svelte";
    import type { Turret as TurretType } from "../../dojo/typescript/models.gen";

    export let pos: number;
    export let lane: number;

    // Calculate base position
    $: position = [-10 + (pos * 2), 0.25, lane * 2];

    // Animation parameters
    let barrelRotation = 0;
    let gunElevation = 0;

    // Animate the turret
    onMount(() => {
        let animationFrame: number;
        const animate = () => {
            // Subtle barrel rotation
            barrelRotation += 0.01;
            // Gun elevation movement
            gunElevation = Math.sin(Date.now() * 0.002) * 0.1;
            animationFrame = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animationFrame);
    });

    // Materials
    const metalMaterial = new THREE.MeshStandardMaterial({
        color: 0x444444,
        metalness: 0.8,
        roughness: 0.2,
    });

    const accentMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        emissive: 0x00ff00,
        emissiveIntensity: 0.5,
        metalness: 0.5,
        roughness: 0.5,
    });

    console.log(position)
</script>

<T.Group position={position} scale={0.25}>
    <!-- Base -->
    <T.Mesh position={[0, 0.2, 0]}>
        <T.CylinderGeometry args={[1.2, 1.5, 0.4]} />
        <T.MeshPhongMaterial {...metalMaterial} />
    </T.Mesh>

    <!-- Middle section with glow -->
    <T.Mesh position={[0, 0.5, 0]}>
        <T.CylinderGeometry args={[1, 1, 0.2]} />
        <T.MeshPhongMaterial {...accentMaterial} />
    </T.Mesh>

    <!-- Gun barrel -->
    <T.Mesh position={[0, 1, 0]}>
        <T.CylinderGeometry args={[0.2, 1, 0.1]} />
        <T.MeshPhongMaterial {...metalMaterial} />
    </T.Mesh>
</T.Group>