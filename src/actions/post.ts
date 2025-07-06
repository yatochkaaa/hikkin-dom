"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { PostEditableData } from "@/types/post";

export async function getPost(postId: number) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
    },
  });

  return post;
}

export async function updatePost(formData: FormData) {
  const postId = Number(formData.get("id"));
  const data: PostEditableData = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  await prisma.post.update({
    where: {
      id: postId,
    },
    data,
  });

  revalidatePath(`/posts/${postId}`);
  redirect(`/posts/${postId}`);
}

export async function deletePost(formData: FormData) {
  const postId = Number(formData.get("id"));

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  revalidatePath("/");
  redirect("/");
}
