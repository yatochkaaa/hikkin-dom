import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPosts } from "@/actions/post";
import Link from "next/link";

export default async function Posts() {
  const posts = await getPosts({ take: 15 });

  return (
    <div>
      <Tabs defaultValue="posts" className="flex flex-col gap-8">
        <TabsList className="px-0">
          <TabsTrigger
            value="posts"
            className="px-8 py-4 font-semibold text-lg cursor-pointer"
          >
            Posts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="flex flex-col gap-2">
          {posts.map((post) => (
            <Card key={post.id} className="gap-4">
              <CardHeader className="flex items-center gap-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author.image || ""} alt="avatar" />
                  <AvatarFallback delayMs={600}>
                    {post.author.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <div className="font-bold">{post.author.name}</div>
                  <span className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>

              <Link href={`/posts/${post.id}`}>
                <CardContent>
                  <span className="font-bold">{post.title}</span>
                </CardContent>
              </Link>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
