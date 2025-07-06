import { auth } from "@/auth";
import { ModeToggle } from "@/components/ui/modeToggle";
import { SignIn, SignOut } from "@/components/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function Header() {
  const session = await auth();

  return (
    <header className="w-full py-6">
      <div className="mx-auto max-w-[1920px] px-20">
        <ModeToggle />
        <div className="ml-auto w-fit">
          {!session?.user ? (
            <SignIn />
          ) : (
            <div className="flex items-center gap-2">
              <SignOut />
              <Avatar>
                <AvatarImage src={session.user.image || ""} alt="avatar" />
                <AvatarFallback>{session.user.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export { Header };
