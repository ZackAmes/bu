import type { DojoConfig } from "@dojoengine/core";
import { DojoProvider } from "@dojoengine/core";
import * as torii from "@dojoengine/torii-client";
import { createClientComponents } from "./createClientComponents";
import { defineContractComponents } from "./typescript/models.gen";
import { world } from "./world";
import { setupWorld } from "./typescript/contracts.gen";
import { Account } from "starknet";
import type { ArraySignatureType } from "starknet";
import { BurnerManager } from "@dojoengine/create-burner";
import { getSyncEntities, getSyncEvents } from "@dojoengine/state";
import { account } from "../stores";

export type SetupResult = Awaited<ReturnType<typeof setup>>;

export async function setup({ ...config }: DojoConfig) {
  // torii client
  /*
  const toriiClient = await torii.createClient({
    rpcUrl: config.rpcUrl,
    toriiUrl: config.toriiUrl,
    relayUrl: "",
    worldAddress: config.manifest.world.address || "",
  });

  */

  // create contract components
  const contractComponents = defineContractComponents(world);

  // create client components
  const clientComponents = createClientComponents({ contractComponents });

  // create dojo provider
  const dojoProvider = new DojoProvider(config.manifest, config.rpcUrl);

  /*
  const sync = await getSyncEntities(
    toriiClient,
    contractComponents as any,
    undefined,
    [],
    3000,
    true
  );

  const eventSync = getSyncEvents(
    toriiClient,
    contractComponents as any,
    undefined,
    []
  );
  */

  // setup world
  const client = await setupWorld(dojoProvider);

  return {
    client,
    clientComponents,
    contractComponents,
    config,
    dojoProvider,
    /*
    toriiClient,
    eventSync,
    torii,
    sync,
    */
  };
}
