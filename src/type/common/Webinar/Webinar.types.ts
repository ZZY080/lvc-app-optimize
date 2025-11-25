export interface InsightWebinar {
  id: string;
  slug: string;
  title: string;
  description: string;
  previewImageUrl: string;
  scheduledAt: string | null;
  duration: number | null;
  recordingAvailable: boolean;
}

export interface Webinar {
  id: string;
  slug: string;
  title: string;
  description: string;
  previewImageUrl: string;
  scheduledAt: string | null;
  duration: number | null;
  recordingAvailable: boolean;
  memberProfiles: {
    id: string;
    memberId: string | null;
    slug: string;
    name: string;
    description: string;
    logoUrl: string | null;
  }[];
}

export interface WebinarDetail {
  id: string;
  slug: string;
  title: string;
  description: string;
  previewImageUrl: string;
  videoUrl: string | null;
  videoHLSUrl: string | null;
  registrationUrl: string | null;
  scheduledAt: string | null;
  duration: number | null;
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
}
