<script lang="ts">
    import type { Entity } from "@dojoengine/recs";
    import { componentValueStore } from "./componentValueStore";
    import { dojoStore, burnerManagerStore } from "./stores";
    import type { ComponentStore } from "./componentValueStore";
    import Scene from "./Scene.svelte";
    let entityId: Entity;
    let address: string;
    let position: ComponentStore;
    let moves: ComponentStore;
    

    $: ({ clientComponents, torii, burnerManager, client } = $dojoStore);

    $: if (torii) entityId = torii.poseidonHash([burnerManager.getActiveAccount()?.address!])

    $: if (dojoStore) position = componentValueStore(clientComponents.Position, entityId);
    $: if (dojoStore) moves = componentValueStore(clientComponents.Moves, entityId);

    $: if (burnerManagerStore) (burnerManager = $burnerManagerStore)
    $: account = burnerManager.getActiveAccount();

    function handleBurnerChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        address = target.value;
        console.log(address)
        burnerManager.select(address);
        console.log(burnerManager.getActiveAccount()?.address)
    }

</script>

<main>

    <Scene />

</main>
