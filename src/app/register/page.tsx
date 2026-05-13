import PageLoadWrapper from "@/components/animations/PageLoadWrapper";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <PageLoadWrapper>
      <main className="min-h-screen flex items-center justify-center px-6 py-12">
        <RegisterForm />
      </main>
    </PageLoadWrapper>
  );
}
