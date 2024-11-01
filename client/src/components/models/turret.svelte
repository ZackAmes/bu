<script lang="ts">
    import { T } from "@threlte/core";

    import type { Turret as TurretType } from "../../dojo/typescript/models.gen";

    export let turret: TurretType;

    console.log(turret)

    // @ts-ignore
    let position: [number, number, number] = [(turret.position-4) * 2, .25, (turret.lane -3) * 2]
</script>

<T.Mesh position={position} scale={0.25}>
    <T.BoxGeometry/>
    <T.MeshBasicMaterial color={"grey"}/>
</T.Mesh>