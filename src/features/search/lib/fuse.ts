import Fuse from 'fuse.js';
import { Perfume } from '../../../shared/types/types';

export const createFuseSearch = (perfumes: Perfume[]) => {
  return new Fuse(perfumes, {
    keys: ['perfume', 'brand'],
    threshold: 0.3,
  });
};
