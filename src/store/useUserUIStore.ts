import { create } from "zustand";

interface UserUIState {
  selectedUserId: number | null;
  isEditModalOpen: boolean;
  openEditModal: (id: number) => void;
  closeEditModal: () => void;
}

export const useUserUIStore = create<UserUIState>((set) => ({
  selectedUserId: null,
  isEditModalOpen: false,
  openEditModal: (id) => set({ selectedUserId: id, isEditModalOpen: true }),
  closeEditModal: () => set({ selectedUserId: null, isEditModalOpen: false }),
}));
