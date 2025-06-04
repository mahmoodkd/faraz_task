import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      return res.data;
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedUser: User) => {
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
        updatedUser
      );
      return res.data;
    },
    onSuccess: (data: User) => {
      queryClient.setQueryData<User[]>(["users"], (oldUsers = []) =>
        oldUsers.map((u) => (u.id === data.id ? data : u))
      );
    },
  });
};
