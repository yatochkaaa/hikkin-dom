import Form from "next/form";
import Link from "next/link";
import { deletePost, getPost } from "@/actions/post";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { Edit, Trash } from "lucide-react";
import { notFound } from "next/navigation";
import { Input } from "@/components/ui/input";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(Number(id));

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <TypographyH1 className="text-left">{post.title}</TypographyH1>
      <div className="text-muted-foreground text-sm">
        by {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
      </div>

      <Separator />

      <div className="prose prose-neutral dark:prose-invert">
        <p>{post.content}</p>
      </div>

      <Separator />

      <div className="flex gap-2">
        <Link href={`/posts/${post.id}/edit`}>
          <Button
            variant="secondary"
            size="icon"
            className="size-8 cursor-pointer"
          >
            <Edit />
          </Button>
        </Link>

        <Form action={deletePost}>
          <Input type="hidden" name="id" value={post.id} />
          <Button
            variant="destructive"
            size="icon"
            className="size-8 cursor-pointer"
          >
            <Trash />
          </Button>
        </Form>
      </div>
    </article>
  );
}
