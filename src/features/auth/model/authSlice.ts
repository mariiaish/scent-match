import { create } from 'zustand';
import { signIn, signUp, signOut } from '../api/authApi';

interface AuthState {
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(() => ({
  signIn,
  signUp,
  signOut,
}));
