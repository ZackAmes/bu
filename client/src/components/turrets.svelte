<script lang="ts">
    import { T } from "@threlte/core";
    import Turret from "./models/turret.svelte";
    import type { Turret as TurretType } from "../dojo/typescript/models.gen";
    import { Mesh } from "three";
    import { isTurretSelected, selectedTurret } from "../stores";

    export let turrets: TurretType[];

    /*
    let positions = turrets.map(turret => {
        let res: [number, number, number] = [parseInt(turret.column.toString()), .1, parseInt(turret.row.toString())]
        return res
    })
    */

    function handleClick(turret: TurretType) {
        console.log(turret)
        isTurretSelected.set(true);
        selectedTurret.set(turret);
    }

    turrets.push({
        id: 0,
        typ: 0,
        health: 0,
        attack: 0,
        lane: 0,
        pos: 8,
        rate: 0,
        range: 0,
        target: 0n,
    })

</script>

{#each turrets as turret}
    <Turret turret={turret} handleClick={() => handleClick(turret)} />
{/each}