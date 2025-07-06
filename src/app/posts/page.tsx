import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function Posts() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">
        Posts
      </h1>
      <ul className="font-[family-name:var(--font-geist-sans)] max-w-2xl space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="flex items-center gap-2">
            <span className="font-semibold">{post.title}</span>
            <span className="text-sm text-gray-600">by {post.author.name}</span>
            <Button
              variant="secondary"
              size="icon"
              className="size-8"
            >
              <Trash />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
