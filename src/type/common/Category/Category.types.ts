export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: {
    id: string;
    slug: string;
    name: string;
  };
}
