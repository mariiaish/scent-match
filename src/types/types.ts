export type Language = 'ru' | 'en';

export interface Perfume {
  id: number;
  perfume: string;
  brand: string;
  year?: string;
  top: string[];
  middle: string[];
  base: string[];
  reason?: string;
  mainaccord1?: string[];
  mainaccord2?: string[];
  mainaccord3?: string[];
  mainaccord4?: string[];
  mainaccord5?: string[];
}

export interface PerfumeState {
  allPerfumes: Perfume[];
  myShelf: Perfume[];
  recommendations: Perfume[];
  isLoading?: boolean;

  addToShelf: (perfume: Perfume) => void;
  removeFromShelf: (id: number) => void;
  clearShelf: () => void;
  fetchAIRecs: () => void;

  lang: Language;
  setLanguage: (lang: Language) => void;
}
