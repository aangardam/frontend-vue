import { useMutation } from "@tanstack/vue-query";
import API from "../../services/api";
import Cookies from "js-cookie";

export const useUserDelete = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const token = Cookies.get("token");
      const response = await API.delete(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  });
};
