import { ModeToggle } from "@/components/ui/modeToggle";
import { SignIn, SignOut } from "@/components/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/actions/user";
import { TypographyP } from "@/components/ui/typography";

async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="w-full py-6">
      <div className="mx-auto max-w-[1920px] px-20">
        <ModeToggle />
        <div className="ml-auto w-fit">
          {!user ? (
            <SignIn />
          ) : (
            <div className="flex items-center gap-12">
              <SignOut />
              <div className="flex items-center gap-4">
                <TypographyP className="font-semibold">{user.name}</TypographyP>
                <Avatar>
                  <AvatarImage src={user.image || ""} alt="avatar" />
                  <AvatarFallback>
                    {user.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export { Header };
