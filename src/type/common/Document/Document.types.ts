export enum ProductVariantType {
  DOCUMENT = "document",
  DYNAMIC_FORM = "dynamic-form",
  MANUAL_PRODUCT = "manual-product",
  LICENSE_PRODUCT = "license-product",
}
export interface Document {
  id: string;
  numDocuments: number;
  instance: {
    id: string;
    lastAccessedAt: string | null;
  } | null;
  product: {
    id: string;
    slug: string;
    title: string;
    description: string;
    price: number;
    memberProfiles: {
      id: string;
      slug: string;
      name: string;
      logoUrl: string | null;
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
  };
}

export interface DocumentDetail {
  id: string;
  files: {
    id: string;
    title: string;
    createdAt: string;
  }[];
  product: {
    id: string;
    slug: string;
    title: string;
    description: string;
    detail: string | null;
    price: number;
    countries: {
      code: string;
      name: string;
    }[];
    topics: {
      id: string;
      title: string;
      slug: string;
      description: string | null;
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
    memberProfiles: {
      id: string;
      memberId: string | null;
      slug: string;
      name: string;
      description: string;
      logoUrl: string | null;
    }[];
    variantType: ProductVariantType;
    variantId: string;
    createdAt: string;
    updatedAt: string;
  };
  instance: {
    id: string;
    lastAccessedAt: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentInstance {
  id: string;
  documentId: string;
  product: {
    id: string;
    slug: string;
    title: string;
    description: string;
    detail: string | null;
    price: number;
    countries: {
      code: string;
      name: string;
    }[];
    topics: {
      id: string;
      title: string;
      slug: string;
      description: string | null;
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
    memberProfiles: {
      id: string;
      slug: string;
      name: string;
      logoUrl: string | null;
    }[];
    variantType: ProductVariantType;
    variantId: string;
  };
  files: {
    id: string;
    title: string;
    fileUrl: string;
    createdAt: string;
    updatedAt: string;
  }[];
  lastAccessedAt: string | null;
}
