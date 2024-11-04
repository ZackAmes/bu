<script lang="ts">
    import { state, dojoStore, tick, account } from './stores';
    import { connect } from './controller';


    async function handleConnect() {
        await connect();
        let new_state = await $dojoStore.client?.iterate($account!.account!, $tick);
        console.log(new_state)
        state.set(new_state)
    }
</script>

<style>
    .title-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: url('/path-to-your-background-image.jpg') no-repeat center center;
        background-size: cover;
    }

    .title {
        font-size: 48px;
        color: #ffffff;
        margin-bottom: 20px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .start-button {
        padding: 15px 30px;
        font-size: 24px;
        background-color: #28a745;
        color: #ffffff;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .start-button:hover {
        background-color: #218838;
    }
</style>

<div class="title-screen">
    <h1 class="title">Bu</h1>
    <button class="start-button" on:click={handleConnect}>
        Connect
    </button>
</div> 