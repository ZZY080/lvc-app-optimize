export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  previewImageUrl: string;
  price: number;
  numVideos: number;
  topics: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
  };
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
    description: string | null;
  }[];
  instance: {
    id: string;
    progress: number;
    lastAccessedAt: string | null;
  } | null;
}

export interface CourseDetail {
  id: string;
  slug: string;
  title: string;
  description: string;
  previewImageUrl: string;
  previewVideoUrl: string | null;
  previewVideoHLSUrl: string | null;
  price: number;
  numVideos: number;
  videos: {
    id: string;
    title: string;
    description: string;
    duration: number;
    previewImageUrl: string;
    instance: {
      id: string;
      progress: number;
    } | null;
  }[];
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
  serviceCategories: {
    id: string;
    slug: string;
    name: string;
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
  memberProfiles: {
    id: string;
    slug: string;
    name: string;
    logoUrl: string | null;
    description: string | null;
  }[];
  instance: {
    id: string;
    progress: number;
    lastAccessedAt: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface CourseInstance {
  id: string;
  slug: string;
  title: string;
  description: string;
  previewImageUrl: string;
  previewVideoUrl: string | null;
  previewVideoHLSUrl: string | null;
  price: number | null;
  countries: {
    code: string;
    name: string;
  }[];
  serviceCategories: {
    id: string;
    slug: string;
    name: string;
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
  memberProfiles: {
    id: string;
    slug: string;
    name: string;
    logoUrl: string | null;
  }[];
  videos: {
    id: string;
    title: string;
    description: string;
    duration: number;
    previewImageUrl: string;
    videoUrl: string;
    videoHLSUrl: string;
    instance: {
      id: string;
      progress: number;
    };
  }[];
  instance: {
    id: string;
    progress: number;
    lastAccessedAt: string | null;
  };
}
