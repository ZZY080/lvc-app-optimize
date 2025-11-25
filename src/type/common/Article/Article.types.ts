export interface Article {
  id: string;
  title: string;
  description: string;
  slug: string;
  author: string;
  previewImageUrl: string;
  publishedAt: string;
}

export interface ArticleDetail {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  previewImageUrl: string;
  publishedAt: string;
  countries: {
    code: string;
    name: string;
  }[];
  services: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    category: {
      id: string;
      slug: string;
      name: string;
    };
  }[];
  serviceCategories: {
    id: string;
    slug: string;
    name: string;
    description: string | null;
  }[];
  topics: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
  }[];
  memberProfiles: {
    id: string;
    slug: string;
    name: string;
    logoUrl: string | null;
  }[];
}
