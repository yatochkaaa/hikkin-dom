import { Post as PrismaPost, User } from "@prisma/client";

export type PostWithAuthor = PrismaPost & {
  author: User;
};

export type PostEditableData = {
  title: string;
  content: string;
};
