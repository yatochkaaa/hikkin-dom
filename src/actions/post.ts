"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { PostEditableData } from "@/types/post";
import { getCurrentUser } from "@/actions/user";

export async function getPost(postId: number) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
    },
  });

  return post;
}

export async function getUserPosts() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User is not registered.");
  }

  const posts = await prisma.post.findMany({
    where: {
      authorId: user.id,
    },
  });

  return posts;
}

export async function createPost(formData: FormData) {
  const user = await getCurrentUser();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!user) {
    throw new Error("User is not registered.");
  }

  if (!title || title.trim().length === 0) {
    throw new Error("Title is required.");
  }

  await prisma.post.create({
    data: {
      title,
      content,
      authorId: user.id,
    },
  });

  revalidatePath("/");
  redirect("/");
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
