import { useQuery } from "@tanstack/vue-query";
import { User } from "./useUsers";
import API from "../../services/api";
import Cookies from "js-cookie";

export const useUserById = (id: number) => {
  return useQuery<User, Error>({
    queryKey: ["user", id],
    queryFn: async () => {
      const token = Cookies.get("token");

      const response = await API.get(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data as User;
    },
  });
};
