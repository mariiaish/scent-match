export interface Perfume {
  id: number;
  url: string;
  Perfume: string;
  Brand: string;
  Country?: string;
  Gender?: string;
  'Rating Value'?: string;
  'Rating Count'?: string;
  Year?: string;
  Top: string[];
  Middle: string[];
  Base: string[];
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
}
