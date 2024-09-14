<script>
    import { supabase } from "$lib/supabase";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import "../app.css";
    import { autoModeWatcher } from "@skeletonlabs/skeleton";

    onMount(async () => {
        autoModeWatcher();
        let { error } = await supabase.auth.getUser();
        if (error) goto("/login");
    });
</script>

<slot />
