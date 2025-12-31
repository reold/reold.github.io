<script lang="ts">
  import { onMount } from "svelte";
  let clientId =
    "106566474745-4m6v746ler2pvg1o2sanijcnlg7t8r1n.apps.googleusercontent.com";

  let buttonDiv: HTMLDivElement;

  // Google callback after login
  function handleCredentialResponse(response) {
    // Send response.credential (JWT) to your server for verification
    alert("Google Authentication is in development! Check back later.");
  }

  onMount(() => {
    // Load Google API script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(buttonDiv, {
          theme: "filled_black",
          size: "large",
          shape: "circle",
          text: "continue_with",
        });
        // window.google.accounts.id.prompt();
      }
    };
    document.body.appendChild(script);
  });
</script>

<!-- Div that will render the button -->
<div bind:this={buttonDiv}></div>
