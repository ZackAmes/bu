import { DojoProvider, type DojoCall } from "@dojoengine/core";
import { Account } from "starknet";
import * as models from "./models.gen";
import { type Call, type CallDetails, Contract, CallData } from "starknet";
import manifest from "../../../manifest_sepolia.json";

export async function setupWorld(provider: DojoProvider) {

	const iterate = async (account: Account, tick: number) => {
		let contracts = JSON.parse(JSON.stringify(manifest.contracts));
		console.log(contracts[0]);

		const myTestContract = new Contract(contracts[0].abi, contracts[0].address, provider.provider).typedv2(contracts[0].abi);

		myTestContract.connect(account);
		let result = await myTestContract.call("iterate", [tick]);
		console.log(result);
		return result;
	};

	const iterate_from_state = async (account: Account, tick: number) => {
		let contracts = JSON.parse(JSON.stringify(manifest.contracts));
		console.log(contracts[0]);

		const myTestContract = new Contract(contracts[0].abi, contracts[0].address, provider.provider).typedv2(contracts[0].abi);

		myTestContract.connect(account);
		let result = await myTestContract.call("iterate", [tick]);
		console.log(result);
		return result;
	};

	const start_game = async (account: Account) => {
		let contracts = JSON.parse(JSON.stringify(manifest.contracts));
		console.log(contracts[0]);
	};

	const add_turret = async (account: Account, turret: models.Turret) => {
		let contracts = JSON.parse(JSON.stringify(manifest.contracts));
		console.log(contracts[0]);
	};


	return {
		iterate,
		iterate_from_state,
		start_game,
		add_turret,
	};
}