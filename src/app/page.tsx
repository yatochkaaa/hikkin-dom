import Link from "next/link";
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
import HomePost from "@/components/home/post";
import { TypographyH1, TypographyList } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { getUsers } from "@/actions/user";
import { getPosts } from "@/actions/post";

export default async function Home() {
  const users = await getUsers();
  const posts = await getPosts({ take: 5 });

  return (
    <div className="flex justify-between">
      <section className="flex flex-col">
        <TypographyH1 className="mb-6">Users:</TypographyH1>
        <TypographyList className="list-decimal list-inside">
          {users.map((user) => (
            <li key={user.id} className="mb-2">
              {user.name}
            </li>
          ))}
        </TypographyList>
      </section>

      <Card className="max-w-[320px] min-h-[400px] w-full">
        <CardHeader>
          <CardTitle>Community news</CardTitle>
          <CardDescription>Last posts</CardDescription>
          <CardAction>
            <Link href="/posts/new">
              <Button className="p-0 cursor-pointer" variant="link">
                Create post
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <TypographyList className="m-0">
            {posts.map((post) => (
              <div key={post.id}>
                <HomePost post={post} />
                <Separator className="my-2" />
              </div>
            ))}
          </TypographyList>
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
