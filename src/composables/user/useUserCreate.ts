import { useMutation } from "@tanstack/vue-query";
import API from "../../services/api";
import Cookies from "js-cookie";

export interface UserRequest {
  name: string;
  username: string;
  email: string;
  password?: string;
}

export const useUserCreate = () => {
  return useMutation({
    mutationFn: async (data: UserRequest) => {
      const token = Cookies.get("token");
      const response = await API.post("/api/users", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
};
