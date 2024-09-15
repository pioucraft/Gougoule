<script>
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabase";

    export let data;

    let content = "";
    let savedContent = content;

    onMount(async () => {
        content = (
            await supabase.from("Notes").select().eq("id", Number(data.id))
        ).data[0].content;
        savedContent = content;

        setTimeout(() => {
            const textarea = document.getElementById("textarea");
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        }, 1);
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

    function autoResize(event) {
        const textarea = event.target;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }
</script>

<div class="w-full p-3">
    <textarea
        id="textarea"
        bind:value={content}
        class="w-full bg-transparent p-3 border-2 resize-none"
        on:input={autoResize}
    ></textarea>
    {#if content == savedContent}
        <p>Saved</p>
    {/if}
</div>
