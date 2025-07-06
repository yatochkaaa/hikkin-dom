import Form from "next/form";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";

export default function NewPost() {
  async function createPost(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title || title.trim().length === 0) {
      throw new Error("Title is required.");
    }

    await prisma.post.create({
      data: {
        title,
        content,
        authorId: "cmcs4tnkg00008w0vyw41yl27",
      },
    });

    await prisma.user.deleteMany({
      where: {
        email: { in: ["test@example.com", "alice@prisma.io", "bob@prisma.io"] },
      },
    });

    revalidatePath("/");
    redirect("/");
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <TypographyH1 className="mb-6">Create New Post</TypographyH1>

      <Form action={createPost} className="space-y-6">
        <div>
          <Label htmlFor="title" className="text-lg mb-2">
            Title
          </Label>

          <Input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your post title"
          />
        </div>
        <div>
          <Label htmlFor="content" className="text-lg mb-2">
            Content
          </Label>

          <Textarea
            id="content"
            name="content"
            placeholder="Write your post content here..."
            rows={6}
          />
        </div>
        <Button type="submit" className="w-full cursor-pointer">
          Create Post
        </Button>
      </Form>
    </div>
  );
}
