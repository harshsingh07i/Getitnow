import { create } from 'zustand';

export type UserRole = 'admin' | 'vendor' | 'customer' | null;

interface AuthStore {
  phone: string;
  isLoggedIn: boolean;
  role: UserRole;
  login: (phone: string, role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  phone: '', 
  isLoggedIn: false,
  role: null,
  login: (phone, role) => set({ phone, isLoggedIn: true, role }),
  logout: () => set({ phone: '', isLoggedIn: false, role: null }),
}));
