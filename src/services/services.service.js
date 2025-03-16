import { http } from "@/lib/http";

export default class ServicesService {
  static async getServices() {
    return (await http.get("/api/services/getAll"))?.data;
  }

  static async getService(id) {  
    return (await http.get(`/api/services/findById/${id}`))?.data;
  }

  static async createService(data) {
    return await http.post("/api/services/add", data);
  }

  static async updateService(id, data) {
    return await http.put(`/api/services/update/${id}`, data);
  }

  static async deleteService(id) {
    return await http.delete(`/api/services/delete/${id}`);
  }
}