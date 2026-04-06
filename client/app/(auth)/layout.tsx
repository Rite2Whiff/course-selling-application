import { AuthForm } from "../components/AuthForm";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-w-3xl ">
      <div className="flex flex-col items-center gap-5">
        {children}
        <AuthForm />
      </div>
    </section>
  );
}
