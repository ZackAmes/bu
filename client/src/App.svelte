<script lang="ts">
    import type { Entity } from "@dojoengine/recs";
    import { componentValueStore } from "./componentValueStore";
    import { dojoStore, burnerManagerStore } from "./stores";
    import type { ComponentStore } from "./componentValueStore";

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

    <button on:click={() => burnerManager?.create()}>
        {burnerManager?.isDeploying ? "deploying burner" : "create burner"}
    </button>

    <div class="card">
        <div>{`burners deployed: ${burnerManager.list().length}`}</div>
        <div>
            select signer:{" "}
            <select on:change={handleBurnerChange}>
                {#each burnerManager?.list() as account}
                        <option value={account.address}>
                            {account.address}
                        </option>
                {/each}
            </select>
        </div>
        <div>
            <button on:click={() => burnerManager.clear()}>
                Clear burners
            </button>
            <p>
                You will need to Authorise the contracts before you can
                use a burner. See readme.
            </p>
        </div>
    </div>

    <div class="card">
        <button on:click={() => client.actions.spawn({account})}>Spawn</button>
        <div>
            Moves Left: {moves ? `${$moves?.remaining}` : "Need to Spawn"}
        </div>
        <div>
            Position:{" "}
            {position
                ? `${$position?.vec.x}, ${$position?.vec.y}`
                : "Need to Spawn"}
        </div>

        <div>{$moves && $moves.last_direction}</div>

    </div>

    <div class="card">
        <div>
            <button
                on:click={() =>
                    position && $position.vec.y > 0
                        ? client.actions.move({account, direction:{ type: "Up" }})
                        : console.log("Reach the borders of the world.")
                }
            >
                Move Up
            </button>
        </div>
        <div>
            <button
                on:click={() =>
                    position && $position.vec.x > 0
                        ? client.actions.move({account, direction: { type: "Left" }})
                        : console.log("Reach the borders of the world.")
                }
            >
                Move Left
            </button>
            <button
                on:click={() => client.actions.move({account, direction: { type: "Right" }})}
            >
                Move Right
            </button>
        </div>
        <div>
            <button
                on:click={() => client.actions.move({account, direction: { type: "Down" }})}
            >
                Move Down
            </button>
        </div>
    </div>
</main>
