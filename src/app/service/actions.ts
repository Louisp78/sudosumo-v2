"use server";

import { auth, signOut, signIn } from "../auth";

//TODO: handle no network connection -> redirect to a page

export async function signOutAction() {
  return await signOut({ redirectTo: "/login" });
}

export async function signInAction() {
  await signIn();
}

export async function imageLoader({}) {
  const session = await auth();
  return session?.user?.image;
}
