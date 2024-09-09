"use server"

import { auth, signOut } from "../auth";

export async function signOutAction() {
    return await signOut({redirectTo: '/login'});
}

export async function imageLoader({}) {
    const session = await auth()
        return session?.user?.image 
}