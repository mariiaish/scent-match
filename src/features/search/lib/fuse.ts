import { Perfume } from '@/shared/types/types';
import Fuse from 'fuse.js';

export const createFuseSearch = (perfumes: Perfume[]) => {
  return new Fuse(perfumes, {
    keys: ['perfume', 'brand'],
    threshold: 0.3,
  });
};
