/** Resolve a /public asset so it works at any deploy base path. */
export const asset = (p: string) => {
  if (!p || /^(https?:|mailto:|data:|#)/.test(p)) return p;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${p.startsWith('/') ? p : `/${p}`}`;
};
