import prisma from "@/lib/prisma";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HomePost from "@/components/home/post";

export default async function Home() {
  const users = await prisma.user.findMany();
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      author: true,
    },
  });

  return (
    <div className="flex justify-between items-center">
      <section className="flex flex-col">
        <h1 className="text-4xl font-bold mb-8">Superblog</h1>
        <ol className="list-decimal list-inside">
          {users.map((user) => (
            <li key={user.id} className="mb-2">
              {user.name}
            </li>
          ))}
        </ol>
      </section>

      <Card className="max-w-[320px] min-h-[400px] w-full">
        <CardHeader>
          <CardTitle>Last 5 posts</CardTitle>
          <CardDescription>Community news</CardDescription>
          <CardAction>
            <Link href="/posts/new">
              <Button className="p-0 cursor-pointer" variant="link">
                Create post
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-4">
            {posts.map((post) => (
              <HomePost key={post.id} post={post} />
            ))}
          </ul>
        </CardContent>
        <CardFooter className="mt-auto">
          <CardAction>
            <Link href="/posts">
              <Button className="cursor-pointer" variant="link">
                Show all
              </Button>
            </Link>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}
