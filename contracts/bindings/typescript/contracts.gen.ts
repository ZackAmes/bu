import { DojoProvider } from "@dojoengine/core";
import { Account } from "starknet";
import * as models from "./models.gen";

export async function setupWorld(provider: DojoProvider) {

	const actions_spawn = async (account: Account) => {
		try {
			return await provider.execute(
				account,
				{
					contractName: "actions",
					entryPoint: "spawn",
					calldata: [],
				}
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_getState = async (account: Account, tick: number) => {
		try {
			return await provider.execute(
				account,
				{
					contractName: "actions",
					entryPoint: "get_state",
					calldata: [tick],
				}
			);
		} catch (error) {
			console.error(error);
		}
	};

	return {
		actions: {
			spawn: actions_spawn,
			getState: actions_getState,
		},
	};
}