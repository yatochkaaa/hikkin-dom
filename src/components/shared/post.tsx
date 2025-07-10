import { EllipsisVertical, SquarePen, Trash } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { PostWithAuthor } from "@/types/post";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { deletePost } from "@/actions/post";

interface Props {
  post: PostWithAuthor;
  currentUserId?: string;
  redirectTo?: string;
}

function Post({ post, currentUserId, redirectTo }: Props) {
  return (
    <Card className="gap-4">
      <CardHeader className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
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
        </div>

        {currentUserId && post.authorId === currentUserId && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisVertical className="cursor-pointer" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-fit" align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>More</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/posts/${post.id}/edit`}
                    className="cursor-pointer"
                  >
                    <SquarePen />
                    Edit post
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                  <Form action={deletePost} className="w-full">
                    <Input type="hidden" name="id" value={post.id} />
                    <Input
                      type="hidden"
                      name="redirect_to"
                      value={redirectTo}
                    />
                    <button
                      type="submit"
                      className="flex items-center gap-2 w-full py-[6px] px-2 cursor-pointer"
                    >
                      <Trash />
                      Delete
                    </button>
                  </Form>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>

      <Link href={`/posts/${post.id}?from=${redirectTo}`}>
        <CardContent>
          <p className="font-bold mb-2 line-clamp-3">{post.title}</p>
          <p className="text-sm text-gray-300 line-clamp-4">{post.content}</p>
        </CardContent>
      </Link>
    </Card>
  );
}

export { Post };
