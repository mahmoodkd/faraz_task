"use client";

import UserList from "@/components/UserTable";
import { useUserUIStore } from "../store/useUserUIStore";
import EditUserModal from "@/components/EditModal";

export default function UsersPage() {
  const isEditModalOpen = useUserUIStore((state) => state.isEditModalOpen);

  return (
    <>
      <UserList />
      {isEditModalOpen && <EditUserModal />}
    </>
  );
}
