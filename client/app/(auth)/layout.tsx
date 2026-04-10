import { AuthForm } from "../components/AuthForm";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-w-full flex min-h-full justify-center items-center">
      <div className="flex min-w-3xl flex-col items-center gap-5">
        {children}
        <AuthForm />
      </div>
    </section>
  );
}
