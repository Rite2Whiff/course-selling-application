import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserSideBar } from "./UserSidebar";

export default function UserDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <UserSideBar />
      <SidebarTrigger />
      {children}
    </SidebarProvider>
  );
}
