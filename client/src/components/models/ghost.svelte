<script lang="ts">
    import { T } from "@threlte/core";
    import * as THREE from "three";
    import { onMount } from "svelte";

    export let pos: number;
    export let lane: number;

    // Calculate base position
    $: position = [-10 + (pos * 2), 0.25, lane * 2];

    // Floating animation parameters
    let floatOffset = 0;
    let glowIntensity = 1;
    let tailWave = 0;
    
    // Animation loop for floating effect
    onMount(() => {
        let animationFrame: number;
        const animate = () => {
            floatOffset = Math.sin(Date.now() * 0.002) * 0.1; // Subtle floating
            glowIntensity = 0.7 + Math.sin(Date.now() * 0.004) * 0.3; // Pulsing glow
            tailWave = Math.sin(Date.now() * 0.003) * 0.2; // Wavy tail
            animationFrame = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animationFrame);
    });

    // Custom ghost material with glow effect
    const ghostMaterial = new THREE.MeshStandardMaterial({
        transparent: true,
        opacity: 0.6,
        metalness: 0.1,
        roughness: 0.5,
        emissive: new THREE.Color(0x330000),
        emissiveIntensity: 0.2,
        side: THREE.DoubleSide
    });
</script>

<T.Group position={[position[0], position[1] + floatOffset, position[2]]} scale={0.1}>
    <!-- Main ghost body -->
    <T.Group>
        <!-- Upper body (head) -->
        <T.Mesh>
            <T.SphereGeometry args={[1, 32, 32]} />
            <T.MeshStandardMaterial
                {...ghostMaterial}
                color={0xaaaaaa}
            />
        </T.Mesh>

        <!-- Lower body (tail) - now with multiple segments for better flow -->
        {#each Array(4) as _, i}
            <T.Mesh 
                position={[0, -0.5 - (i * 0.3), 0]} 
                rotation={[0, 0, tailWave * (i + 1) * 0.1]}
            >
                <T.ConeGeometry args={[1 - (i * 0.15), 0.4, 32]} />
                <T.MeshStandardMaterial
                    {...ghostMaterial}
                    opacity={0.6 - (i * 0.1)}
                />
            </T.Mesh>
        {/each}

        <!-- Eyes -->
        <T.Group>
            <!-- Left eye -->
            <T.Mesh position={[0.75, 0.35, 0.45]} scale={0.2}>
                <T.SphereGeometry />
                <T.MeshStandardMaterial
                    color="black"
                    emissive="red"
                    emissiveIntensity={glowIntensity}
                />
            </T.Mesh>
            <T.PointLight
                position={[0.75, 0.35, 0.45]}
                color="red"
                intensity={glowIntensity * 0.5}
                distance={2}
            />

            <!-- Right eye -->
            <T.Mesh position={[0.75, 0.35, -0.45]} scale={0.2}>
                <T.SphereGeometry />
                <T.MeshStandardMaterial
                    color="black"
                    emissive="red"
                    emissiveIntensity={glowIntensity}
                />
            </T.Mesh>
            <T.PointLight
                position={[0.75, 0.35, -0.45]}
                color="red"
                intensity={glowIntensity * 0.5}
                distance={2}
            />
        </T.Group>

        <!-- Mouth -->
        <T.Mesh position={[0.8, 0, 0]} rotation={[0, -0.5, 0]}>
            <T.TorusGeometry args={[0.2, 0.05, 16, 32, Math.PI]} />
            <T.MeshStandardMaterial color="black" />
        </T.Mesh>
    </T.Group>

    <!-- Ambient glow effect -->
    <T.PointLight
        position={[0, 0, 0]}
        color="red"
        intensity={glowIntensity * 0.3}
        distance={5}
    />

    <!-- Trail effect -->
    {#each Array(3) as _, i}
        <T.Mesh position={[-i * 0.5, -i * 0.2, 0]} scale={1 - i * 0.2}>
            <T.SphereGeometry args={[0.1, 32, 32]} />
            <T.MeshStandardMaterial
                {...ghostMaterial}
                opacity={0.2}
            />
        </T.Mesh>
    {/each}
</T.Group>


