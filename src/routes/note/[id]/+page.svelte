<script>
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabase";
    import { goto } from "$app/navigation";

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

    async function done() {
        await save();
        const embedding = await supabase.functions.invoke("embed", {
            body: { input: savedContent },
        });
        if (embedding.error) {
            alert(embedding.error);
            return;
        }
        console.log(Array.from(embedding.data.embedding));
        await supabase
            .from("Notes")
            .update({ vector: embedding.data.embedding })
            .eq("id", Number(data.id)),
            goto("/");
    }
</script>

<div class="w-full p-5">
    <div
        class="border-b-2 p-3 fixed w-full left-0 top-0 justify-between flex bg-surface-50-900-token"
    >
        <p class="btn variant-filled w-24">
            {#if content == savedContent}
                Saved
            {:else}
                Not saved
            {/if}
        </p>
        <button on:click={done} href="/" class="btn variant-glass-tertiary"
            >Done</button
        >
    </div>

    <textarea
        id="textarea"
        placeholder="Type here..."
        bind:value={content}
        class="w-full bg-transparent resize-none min-h-[80vh] mt-20 outline-none"
        on:input={autoResize}
    ></textarea>
</div>
