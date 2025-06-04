import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../app/types";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export function useUsers() {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error receiving data!!");
      return res.json();
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedUser: User) => {
      await new Promise((r) => setTimeout(r, 500));
      return updatedUser;
    },
    onSuccess: (data: User) => {
      queryClient.setQueryData<User[]>(["users"], (oldUsers) =>
        oldUsers?.map((u) => (u.id === data.id ? data : u))
      );
    },
  });
}
