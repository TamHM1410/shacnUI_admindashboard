import { http } from "@/lib/http";

export default class BlogsService {
  static async getBlogs() {
    return (await http.get("/api/v1/blogs"))?.data;
  }

  static async getBlog(id) {
    return (await http.get(`/api/v1/blogs/${id}`))?.data;
  }

  static async createBlog(data) {
    return await http.post("/api/v1/createOrUpdate", data);
  }

  static async updateBlog(data) {
    return await http.post(`/api/v1/createOrUpdate`, data);
  }

  static async deleteBlog(id) {
    return await http.delete(`/api/v1/deleteBlog?blogId=${id}`);
  }
}