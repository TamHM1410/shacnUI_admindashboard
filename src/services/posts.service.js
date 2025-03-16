import { http } from "@/lib/http";

export default class PostsService {
    static async getPosts() {
        return (await http.get("/api/posts/getAll"))?.data;
    }

    static async getPost(id) {
        return (await http.get(`/api/posts/findById/${id}`))?.data;
    }

    static async createPost(data) {
        return await http.post("/api/posts/add", data);
    }

    static async updatePost(id, data) {
        return await http.put(`/api/posts/update/${id}`, data);
    }

    static async deletePost(id) {
        return await http.delete(`/api/posts/delete/${id}`);
    }
}