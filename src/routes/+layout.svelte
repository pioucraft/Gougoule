<script>
    import { supabase } from "$lib/supabase";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import "../app.css";
    import {
        initializeStores,
        Modal,
        autoModeWatcher,
    } from "@skeletonlabs/skeleton";

    initializeStores();

    onMount(async () => {
        autoModeWatcher();
        let { error } = await supabase.auth.getUser();
        if (error) goto("/login");
    });
</script>

<Modal />

<slot />
