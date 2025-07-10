import { getPost } from "@/actions/post";
import { getCurrentUser } from "@/actions/user";
import { Post } from "@/components/shared/post";
import { TypographyH1 } from "@/components/ui/typography";
import { notFound } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ from?: string }>;
}) {
  const { id } = await params;
  const from = (await searchParams)?.from ?? "/";
  const user = await getCurrentUser();
  const post = await getPost(Number(id));

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <TypographyH1 className="text-left">Post Details Page</TypographyH1>

      <Post post={post} currentUserId={user?.id} redirectTo={from} />
    </article>
  );
}
