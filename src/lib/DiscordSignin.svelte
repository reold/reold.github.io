<script lang="ts">
  import { handlePopupAuth, logout } from "./auth";
  import type { UserData } from "./auth";

  export let user: UserData | null = null;

  const AUTH_SERVER = "https://auth.reold.workers.dev";
  const ALLOWED_ORIGIN = "https://auth.reold.workers.dev";

  let popup: Window | null = null;
  let messageHandler: ((e: MessageEvent) => void) | null = null;
  let checkInterval: number | null = null;

  function cleanup() {
    if (messageHandler) {
      window.removeEventListener("message", messageHandler);
      messageHandler = null;
    }
    if (checkInterval !== null) {
      clearInterval(checkInterval);
      checkInterval = null;
    }
    popup = null;
  }

  function startPopupFlow() {
    const origin = window.location.origin;
    const popupUrl = `${AUTH_SERVER}/discord?popup=1&origin=${encodeURIComponent(origin)}`;

    // Try to open a popup
    popup = window.open(popupUrl, "discord-auth", "width=500,height=650");

    if (!popup) {
      // Popup blocked – fallback to full redirect
      window.location.href = `${AUTH_SERVER}/discord`;
      return;
    }

    // Listen for the postMessage
    messageHandler = (event: MessageEvent) => {
      if (event.origin !== ALLOWED_ORIGIN) return;
      const data = event.data;
      if (data && data.type === "discord-auth" && data.token && data.user) {
        handlePopupAuth(data.token, data.user);
        cleanup();
        popup?.close();
      }
    };
    window.addEventListener("message", messageHandler);

    // If the popup is closed manually without completing, clean up
    checkInterval = window.setInterval(() => {
      if (popup && popup.closed) {
        cleanup();
      }
    }, 500);
  }
</script>

{#if user && user.provider === "discord"}
  <!-- "Connected" label -->
  <div class="flex items-center gap-2 text-sm font-mono text-gray-300">
    {#if user.avatar}
      <img
        src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=32`}
        class="w-5 h-5 rounded-full"
        alt=""
      />
    {:else}
      <div
        class="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center text-xs"
      >
        ?
      </div>
    {/if}
    <span>Connected as <strong>{user.username}</strong></span>
    <button
      class="text-red-400 hover:text-red-300 underline"
      on:click={() => logout("discord")}
    >
      Disconnect
    </button>
  </div>
{:else}
  <!-- Sign‑in button -->
  <button
    class="flex items-center bg-black text-white border border-gray-300 rounded-lg px-6 py-2 text-sm font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
    on:click={startPopupFlow}
  >
    <svg
      class="h-6 w-6 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="800px"
      height="800px"
      viewBox="0 -28.5 256 256"
      version="1.1"
      preserveAspectRatio="xMidYMid"
    >
      <g>
        <path
          d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
          fill="#5865F2"
          fill-rule="nonzero"
        >
        </path>
      </g>
    </svg>

    <span class="font-mono">Continue with Discord</span>
  </button>
{/if}
