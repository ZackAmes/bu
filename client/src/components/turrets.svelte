<script lang="ts">
    import { T } from "@threlte/core";
    import Turret from "./models/turret.svelte";
    import type { Turret as TurretType } from "../dojo/typescript/models.gen";

    export let turrets: TurretType[];

    /*
    let positions = turrets.map(turret => {
        let res: [number, number, number] = [parseInt(turret.column.toString()), .1, parseInt(turret.row.toString())]
        return res
    })
    */

    let positions: [number, number, number][] = [[5,.1,0]]
</script>

{#each positions as position}
    <Turret position={position}/>
{/each}