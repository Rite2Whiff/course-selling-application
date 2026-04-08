import { AdminAuthProvider } from "../context/AdminAuthContext";
import { UserAuthProvider } from "../context/UserAuthContext";
import { AuthForm } from "../components/AuthForm";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-w-3xl ">
      <div className="flex flex-col items-center gap-5">
        <AdminAuthProvider>
          <UserAuthProvider>
            {children}
            <AuthForm />
          </UserAuthProvider>
        </AdminAuthProvider>
      </div>
    </section>
  );
}
