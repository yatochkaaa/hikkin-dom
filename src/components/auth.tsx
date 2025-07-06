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

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant="outline" type="submit" className="cursor-pointer">
        Sign Out
      </Button>
    </form>
  );
}

export { SignIn, SignOut };
