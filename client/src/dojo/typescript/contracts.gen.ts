import { DojoProvider, type DojoCall } from "@dojoengine/core";
import { Account } from "starknet";
import * as models from "./models.gen";
import { type Call, type CallDetails } from "starknet";
import manifest from "../../../../contracts/manifest_dev.json";

export async function setupWorld(provider: DojoProvider) {

	const worldDispatcher = async (account: Account) => {
		try {
			return await provider.execute(

				account,
				{
					contractName: "actions",
					entrypoint: "world_dispatcher",
					calldata: [],
				},
				"bu"
			);
		} catch (error) {
			console.error(error);
		}
	};

	const dojoName = async (account: Account) => {
		try {
			return await provider.execute(

				account,
				{
					contractName: "actions",
					entrypoint: "dojo_name",
					calldata: [],
				},
				"bu"
			);
		} catch (error) {
			console.error(error);
		}
	};

	const spawn = async (account: Account) => {
		console.log("Spawning account", account);
		console.log(provider);
		console.log(manifest);
		
		let contracts = JSON.parse(JSON.stringify(manifest.contracts));
		console.log(contracts[0]);

		let call: Call = {
			entrypoint: "spawn",
			contractAddress: contracts[0].address,
			calldata: [],
		};
		try {
			return await provider.execute(
				account,
				call,
				"bu"
			);
		} catch (error) {
			console.error(error);
		}
	};

	return {
		worldDispatcher,
		dojoName,
		spawn,
	};
}