"use client";
import Navbar from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";
import Loading from "@/components/loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const { loading } = useLoading();
  return (
    <main className="min-h-screen flex flex-col">
      <div>
        <Navbar />
      </div>
      <div className="flex flex-1">
        <SidebarProvider>
          <AppSidebar />
          <div className="flex-1 p-5">
            {loading ? (
              <Loading />
            ) : (
              <h2 className="justify-self-end">
                Welcome Back, {user?.username}
              </h2>
            )}
            {children}
          </div>
        </SidebarProvider>
      </div>
    </main>
  );
}
