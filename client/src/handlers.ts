import { dojoStore, state, tick, account } from "./stores";
import { get } from "svelte/store";
import { connect  } from "./controller";

export async function handleTickClick() {
    if (!get(account)) {
        await connect();
    }
    if (get(dojoStore).client){
        state.set(await get(dojoStore).client.iterate(get(account).account!, get(tick)));
        tick.set(get(tick) + 1);
        console.log(get(state))
    }
}