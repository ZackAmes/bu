import "./app.css";
import App from "./App.svelte";
import { setup } from "./dojo/setup";
import { dojoConfig } from "../dojoConfig";
import { dojoStore, account, tunnelTexture, portalTexture } from "./stores";
import manifest from "../manifest_sepolia.json";
import { controller, connect } from "./controller";
import * as THREE from 'three';
// Create a writable store for the setup result

async function initApp() {
  // Update the store with the setup result
  let setupResult = await setup(dojoConfig);

  console.log(manifest.contracts[0].abi);
  dojoStore.set(setupResult);

    const loader = new THREE.TextureLoader();
    loader.load('/tunnel_texture.jpg', (texture) => {
        let tTexture = texture;
        tTexture.wrapS = tTexture.wrapT = THREE.RepeatWrapping;
        tTexture.repeat.set(1, 20);
        tunnelTexture.set(tTexture)
    }, undefined, (error) => {
        console.error('Error loading tunnel texture:', error);
    });
    loader.load('/portal_texture.jpg', (texture) => {
        let pTexture = texture;
        pTexture.wrapS = pTexture.wrapT = THREE.RepeatWrapping;
        pTexture.repeat.set(1, 1);
        portalTexture.set(pTexture)
    }, undefined, (error) => {
        console.error('Error loading portal texture:', error);
    });


  console.log("App initialized");

  const app = new App({
    target: document.getElementById("app")!,
  });

  return app;
}

export default initApp();
