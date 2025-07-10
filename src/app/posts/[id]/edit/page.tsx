import Link from "next/link";
import Form from "next/form";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { getPost, updatePost } from "@/actions/post";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function PostEdit({
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
    <Form action={updatePost} className="space-y-6">
      <TypographyH1 className="text-left">Edit Post</TypographyH1>

      <Separator />

      <Input type="hidden" name="id" value={post.id} />

      <div className="flex flex-col space-y-4">
        <div>
          <Label htmlFor="title" className="text-lg mb-2">
            Title
          </Label>

          <Input
            id="title"
            name="title"
            defaultValue={post.title}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="content" className="text-lg mb-2">
            Content
          </Label>

          <Textarea
            id="content"
            name="content"
            defaultValue={post.content || ""}
            rows={6}
            className="w-full rounded border px-3 py-2 resize-y"
          />
        </div>
      </div>

      <Separator />

      <div className="flex gap-2">
        <Link href={`/posts/${post.id}`}>
          <Button type="button" variant="secondary" className="cursor-pointer">
            Cancel
          </Button>
        </Link>

        <Button type="submit" className="cursor-pointer">
          Save
        </Button>
      </div>
    </Form>
  );
}
