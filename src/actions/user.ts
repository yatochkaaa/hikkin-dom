"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { validateImageUrl, validateUsername } from "@/lib/validators";
import { Prisma } from "@prisma/client";

export async function getUsers(options: Prisma.UserFindManyArgs = {}) {
  const users = await prisma.user.findMany({
    ...options,
  });

  return users;
}

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user?.email) return;

  return prisma.user.findUnique({
    where: { email: session.user.email },
  });
}

export async function updateCurrentUser(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User is not registered.");
  }

  const data = {
    name: (formData.get("name") as string).trim(),
    image: (formData.get("image") as string).trim(),
  };

  if (data.name === user.name && data.image === user.image) {
    return redirect("/profile");
  }

  const usernameError = validateUsername(data.name);
  if (usernameError) throw new Error(usernameError);

  const imageError = validateImageUrl(data.image);
  if (imageError) throw new Error(imageError);

  await prisma.user.update({
    where: { email: user.email },
    data,
  });

  revalidatePath("/profile");
  redirect("/profile");
}
