import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Book,
  Contact,
  ShoppingCart,
  RotateCcwIcon,
  Bookmark,
} from "lucide-react";
import Link from "next/link";

export default function Usersidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="!gap-5">
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/dashboard/courses" />}
                  className="text-xl "
                >
                  <Book className="!size-6" />
                  <span>Courses</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/dashboard/purchases" />}
                  className="text-xl"
                >
                  <ShoppingCart className="!size-6" />
                  <span>Purchases</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/dashboard/purchases" />}
                  className="text-xl"
                >
                  <Bookmark className="!size-6" />
                  <span>Bookmarks</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/dashboard/purchases" />}
                  className="text-xl"
                >
                  <RotateCcwIcon className="!size-6" />
                  <span>Watch History</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/app/dashboard/contact" />}
                  className="text-xl"
                >
                  <Contact className="!size-6" />
                  <span>Contact</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
