"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserSideBar } from "../components/UserSidebar";

export default function RootDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { token, isLoading } = useUserAuth();

  useEffect(() => {
    if (!token) {
      router.push("/user/login");
    }
  }, [router, token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <SidebarProvider>
      <UserSideBar />
      <div>
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  );
}
