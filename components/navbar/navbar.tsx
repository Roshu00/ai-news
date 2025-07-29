import { signOutUser } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Badge } from "../ui/badge";
import { UserAvatar } from "../user-avatar";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { LogoutButton } from "./logout-button";
import { Role } from "@prisma/client";
import { NavUser } from "./nav-user";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();
  return (
    <div className="min-h-20">
      <nav className="h-16 border-b">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Logo />
          <NavMenu className="hidden md:block" />
          {session?.user.role === Role.WRITER && (
            <Button asChild>
              <Link href="/creator/new-article">Novi članak</Link>
            </Button>
          )}
          {!session ? (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="hidden sm:inline-flex"
                asChild
              >
                <Link href="/sign-in">Prijavi se</Link>
              </Button>
              <Button>Registruj se</Button>
              <div className="md:hidden">
                <NavigationSheet />
              </div>
            </div>
          ) : (
            <NavUser user={session.user} />
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
