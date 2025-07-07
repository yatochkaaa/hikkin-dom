import Link from "next/link";
import { ModeToggle } from "@/components/ui/modeToggle";
import { SignIn, SignOut } from "@/components/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { TypographyP } from "@/components/ui/typography";

async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="w-full py-8">
      <div className="flex justify-between align-center mx-auto max-w-[1920px] px-20">
        <ModeToggle />

        <nav>
          <Link href="/">
            <Button variant="link" className="text-lg cursor-pointer">
              Home
            </Button>
          </Link>
        </nav>

        <div>
          {!user ? (
            <SignIn />
          ) : (
            <div className="flex items-center gap-8">
              <Link href="/profile">
                <Button
                  variant="link"
                  className="cursor-pointer flex items-center gap-4 p-0"
                >
                  <TypographyP className="font-semibold text-base">
                    {user.name}
                  </TypographyP>
                  <Avatar>
                    <AvatarImage src={user.image || ""} alt="avatar" />
                    <AvatarFallback>
                      {user.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </Link>
              <SignOut />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export { Header };
