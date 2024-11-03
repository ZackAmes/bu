import { DojoProvider, type DojoCall } from "@dojoengine/core";
import { Account } from "starknet";
import * as models from "./models.gen";
import { type Call, type CallDetails, Contract, CallData } from "starknet";
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

	const getState = async (account: Account, tick: number) => {
		let contracts = JSON.parse(JSON.stringify(manifest.contracts));
		let abi = await provider.provider.getClassAt(contracts[0].address);

		const myTestContract = new Contract(contracts[0].abi, contracts[0].address, provider.provider).typedv2(contracts[0].abi);

		let calldata	 = CallData.compile([tick]);
		console.log(abi)
		let call: Call = {
			entrypoint: "get_state",
			contractAddress: contracts[0].address,
			calldata: calldata,
		};

		myTestContract.connect(account);
		let result = await myTestContract.call("get_state", [tick]);
		console.log(result)
		try {
			return await provider.call(
				"bu",
				call
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
		getState,
	};
}