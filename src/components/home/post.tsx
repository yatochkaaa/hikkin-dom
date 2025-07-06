import { Post, User } from "@prisma/client";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Form from "next/form";
import { revalidatePath } from "next/cache";
import Link from "next/link";

type PostWithAuthor = Post & {
  author: User;
};

interface Props {
  post: PostWithAuthor;
}

export default function HomePost({ post }: Props) {
  async function deletePost() {
    "use server";

    await prisma.post.delete({
      where: {
        id: post.id,
      },
    });

    revalidatePath("/");
  }

  return (
    <li className="flex justify-between items-center gap-2">
      <Link href={`/posts/${post.id}`} className="flex flex-col gap-1">
        <span className="font-semibold line-clamp-2">{post.title}</span>
        <span className="text-sm text-gray-600 text-nowrap">by {post.author.name}</span>
      </Link>
      <Form action={deletePost}>
        <Button
          variant="secondary"
          size="icon"
          className="size-8 cursor-pointer"
        >
          <Trash />
        </Button>
      </Form>
    </li>
  );
}
