<script>
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabase";

    export let data;
    console.log(data.id);

    let content = "";
    let savedContent = content;
    onMount(async () => {
        content = (
            await supabase.from("Notes").select().eq("id", Number(data.id))
        ).data[0].content;
        savedContent = content;
    });

    setInterval(async () => {
        await save();
    }, 2 * 1000);

    async function save() {
        if (savedContent == content) return;
        savedContent = content;
        await supabase
            .from("Notes")
            .update({ content: savedContent })
            .eq("id", Number(data.id));
    }
</script>

<textarea bind:value={content}></textarea>
{#if content == savedContent}
    <p>Saved</p>
{/if}
