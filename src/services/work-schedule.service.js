import { http } from "@/lib/http";

export default class WorkScheduleService {
    static async getWorkSchedules() {
        return (await http.get("/api/workSchedule/findAll"))?.data;
    }

    static async getWorkSchedule(id) {
        return (await http.get(`/api/workSchedule/findById/${id}`))?.data;
    }

    static async createWorkSchedule(id, data) {
        return await http.post(`/api/workSchedule/add?expertId=${id}`, data);
    }

    static async updateWorkSchedule(id, data) {
        return await http.put(`/api/workSchedule/update/${id}`, data);
    }

    static async deleteWorkSchedule(id) {
        return await http.delete(`/api/workSchedule/delete/${id}`);
    }
}