import client from "../graphql/client";

const SOUNDPACK_AUTH_TOKEN = "SOUNDPACK_AUTH_TOKEN";

export function setToken(token: string) {
  return localStorage.setItem(SOUNDPACK_AUTH_TOKEN, token);
}

export function getToken(): string | null {
  return localStorage.getItem(SOUNDPACK_AUTH_TOKEN);
}

export async function logout() {
  localStorage.clear();
  // persistor.pause();
  // persistor.purge();
  client.resetStore();
  window.location.href = '/';
}
