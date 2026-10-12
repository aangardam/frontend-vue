import { useMutation } from "@tanstack/vue-query";
import API from "../../services/api";
import { UserRequest } from "./useUserCreate";
import Cookies from "js-cookie";

export const useUserUpdate = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UserRequest }) => {
      const token = Cookies.get("token");

      const response = await API.put(`/api/users/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  });
};
