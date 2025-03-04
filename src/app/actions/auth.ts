"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import z from "zod";
import ModelUser, { User } from "../models/ModelUser";
import { MongoServerError } from "mongodb";
import { createSession } from "../lib/sesion";

export type FormResponse = {
  errors: {
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
};

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function register(prevState: FormResponse, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = userSchema.safeParse({ email, password });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const user = await ModelUser.create({ email, password });
    await createSession(user as User);
    console.log(user);
  } catch (e: unknown) {
    return {
      errors: {
        email: [
          (e as MongoServerError).code == 11000
            ? "Email already exists"
            : "An error occurred",
        ],
      },
    };
  }

  redirect("/");
}

export async function login(
  prevState: { message: string },
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await ModelUser.findByEmail(email);

  if (!user) {
    return {
      message: "Invalid email or password",
    };
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return {
      message: "Invalid email or password",
    };
  }

  await createSession(user as User);
  redirect("/");
}
