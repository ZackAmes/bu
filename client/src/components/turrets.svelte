<script lang="ts">
    import { T } from "@threlte/core";
    import Turret from "./models/turret.svelte";
    import type { Turret as TurretType } from "../dojo/typescript/models.gen";
    import { Mesh } from "three";
    import { isTurretSelected, selectedTurret } from "../stores";

    export let turrets: any[];


    function handleClick(turret: TurretType) {
        console.log(turret)
        isTurretSelected.set(true);
        selectedTurret.set(turret);
    }

</script>

{#each turrets as turret}
    <Turret pos={parseInt(turret.pos)} lane={parseInt(turret.lane)} />
{/each}
