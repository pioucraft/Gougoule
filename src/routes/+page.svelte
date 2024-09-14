<script>
    import { supabase } from "$lib/supabase";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let notes = [];
    let maxLoad = 20;

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
        notes = (await supabase.from("Notes").select()).data;
        notes = notes.sort((a, b) => {
            return (
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            );
        });
    }
</script>

<div class="flex flex-col p-3 gap-3">
    <button on:click={create} class="btn variant-filled w-min mb-3 mt-3"
        >Create note</button
    >

    <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2"
    >
        {#each notes as note, i}
            {#if i < maxLoad}
                <button
                    on:click={() => goto(`/note/${note.id}`)}
                    class="card p-3 break-words overflow-hidden h-40 flex flex-col text-justify"
                >
                    <p class="text-lg mb-5">
                        {new Date(note.created_at).toLocaleString()}
                    </p>
                    <p>{note.content}</p>
                </button>
            {/if}
        {/each}
    </div>
    {#if maxLoad < notes.length}
        <button
            on:click={() => (maxLoad += 20)}
            class="btn variant-filled w-min place-self-center">Load more</button
        >
    {/if}
</div>
