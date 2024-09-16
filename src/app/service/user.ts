"use server";

import { revalidateTag } from "next/cache";
import { fetchWrapper } from "./utils";
import { UserDTO } from "./dto/UserDTO";
import { UpdateUserDTO } from "./dto/UpdateUserDTO";

export async function registerUser(formData: FormData) {
  const username: string = formData?.get("username")?.toString() ?? "";
  const response = await fetchWrapper(
    "/user/register",
    {
      method: "POST",
    },
    [
      {
        key: "username",
        value: username ?? "",
      },
    ]
  );
  if (response?.ok) revalidateTag("user");
  else return null;
}

export async function getUser(): Promise<UserDTO | null> {
  const response = await fetchWrapper("/user/", {
    method: "GET",
    next: { tags: ["user"] },
  });
  if (response?.ok) return response.json();
  else return null;
}

export async function isUsernameExist(username: string) {
  const response = await fetchWrapper(
    `/user/is-username-valid`,
    {
      method: "GET",
    },
    [{ key: "username", value: username }]
  );
  if (response?.ok) return response.json();
  return null;
}

export async function updateUserInfos(data: FormData): Promise<void | UserDTO> {
  const updateUser: UpdateUserDTO = {
    name: data.get("name")?.toString() ?? "",
    username: data.get("username")?.toString() ?? "",
    bio: data.get("bio")?.toString() ?? "",
  };

  const response = await fetchWrapper(`/user/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateUser),
  });
  if (response?.ok) {
    revalidateTag("user");
    return response.json();
  }
}

export async function loseLife(): Promise<boolean> {
  const response = await fetchWrapper("/user/lose-life", {
    method: "PUT",
  });
  if (response?.ok) {
    revalidateTag("user");
  }
  return response?.ok ?? false;
}
