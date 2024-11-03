<script lang="ts">
    import { T } from "@threlte/core";
    import { Mesh } from "three";
    import type { Turret as TurretType } from "../../dojo/typescript/models.gen";

    export let turret: TurretType = {id: 0, typ: 0, health: 0, attack: 0, lane: 0, pos: 0, rate: 0, range: 0, target: 0n};

    console.log(turret)
    export let position: [number, number, number] = [100,0,0]

    export let handleClick: () => void = () => {};

    // @ts-ignore
    $: position = position ?? [(-4) * 2, .25, (turret.lane -3) * 2]
    $: console.log(position)
</script>

<T.Mesh position={position} scale={0.25} on:click={handleClick}>
    <T.BoxGeometry/>
    <T.MeshBasicMaterial color={"grey"}/>
</T.Mesh>