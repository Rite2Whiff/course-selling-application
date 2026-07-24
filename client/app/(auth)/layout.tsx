import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="text-xl min-h-screen  flex justify-center items-center ">
      {children}
    </div>
  );
}
