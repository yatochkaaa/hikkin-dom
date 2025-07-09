import { signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button variant="outline" type="submit" className="cursor-pointer">
        Signin with Google
      </Button>
    </form>
  );
}

function SignOut({ className, ...props }: React.ComponentProps<"form">) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className={className}
      {...props}
    >
      <Button variant="outline" type="submit" className="w-full cursor-pointer">
        Log out
      </Button>
    </form>
  );
}

export { SignIn, SignOut };
