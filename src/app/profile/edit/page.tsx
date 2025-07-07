import Form from "next/form";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getCurrentUser, updateCurrentUser } from "@/actions/user";
import { Label } from "@/components/ui/label";
import { TypographyH1 } from "@/components/ui/typography";

export default async function ProfileEdit() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <TypographyH1 className="mb-6">Edit profile</TypographyH1>

      <Form action={updateCurrentUser} className="space-y-6">
        <div>
          <Label htmlFor="name" className="text-lg mb-2">
            Name
          </Label>

          <Input
            type="text"
            id="name"
            name="name"
            defaultValue={user.name || ""}
          />
        </div>

        <div>
          <Label htmlFor="image" className="text-lg mb-2">
            Photo URL
          </Label>

          <Input
            type="text"
            id="image"
            name="image"
            defaultValue={user.image || ""}
          />
        </div>

        <Button type="submit" className="w-full cursor-pointer">
          Save
        </Button>
      </Form>
    </div>
  );
}
