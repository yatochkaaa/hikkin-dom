"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UserService } from "@/services/user.service";
import { updateUserSchema } from "@/lib/validations";

export async function getUsers(options: Prisma.UserFindManyArgs = {}) {
  const users = await prisma.user.findMany({
    ...options,
  });

  return users;
}

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user?.id) return;

  return await UserService.getUser(session.user.id);
}

export async function updateCurrentUser(formData: FormData) {
  try {
    const user = await getCurrentUser();

    if (!user?.id) {
      throw new Error("Unauthorized");
    }

    const result = updateUserSchema.safeParse({
      name: (formData.get("name") as string).trim(),
      image: (formData.get("image") as string).trim(),
    });

    if (!result.success) {
      throw new Error(result.error.issues[0].message);
    }

    await UserService.updateUser(user.id, result.data);

    revalidatePath("/profile");
    redirect("/profile");
  } catch (error) {
    console.error("Update user error:", error);
    throw error;
  }
}
