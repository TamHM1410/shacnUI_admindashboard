import { http } from "@/lib/http";

export default class ExpertsService {
    static async getExperts() {
        return (await http.get("/api/experts/findAll"))?.data;
    }

    static async getExpert(id) {
        return (await http.get(`/api/experts/findById/${id}`))?.data;
    }

    static async createExpert(data) {
        return await http.post("/api/experts/add", data);
    }

    static async updateExpert(id, data) {
        return await http.put(`/api/experts/update/${id}`, data);
    }

    static async deleteExpert(id) {
        return await http.delete(`/api/experts/delete/${id}`);
    }
}