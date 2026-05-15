import { create } from 'zustand';
import { signIn, signUp } from '../api/authApi';

interface AuthState {
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
}

export const useAuthStore = create<AuthState>(() => ({
  signIn,
  signUp,
}));
