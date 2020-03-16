import client from "../graphql/client";

const SOUNDPACK_AUTH_TOKEN = "SOUNDPACK_AUTH_TOKEN";

export async function setToken(token: string) {
  await localStorage.clear();
  return await localStorage.setItem(SOUNDPACK_AUTH_TOKEN, token);
}

export async function getToken() {
  return await localStorage.getItem(SOUNDPACK_AUTH_TOKEN);
}

export async function logout() {
  localStorage.clear();
  // persistor.pause();
  // persistor.purge();
  client.resetStore();
  window.location.href = '/';
}
