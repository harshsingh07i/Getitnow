import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'vendor' | 'customer' | null;

interface AuthStore {
  phone: string;
  isLoggedIn: boolean;
  isVerified: boolean;
  role: UserRole;
  login: (phone: string, role: UserRole, isVerified?: boolean) => void;
  logout: () => void;
  verifyPhone: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      phone: '', 
      isLoggedIn: false,
      isVerified: false,
      role: null,
      login: (phone, role, isVerified = true) => set({ phone, isLoggedIn: true, role, isVerified }),
      logout: () => set({ phone: '', isLoggedIn: false, role: null, isVerified: false }),
      verifyPhone: () => set({ isVerified: true }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
