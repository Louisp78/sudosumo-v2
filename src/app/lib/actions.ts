"use server";

import { auth, signOut, signIn } from "../auth";

//TODO: handle no network connection -> redirect to a page

export async function signOutAction() {
  return await signOut({ redirectTo: "/login" });
}

export async function registerUser() {
  return await fetchWrapper("/user/register", {
    method: "POST",
  });
}

export async function getUser() {
  const response = await fetchWrapper("/user/", {
    method: "GET",
  });
  if (response.ok) return await response.json();
  else return null;
}

export async function signInAction() {
  await signIn();
}

export async function imageLoader({}) {
  const session = await auth();
  return session?.user?.image;
}

async function fetchWrapper(url: string, init?: RequestInit) {
  const baseURL = new URL(process.env.BACKEND_API_URL!);
  baseURL.pathname = url;

  const session = await auth();
  if (session?.id_token == null) throw new Error("User not authentificated");
  const defaultHeaders = {
    Authorization: session?.id_token ? `Bearer ${session?.id_token}` : "",
  };
  const headers = {
    ...defaultHeaders,
    ...init?.headers,
  };
  return fetch(`${baseURL}`, {
    ...init,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  });
}
