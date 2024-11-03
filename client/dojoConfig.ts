import manifest from "./manifest_sepolia.json";

import { createDojoConfig } from "@dojoengine/core";

export const dojoConfig = createDojoConfig({
  rpcUrl: "https://api.cartridge.gg/x/starknet/sepolia",
  manifest,
});
