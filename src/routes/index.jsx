import { useUser } from "@/context/UserContext";
import { authRoutes } from "./auth/auth.route";
import { mainRoutes } from "./main/main.route";
import { Route, Routes } from "react-router";
import PageNotFound from "@/pages/NotFound/NotFoundView";
import Home from "@/pages/Home/HomeView";

export function AppRoutes() {
    const {user} = useUser()
    const routes = user ? mainRoutes : authRoutes
    
    return (
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<PageNotFound />} />
        {routes.map((item, index) => (
          <Route key={index} path={item.path} element={<item.component />} />
        ))}
      </Routes>
    )
}