import Link from "next/link";
import { Edit } from "lucide-react";
import { redirect } from "next/navigation";
import { getPosts } from "@/actions/post";
import { getCurrentUser } from "@/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "@/components/custom/post";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Profile() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const posts = await getPosts({
    where: {
      authorId: user.id,
    },
  });

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <Card className="shadow-md">
        <CardHeader className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.image || ""} alt="avatar" />
              <AvatarFallback>
                {user.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-semibold">
                {user.name}
              </CardTitle>
            </div>
          </div>

          <CardAction>
            <Link href="/profile/edit">
              <Edit className="cursor-pointer" />
            </Link>
          </CardAction>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-1">
            <span className="text-xl">{posts.length}</span>
            <span className="text-sm text-gray-400">Posts</span>
          </div>
        </CardContent>
      </Card>

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
          {posts.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              У вас пока нет постов.
            </p>
          ) : (
            <div className="space-y-2">
              {posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  currentUserId={user.id}
                  redirectTo="/profile"
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
