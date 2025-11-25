export enum ServiceOppStatus {
  PUBLISHED = "published",
  PENDING = "pending",
  UNPUBLISHED = "unpublished",
  DENIED = "denied",
}
export enum ServiceOppPriority {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}
export interface ServiceOpportunity {
  id: string;
  status: ServiceOppStatus;
  priority: ServiceOppPriority;
  title: string;
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
  industries: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
  }[];
  contactEmail: string;
  org: {
    id: string;
    name: string;
  } | null;
  member: {
    id: string;
    name: string;
  } | null;
  createdBy: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ServiceOpportunityDetail {
  id: string;
  status: ServiceOppStatus;
  priority: ServiceOppPriority;
  title: string;
  description: string | null;
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
  industries: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
  }[];
  files: {
    id: string;
    serviceOppId: string;
    title: string;
    fileType: string | null;
    fileSize: number | null;
    fileUrl: string;
    createdAt: string;
  }[];
  contactEmail: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
  };
  org: {
    id: string;
    name: string;
  } | null;
  member: {
    id: string;
    name: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  roomId: string;
}

export enum InvestmentOppStatus {
  PUBLISHED = "published",
  PENDING = "pending",
  UNPUBLISHED = "unpublished",
  DENIED = "denied",
}

export interface InvestmentOpportunity {
  id: string;
  status: InvestmentOppStatus;
  title: string;
  countries: {
    code: string;
    name: string;
  }[];
  industries: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
  }[];
  contactEmail: string;
  member: {
    id: string;
    name: string;
  } | null;
  createdBy: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
  };
  createdAt: string;
  updatedAt: string;
}
export interface InvestmentOpportunityDetail {
  id: string;
  status: InvestmentOppStatus;
  title: string;
  description: string;
  countries: {
    code: string;
    name: string;
  }[];
  industries: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
  }[];
  files: {
    id: string;
    investmentOppId: string;
    title: string;
    fileUrl: string;
    createdAt: string;
    updatedAt: string;
  }[];
  contactEmail: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
  };
  member: {
    id: string;
    name: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export type Identifier = string | number | undefined;

export enum FeeEarnersRange {
  ZERO_TO_FIVE = "0-5",
  SIX_TO_TEN = "6-10",
  ELEVEN_TO_TWENTY = "11-20",
  TWENTY_ONE_TO_FIFTY = "21-50",
  FIFTY_ONE_TO_HUNDRED = "51-100",
  OVER_HUNDRED = "100+",
}
export enum RevenueRange {
  UNDER_HALF = "0-500k",
  HALF_TO_ONE = "500k-1m",
  ONE_TO_TWO = "1m-2m",
  TWO_TO_FIVE = "2m-5m",
  FIVE_TO_TEN = "5m-10m",
  OVER_TEN = "10m+",
}
export enum BranchesRange {
  ZERO = "0",
  UNDER_FIVE = "1-5",
  FIVE_TO_TEN = "5-10",
  ABOVE_TEN = "10+",
}
export interface RegisterMemberForm<T extends Identifier> {
  name: string;
  description: string;
  businessDescription: string;
  managerName: string;
  feeEarnersRange: FeeEarnersRange;
  revenueRange: RevenueRange;
  branchesRange: BranchesRange;
  numPartners: number;
  yearFounded: number;
  logoUrl: string;
  businessLicenseUrl?: string;
  spRequestFormUrl?: string;
  countryCodes: string[];
  languageCodes: string[];
  serviceIds?: string[];
  serviceCategoryIds: string[];
  address?: {
    countryCode: string;
    region: string;
    zipcode?: string;
    addressOne: string;
    addressTwo?: string;
    email: string;
    phone?: string;
    fax?: string;
  };
}
