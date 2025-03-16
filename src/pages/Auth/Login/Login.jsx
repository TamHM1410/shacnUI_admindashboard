import { useUser } from "@/context/UserContext";
import { AuthLayout } from "@/layout/AuthLayout";
import LoginForm from "@/sections/auth/login-form";
import { useEffect } from "react";
import {  useNavigate } from "react-router";

export default function LoginPage() {
    const navigate = useNavigate();
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [navigate, user]);
    
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
}