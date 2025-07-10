import Link from "next/link";
import { ModeToggle } from "@/components/ui/modeToggle";
import { SignIn, SignOut } from "@/components/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="w-full py-8">
      <div className="flex justify-between align-center mx-auto max-w-[1920px] px-20">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-10 w-10 cursor-pointer">
                  <AvatarImage src={user.image || ""} alt="avatar" />
                  <AvatarFallback delayMs={600}>
                    {user?.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-fit" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <User />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>System Settings</DropdownMenuLabel>
                  <DropdownMenuItem className="p-0">
                    <ModeToggle />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-0 mt-2 mb-1">
                    <SignOut className="w-full" />
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}

export { Header };
