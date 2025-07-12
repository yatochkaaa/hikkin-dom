import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPosts } from "@/actions/post";
import { Post } from "@/components/custom/post";
import { getCurrentUser } from "@/actions/user";

export default async function Posts() {
  const user = await getCurrentUser();
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
            <Post
              key={post.id}
              post={post}
              currentUserId={user?.id}
              redirectTo="/posts"
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
