import LoginPage from "@/pages/Auth/Login/Login";
import RegisterView from "@/pages/Auth/Register/Register";

export const authRoutes = [
  {
    path: "/auth/login",
    component: LoginPage,
  },
  {
    path: "/auth/register",
    component: RegisterView,
  },
];
