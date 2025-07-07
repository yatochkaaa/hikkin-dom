import { redirect } from "next/navigation";
import { getUserPosts } from "@/actions/post";
import { getCurrentUser } from "@/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Edit } from "lucide-react";
import Link from "next/link";

export default async function Profile() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const posts = await getUserPosts();

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
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">📝 Мои посты</h2>
        <span className="text-sm text-muted-foreground">
          Всего: {posts.length}
        </span>
      </div>

      <Separator />

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                {post.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <CalendarDays className="h-4 w-4" />
                <span>
                  {/* Предполагаем наличие post.createdAt */}
                  {new Date(post.createdAt ?? Date.now()).toLocaleDateString(
                    "ru-RU",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </span>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              {post.content}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
