<script>
    import { supabase } from "$lib/supabase.js";

    let email = "";
    let password = "";

    async function login() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) alert(error);
    }
</script>

<h1>email</h1>
<input type="email" bind:value={email} />

<h1>Password</h1>
<input type="password" bind:value={password} />

<button on:click={login}>Log in</button>
