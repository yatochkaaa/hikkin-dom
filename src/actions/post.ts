"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/user";
import { PostService } from "@/services/post.service";
import { createPostSchema, updatePostSchema } from "@/lib/validations";

export async function getPost(id: number) {
  return await PostService.getPostById(id);
}

export async function getPosts(options = {}) {
  return await PostService.getPosts(options);
}

export async function createPost(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      throw new Error("Unauthorized");
    }

    const result = createPostSchema.safeParse({
      title: formData.get("title"),
      content: formData.get("content"),
    });

    if (!result.success) {
      throw new Error(result.error.issues[0].message);
    }

    await PostService.createPost(result.data, user.id);

    revalidatePath("/");
    redirect("/");
  } catch (error) {
    console.error("Create post error:", error);
    throw error;
  }
}

export async function updatePost(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const postId = Number(formData.get("id"));
    const post = await PostService.getPostById(postId);
    if (!post || post.authorId !== user.id) {
      throw new Error("Unauthorized");
    }

    const result = updatePostSchema.safeParse({
      title: formData.get("title"),
      content: formData.get("content"),
      published: formData.get("published") === "on",
    });

    if (!result.success) {
      throw new Error(result.error.issues[0].message);
    }

    await PostService.updatePost(postId, result.data);

    const redirectTo = formData.get("redirect_to") as string;
    if (redirectTo) {
      revalidatePath(redirectTo);
      redirect(redirectTo);
    }
  } catch (error) {
    console.error("Update post error:", error);
    throw error;
  }
}

export async function deletePost(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const postId = Number(formData.get("id"));
    const post = await PostService.getPostById(postId);
    if (!post || post.authorId !== user.id) {
      throw new Error("Unauthorized");
    }
    await PostService.deletePost(postId);

    const redirectTo = formData.get("redirect_to") as string;
    if (redirectTo) {
      revalidatePath(redirectTo);
      redirect(redirectTo);
    }
  } catch (error) {
    console.error("Delete post error:", error);
    throw error;
  }
}
