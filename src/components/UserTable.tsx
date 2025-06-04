"use client";
import { useUsers } from "@/store/userStore";
import { useUserUIStore } from "@/store/useUserUIStore";
import { Edit2 } from "lucide-react";
import { useMemo, useState } from "react";

export default function UserList() {
  const { data: users, isLoading, error } = useUsers();
  const [search, setSearch] = useState("");
  const openEditModal = useUserUIStore((s) => s.openEditModal);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    const lowerSearch = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(lowerSearch) ||
        u.email.toLowerCase().includes(lowerSearch)
    );
  }, [search, users]);

  if (isLoading) return <p className="text-center py-8">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error.message}</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-green-800 font-mono mb-3 text-3xl font-bold">
        Users
      </h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full border px-3 py-2 rounded"
      />
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-green-800 border border-gray-300 p-2">Name</th>
            <th className="text-green-800 border border-gray-300 p-2">Email</th>
            <th className="text-green-800 border border-gray-300 p-2">Phone</th>
            <th className="text-green-800 border border-gray-300 p-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="hover:bg-amber-400">
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.phone}</td>
              <td className="border border-gray-300 p-2 text-center">
                <button
                  onClick={() => openEditModal(user.id)}
                  className="text-blue-600 flex hover:underline"
                >
                  Edit
                  <Edit2 size={16} className="mx-1" />
                </button>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
