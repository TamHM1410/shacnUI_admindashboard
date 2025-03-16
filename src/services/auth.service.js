import { http } from "@/lib/http";

export default class AuthService {
    static async login(data) {
        return await http.post("/api/users/login", data);
    }
  
    static async register(data) {
        return await http.post("/api/users/register", data);
    }
  
    static async logout() {
        return await http.post("/api/auth/logout");
    }
  
    static async me() {
        return (await http.get("/api/auth/me"))?.data;
    }
}