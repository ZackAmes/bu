import "./app.css";
import App from "./App.svelte";
import { setup } from "./dojo/setup";
import { dojoConfig } from "../dojoConfig";
import { dojoStore, account } from "./stores";

// Create a writable store for the setup result

async function initApp() {
  // Update the store with the setup result
  let setupResult = await setup(dojoConfig);
  dojoStore.set(setupResult);
  account.set(setupResult.burnerManager.account);

  console.log("App initialized");

  const app = new App({
    target: document.getElementById("app")!,
  });

  return app;
}

export default initApp();
