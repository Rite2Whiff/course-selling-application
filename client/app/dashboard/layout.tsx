"use client";
import Navbar from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import UserSidebar from "@/components/userSidebar";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";
import Loading from "@/components/loading";
import CreatorSidebar from "@/components/creatorSidebar";
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
          {user?.isCreator ? <UserSidebar /> : <CreatorSidebar />}
          <div className="flex-1 p-5">
            {loading ? (
              <Loading />
            ) : (
              <h2 className="justify-self-start text-3xl">
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
