import { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="text-xl min-h-screen  flex justify-center items-center ">
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
