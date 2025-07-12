import { Prisma } from "@prisma/client";

export type UserWithPosts = Prisma.UserGetPayload<{
  include: { posts: true };
}>;

export type PostWithAuthor = Prisma.PostGetPayload<{
  include: { author: true };
}>;

export type CreatePostData = {
  title: string;
  content?: string;
};

export type UpdatePostData = {
  title?: string;
  content?: string;
};

export type UpdateUserData = {
  name?: string
  image?: string
}
