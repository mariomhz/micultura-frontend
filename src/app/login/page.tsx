import PageLoadWrapper from "@/components/animations/PageLoadWrapper";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <PageLoadWrapper>
      <main className="min-h-screen flex items-center justify-center px-6 py-12">
        <LoginForm />
      </main>
    </PageLoadWrapper>
  );
}
