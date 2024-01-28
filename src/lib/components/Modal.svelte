<script>
    import { createEventDispatcher } from 'svelte';
    import Card from '$lib/components/Card.svelte'
  
    const dispatch = createEventDispatcher();

    function close() {
        dispatch('close');
    }
</script>
  
<style>
    .modal {
        z-index: 1000;
        margin: auto;
    }

    .backdrop {
        position: fixed;
        top: 0;
        left:0;
        right:0;
        bottom:0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.75);
        z-index: 999;
        display: flex;
        padding: 20px 15px;
        overflow: auto;
    }

    .backdrop__btn{
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: 0;
        opacity: 0;
    }
</style>
  
<div class="backdrop">
    <button type="button" class="backdrop__btn" on:click={close}>Close</button>
    <div class="modal">
        <Card>
            <slot />
        </Card>
    </div>
</div>