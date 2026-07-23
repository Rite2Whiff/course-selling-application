import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { GraduationCap } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className=" p-3 flex items-center justify-between border-b-2 border-black">
      <div>
        <Link href="#" className="block flex gap-2">
          <GraduationCap />
          <span>Master ji</span>
        </Link>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              render={<Link href="/docs" />}
              className={navigationMenuTriggerStyle()}
            >
              Home
            </NavigationMenuLink>
            <NavigationMenuLink
              render={<Link href="/docs" />}
              className={navigationMenuTriggerStyle()}
            >
              Courses
            </NavigationMenuLink>
            <NavigationMenuLink
              render={<Link href="/docs" />}
              className={navigationMenuTriggerStyle()}
            >
              Guide
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-3">
        <Button variant={"outline"}>Sign up</Button>
        <Button>Login</Button>
      </div>
    </header>
  );
}
