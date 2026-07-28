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
import { Book, GraduationCap, Plus, SquarePen, Trash } from "lucide-react";
import Link from "next/link";

export default function CreatorSidebar() {
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
                  <GraduationCap className="!size-6" />
                  <span>My Courses</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/app/dashboard/contact" />}
                  className="text-xl"
                >
                  <Plus className="!size-6" />
                  <span>Add Course</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/app/dashboard/contact" />}
                  className="text-xl"
                >
                  <SquarePen className="!size-6" />
                  <span>Edit Course</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/app/dashboard/contact" />}
                  className="text-xl"
                >
                  <Trash className="!size-6" />
                  <span>Delete Course</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
