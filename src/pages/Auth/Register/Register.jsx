import { AuthLayout } from "@/layout/AuthLayout";
import RegisterForm from "@/sections/auth/register-form";
export default function RegisterView() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
