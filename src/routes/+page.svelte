<script>
    import { supabase } from "$lib/supabase";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let notes = { data: [] };
    async function create() {
        const { data } = await supabase.auth.getUser();
        console.log(data);
        await supabase.from("Notes").insert({ user_id: data.user.id });
        await load();
    }

    onMount(async () => {
        await load();
    });

    async function load() {
        notes = await supabase.from("Notes").select();
        console.log(notes.data);
    }
</script>

<button on:click={create} class="btn variant-filled">Create note</button>

{#each notes.data as note}
    <button on:click={() => goto(`/note/${note.id}`)}>
        <p>{new Date(note.created_at).toLocaleString()}</p>
        <p>{note.content}</p>
    </button>
{/each}
