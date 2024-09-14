<script>
    import { onMount } from "svelte";
    import "../app.css";
    import { autoModeWatcher } from "@skeletonlabs/skeleton";
    onMount(() => {
        autoModeWatcher();
    });
</script>

<slot />
