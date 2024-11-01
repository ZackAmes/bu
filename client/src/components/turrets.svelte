<script lang="ts">
    import { T } from "@threlte/core";
    import Turret from "./models/turret.svelte";
    import type { Turret as TurretType } from "../dojo/typescript/models.gen";
    import { Mesh } from "three";

    export let turrets: {turret: TurretType, ref: Mesh}[];

    /*
    let positions = turrets.map(turret => {
        let res: [number, number, number] = [parseInt(turret.column.toString()), .1, parseInt(turret.row.toString())]
        return res
    })
    */

</script>

{#each turrets as turret}
    <Turret turret={turret.turret} ref={turret.ref}/>
{/each}