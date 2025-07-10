import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { PostWithAuthor } from "@/types/post";
import Link from "next/link";

interface Props {
  post: PostWithAuthor;
}

function Post({ post }: Props) {
  return (
    <Card className="gap-4">
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
  );
}

export { Post };
