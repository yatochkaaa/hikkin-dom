import { PostWithAuthor } from "@/types";
import Link from "next/link";

interface Props {
  post: PostWithAuthor;
}

export default function HomePost({ post }: Props) {
  return (
    <li className="flex justify-between items-center gap-2">
      <Link href={`/posts/${post.id}`} className="flex flex-col gap-1">
        <span className="font-semibold line-clamp-2 wrap-anywhere">
          {post.title}
        </span>
        <span className="text-sm text-gray-600">
          by {post.author.name} •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </Link>
    </li>
  );
}
