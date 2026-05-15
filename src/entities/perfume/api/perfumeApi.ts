import { supabase } from '../../../shared/lib/supabase';
import { Perfume } from '../../../shared/types/types';
import { formatPerfumeData } from '../lib/formatPerfumeData';

export const fetchAllPerfumes = async (): Promise<Perfume[]> => {
  const { data, error } = await supabase.from('perfumes').select('*');

  if (error) {
    console.error('Ошибка загрузки парфюмов:', error);
    return [];
  }

  return data.map(formatPerfumeData);
};

export const fetchUserShelf = async (userId: string): Promise<Perfume[]> => {
  const { data, error } = await supabase
    .from('user_perfumes')
    .select('perfume_id, perfumes (*)')
    .eq('user_id', userId);

  if (error) {
    console.error('Ошибка загрузки полки:', error.message);
    return [];
  }

  return data.map((item: any) => formatPerfumeData(item.perfumes));
};

export const addToShelfApi = async (
  userId: string,
  perfumeId: number,
): Promise<{ success: boolean; error?: string }> => {
  const { error } = await supabase
    .from('user_perfumes')
    .insert({ user_id: userId, perfume_id: perfumeId });

  if (error) {
    console.error('Ошибка сохранения:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
};

export const removeFromShelfApi = async (
  userId: string,
  perfumeId: number,
): Promise<{ success: boolean; error?: string }> => {
  const { error } = await supabase
    .from('user_perfumes')
    .delete()
    .eq('user_id', userId)
    .eq('perfume_id', perfumeId);

  if (error) {
    console.error('Ошибка удаления:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
};
