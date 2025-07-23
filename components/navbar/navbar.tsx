import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

const Navbar = () => {
  return (
    <div className="min-h-20">
      <nav className="h-16 border-b">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Logo />
          <NavMenu className="hidden md:block" />
          <div className="flex items-center gap-3">
            <Button variant="outline" className="hidden sm:inline-flex">
              Prijavi se
            </Button>
            <Button>Registruj se</Button>
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
