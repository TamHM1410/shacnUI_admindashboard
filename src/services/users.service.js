import { http } from "@/lib/http";

export default class UsersService {
  static async getUsers() {
    return await http.get("/api/users/findAll");
  }
}
