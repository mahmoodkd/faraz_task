"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUpdateUser, useUsers } from "@/app/store/userStore";
import { useUserUIStore } from "@/app/store/useUserUIStore";

export type FormData = {
  name: string;
  email: string;
  phone?: string;
};

const schema: yup.Schema<FormData> = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().optional(),
  })
  .required();

export default function EditUserModal() {
  const { selectedUserId, closeEditModal } = useUserUIStore();
  const { data: users } = useUsers();
  const updateUserMutation = useUpdateUser();

  const user = users?.find((u) => u.id === selectedUserId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    // @ts-ignore
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!user) return;
    updateUserMutation.mutate({ ...user, ...data });
    closeEditModal();
  };

  if (!selectedUserId || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-950">Edit User</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name")}
              className="w-full border rounded text-gray-950 px-3 py-2"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              {...register("email")}
              className="w-full border rounded text-gray-950 px-3 py-2"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              {...register("phone")}
              className="w-full border rounded text-gray-950 px-3 py-2"
              placeholder="Phone"
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={closeEditModal}
              className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
