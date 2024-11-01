<script lang="ts">
    import { T } from "@threlte/core";
    import Ghost from "./models/ghost.svelte";
    import type { Ghost as GhostType } from "../dojo/typescript/models.gen";
    import { Mesh } from "three";

    export let ghosts: GhostType[];

    $: console.log(ghosts)

    /*
    let positions = ghosts.map(ghost => {
        let res: [number, number, number] = [parseInt(ghost.column.toString()), .1, parseInt(ghost.row.toString())]
        return res
    })
    */

    let positions: [number, number, number][] = [[0,.1,0]]

</script>

{#each ghosts as ghost}
    <Ghost ghost={ghost} />
{/each}
