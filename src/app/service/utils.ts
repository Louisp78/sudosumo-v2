"use server"

import { auth } from "../auth"

export async function fetchWrapper(
  url: string,
  init?: RequestInit,
  searchParams?: { key: string; value: string }[]
) {
  const baseURL = new URL(process.env.BACKEND_API_URL!)
  baseURL.pathname = url

  searchParams?.forEach((elt) => {
    baseURL.searchParams.set(elt.key, elt.value)
  })

  const session = await auth()
  const defaultHeaders = {
    Authorization: session?.id_token ? `Bearer ${session?.id_token}` : "",
  }
  const headers = {
    ...defaultHeaders,
    ...init?.headers,
  }
  return fetch(`${baseURL}`, {
    ...init,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  }).catch((e) => {
    if (e instanceof TypeError) {
      // eslint-disable-next-line no-console
      console.error("Fetch couldn't reach the API : ", e)
    }
  })
}
