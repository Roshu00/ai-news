"use server";

import { prisma } from "@/db/prisma";
import { signIn, signOut } from "@/lib/auth";
import { formatErrors } from "@/lib/utils";
import { signUpFormSchema } from "@/lib/validation";
import { hashSync } from "bcrypt-ts";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import z from "zod";

// Sign in user with credentials
export async function signInWithCredentials(data: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", data);
    return { success: true, message: "Signed in successfully." };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Invalid credentials." };
  }
}

// Sign up user
export async function signUpUser(data: z.infer<typeof signUpFormSchema>) {
  try {
    const plainPassword = data.password;
    data.password = hashSync(data.password, 10);

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    await signIn("credentials", { email: data.email, password: plainPassword });

    return { success: true, message: "User registered successfully." };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: formatErrors(error) };
  }
}

// Sign out function
export async function signOutUser() {
  await signOut();
}
