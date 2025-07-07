"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("User is not registered.");
  }

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
    name: formData.get("name") as string,
  };

  if (
    !data.name ||
    data.name.trim().length < 4 ||
    data.name.trim().length > 24
  ) {
    throw new Error("Name must be between 4 and 24 characters long");
  }

  await prisma.user.update({
    where: { email: user.email },
    data,
  });

  revalidatePath('/profile')
  redirect("/profile");
}
