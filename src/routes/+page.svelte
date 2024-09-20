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
        await loadLatestNote();
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

    async function loadLatestNote() {
        goto("/note/" + notes[0].id);
    }
</script>

<div class="flex flex-col p-3 gap-3 mt-3">
    <div class="flex justify-between">
        <button on:click={create} class="btn variant-filled w-min"
            >Create note</button
        >
        <div class="flex flex-row gap-2">
            <button class="btn-icon variant-filled"
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                    />
                </svg>
            </button>
            <button class="btn-icon variant-filled"
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
            </button>
        </div>
    </div>

    <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 mt-3"
    >
        {#each notes as note, i}
            {#if i < maxLoad}
                <button
                    on:click={() => goto(`/note/${note.id}`)}
                    class="card p-3 break-words overflow-hidden flex flex-col text-justify"
                >
                    <p class="text-lg mb-5">
                        {new Date(note.created_at).toLocaleString()}
                    </p>
                    <p class="w-full h-[5.5em]">{note.content}</p>
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
