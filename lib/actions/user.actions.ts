'use server'

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite";
import { parseStringify } from "../utils";
import { ID } from "node-appwrite";

interface SignUpParams {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;

  try {
    const { account } = await createAdminClient();
    const newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
    const session = await account.createEmailPasswordSession(email, password);

    const cookieStore = await cookies(); // Await the cookies() promise

    cookieStore.set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("Error during sign-up:", error);
    throw new Error("Sign-up failed. Please try again.");
  }
};

export const signIn = async ({email, password} : signInProps) => {
  try {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);
    return parseStringify(response);
  } catch (error) {
    console.error("Error during sign-in:", error);
    return { success: false, error: "Invalid credentials. Please try again." };
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user)
  } catch (error) {
    console.error("Error fetching logged-in user:", error);
    return null;
  }
}


export const logoutAccount = async () => {
  try {
    const {account} = await createSessionClient();
    (await cookies()).delete('appwrite-session')
    await account.deleteSession('current')
  } catch (error) {
    return null;
  }
}