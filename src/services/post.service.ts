import prisma from "@/lib/prisma";
import { CreatePostData, UpdatePostData } from "@/types";
import { Prisma } from "@prisma/client";

export class PostService {
  static async createPost(data: CreatePostData, authorId: string) {
    return await prisma.post.create({
      data: { ...data, authorId },
      include: { author: true },
    });
  }

  static async getPostById(id: number) {
    return await prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  static async getPosts(
    options: Omit<Prisma.PostFindManyArgs, "include"> = {}
  ) {
    return await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      ...options,
      include: { author: true },
    });
  }

  static async updatePost(id: number, data: UpdatePostData) {
    return await prisma.post.update({
      data,
      where: { id },
      include: { author: true },
    });
  }

  static async deletePost(id: number) {
    return await prisma.post.delete({
      where: { id },
    });
  }
}
