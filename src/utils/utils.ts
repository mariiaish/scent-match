export const formatPerfumeData = (p: any) => ({
  ...p,
  perfume: p.perfume
    ? p.perfume
        .split(/[-_ ]+/)
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    : '',
  brand: p.brand
    ? p.brand
        .split(/[-_ ]+/)
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    : '',
  top: p.top?.map((n: string) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()) || [],
  middle: p.middle?.map((n: string) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()) || [],
  base: p.base?.map((n: string) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()) || [],
});
