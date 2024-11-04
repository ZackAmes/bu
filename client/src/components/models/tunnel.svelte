<script lang="ts">
    import { T, extend, useThrelte, useTask } from "@threlte/core";
    import * as THREE from 'three';
    import { onMount } from 'svelte';
    import { tunnelTexture, portalTexture } from "../../stores";    
    
    
    
    
    // Load textures
    onMount(() => {
       
    });
    
    // Particle variables for the tunnel
    const particleCount = 1000;
    const particles = new Array(particleCount).fill(null).map(() => ({
        position: new THREE.Vector3(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            Math.random() * 50
        ),
        velocity: new THREE.Vector3(
            0,
            0,
            -Math.random() * 0.1
        )
    }));
    
    let particleGeometry: THREE.BufferGeometry;
    let particleMaterial: THREE.PointsMaterial;
    let particlePoints: THREE.Points;
    

        particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        particles.forEach((p, i) => {
            positions[i * 3] = p.position.x;
            positions[i * 3 + 1] = p.position.y;
            positions[i * 3 + 2] = p.position.z;
        });
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        particleMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.1,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        
        particlePoints = new THREE.Points(particleGeometry, particleMaterial);

    
    // Animate particles using useTask for consistency
    useTask(() => {
        const positions = particleGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
            const p = particles[i];
            p.position.add(p.velocity);
            if (p.position.z < -25) {
                p.position.z = 25;
            }
            positions[i * 3] = p.position.x;
            positions[i * 3 + 1] = p.position.y;
            positions[i * 3 + 2] = p.position.z;
        }
        particleGeometry.attributes.position.needsUpdate = true;
    });

    // Particle variables for the portal
    const portalParticleCount = 500;
    const portalParticles = new Array(portalParticleCount).fill(null).map(() => ({
        position: new THREE.Vector3(
            (Math.random() - 0.5) * 6, // Assuming portal radius is 6
            (Math.random() - 0.5) * 6,
            0
        ),
        velocity: new THREE.Vector3(
            0,
            0,
            (Math.random() - 0.5) * 0.02
        )
    }));
    
    let portalParticleGeometry: THREE.BufferGeometry;
    let portalParticleMaterial: THREE.PointsMaterial;
    let portalParticlePoints: THREE.Points;
    

        portalParticleGeometry = new THREE.BufferGeometry();
        const portalPositions = new Float32Array(portalParticleCount * 3);
        portalParticles.forEach((p, i) => {
            portalPositions[i * 3] = p.position.x;
            portalPositions[i * 3 + 1] = p.position.y;
            portalPositions[i * 3 + 2] = p.position.z;
        });
        portalParticleGeometry.setAttribute('position', new THREE.BufferAttribute(portalPositions, 3));
        
        portalParticleMaterial = new THREE.PointsMaterial({
            color: 0xff00ff,
            size: 0.2,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        
        portalParticlePoints = new THREE.Points(portalParticleGeometry, portalParticleMaterial);
        // Position the particle system at the portal's location
        portalParticlePoints.position.set(0, 0, -50);

    
    // Animate portal particles
    useTask(() => {
        const portalPositions = portalParticleGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < portalParticleCount; i++) {
            const p = portalParticles[i];
            p.position.add(p.velocity);
            if (p.position.z > 1) { // Assuming portal is at z=0
                p.position.z = 0;
            }
            portalPositions[i * 3] = p.position.x;
            portalPositions[i * 3 + 1] = p.position.y;
            portalPositions[i * 3 + 2] = p.position.z;
        }
        portalParticleGeometry.attributes.position.needsUpdate = true;
    });
</script>

<!-- Tunnel and Portal Meshes -->
<T.Mesh>
    <!-- Enhanced Tunnel Geometry -->
    <T.Mesh rotation={[0, 0, Math.PI / 2]}>
        <T.CylinderGeometry position={[0, -5, 0]} args={[5, 5, 100, 32, 1, true]} />
        <T.MeshStandardMaterial
            map={$tunnelTexture}
            side={THREE.BackSide}
            metalness={0.5}
            roughness={0.5}
        />
    </T.Mesh>
    
    <!-- Portal at the End of the Tunnel -->
    <T.Mesh position={[0, 0, -50]} rotation={[Math.PI / 2, 0, 0]}>
        <T.CircleGeometry args={[6, 64]} />
        <T.MeshBasicMaterial
            map={$portalTexture}
            transparent={true}
            opacity={0.8}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
        />
    </T.Mesh>
    <T is={portalParticlePoints}/>
    <T is={particlePoints}/>
</T.Mesh>

<style>
    /* Optional: Add any additional styling if necessary */
</style>

