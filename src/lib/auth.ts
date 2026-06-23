import { writable, derived } from "svelte/store";

const AUTH_SERVER = "https://auth.reold.workers.dev";

/* ---------- types ---------- */
export interface UserData {
  id: string;
  username: string;
  avatar: string | null;
  email?: string;
  email_verified?: boolean;
  provider: string;
}

interface AuthPlatform {
  token: string;
  user: UserData;
}

export interface AuthState {
  [provider: string]: AuthPlatform;
}

/* ---------- localStorage helpers ---------- */
function getAuthFromStorage(): AuthState {
  try {
    const raw = localStorage.getItem("auth");
    if (raw) return JSON.parse(raw);
  } catch {
    /* corrupted – start fresh */
  }
  return {};
}

function setAuthToStorage(state: AuthState) {
  localStorage.setItem("auth", JSON.stringify(state));
}

/* ---------- JWT decode (no verification, just reading payload) ---------- */
function decodeJwt(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

/* ---------- store ---------- */
export const authState = writable<AuthState>(getAuthFromStorage());

export const currentUser = derived(authState, ($auth) => {
  const providers = Object.keys($auth);
  if (providers.length === 0) return null;
  // Return the first logged‑in provider (priority can be adjusted later)
  const primary = providers[0];
  return { ...$auth[primary].user, provider: primary };
});

// Keep localStorage in sync
authState.subscribe((state) => {
  setAuthToStorage(state);
});

/* ---------- public API ---------- */

/** Call once on app mount to process ?jwt=...&auth=... from the URL (redirect fallback) */
export function processAuthFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const jwt = params.get("jwt");
  const auth = params.get("auth");
  if (!jwt || !auth) return;

  // Remove the query string from the address bar
  window.history.replaceState({}, "", window.location.pathname);

  const decoded = decodeJwt(jwt);
  if (!decoded) return;

  const user: UserData = {
    id: decoded.sub as string,
    username: decoded.username as string,
    avatar: decoded.avatar as string | null,
    email: decoded.email as string | undefined,
    email_verified: decoded.email_verified as boolean | undefined,
    provider: auth,
  };

  authState.update((state) => {
    state[auth] = { token: jwt, user };
    return state;
  });
}

/** Handle a successful popup login – called from the message event listener */
export function handlePopupAuth(token: string, user: UserData) {
  authState.update((state) => {
    state[user.provider] = { token, user };
    return state;
  });
}

/** Log out a specific provider (e.g. 'discord') */
export function logout(provider: string) {
  authState.update((state) => {
    delete state[provider];
    return state;
  });
}

export async function initAuth(): Promise<void> {
  const storedState = getAuthFromStorage();
  const providers = Object.keys(storedState);

  // For now, we only support Discord. You can loop through providers later.
  if (providers.length === 0) return;

  const provider = providers[0];
  const { token } = storedState[provider];

  try {
    const res = await fetch(`${AUTH_SERVER}/discord/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      // Token is invalid or expired – clear it
      authState.update((state) => {
        delete state[provider];
        return state;
      });
      return;
    }

    const user = await res.json();
    // Update store with verified data (also refreshes if email changed on Discord)
    authState.update((state) => {
      state[provider] = {
        token,
        user: {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
          email: user.email,
          email_verified: user.email_verified,
          provider: provider,
        },
      };
      return state;
    });
  } catch {
    // Network error – keep existing data but could optionally retry
    console.warn("Auth verification failed - staying with cached data");
  }
}
