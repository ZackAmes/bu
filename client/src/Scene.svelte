<script lang="ts">
    import type { ComponentStore } from "./componentValueStore";
    import { Canvas, T } from "@threlte/core";


    export let position: ComponentStore;
    export let moves: ComponentStore;
</script>

<Canvas>
    <T.Scene>
        <T.Mesh>
            <T.BoxGeometry />
            <T.MeshBasicMaterial />
        </T.Mesh>
    </T.Scene>
</Canvas>
