import { supabase } from '../../../shared/lib/supabase';

export const signIn = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return { error: error as Error | null };
};

export const signUp = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({ email, password });
  return { error: error as Error | null };
};

export const signOut = async () => {
  await supabase.auth.signOut();
};
