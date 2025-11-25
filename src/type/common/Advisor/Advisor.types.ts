export interface Advisor {
  id: string;
  memberId: string | null;
  slug: string;
  name: string;
  description: string;
  logoUrl: string | null;
  countries: {
    code: string;
    name: string;
  }[];
  languages: {
    code: string;
    name: string;
  }[];
  serviceCategories: {
    id: string;
    slug: string;
    name: string;
    description: string | null;
  }[];
}

export interface AdvisorDetail {
  id: string;
  slug: string;
  email: string | null;
  name: string;
  description: string;
  logoUrl: string | null;
  countries: {
    code: string;
    name: string;
  }[];
  languages: {
    code: string;
    name: string;
  }[];
  serviceCategories: {
    id: string;
    slug: string;
    name: string;
    description: string | null;
  }[];
  createdAt: string;
}
