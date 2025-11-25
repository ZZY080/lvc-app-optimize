export enum MemberRole {
  ADMIN = "admin",
  MEMBER = "member",
}
export enum OrgRole {
  ADMIN = "admin",
  MEMBER = "member",
}
export enum AdminResourceType {
  STORAGE = "LVC.Storage",
  DISPLAY = "LVC.Display",
  ORDER = "LVC.Order",
  COURSE = "LVC.Course",
  PRODUCT = "LVC.Product",
  PRINCIPAL = "LVC.Principal",
  AUTH = "LVC.Auth",
  DYNAMIC_FORM = "LVC.DynamicForm",
  MEMBER = "LVC.Member",
  ORG = "LVC.Org",
  SERVICE_OPP = "LVC.ServiceOpp",
  INVESTMENT_OPP = "LVC.InvestmentOpp",
  CREDIT = "LVC.Credit",
}
export interface AdminAccessDto {
  id: string;
  userId: string;
  resourceType: AdminResourceType;
  accessLevel: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  publicEmail: string | null;
  name: string;
  avatarUrl: string | null;
  bio: string | null;
  location: string | null;
  socialLinks: string[];
  memberId: string | null;
  memberRole: MemberRole | null;
  orgId: string | null;
  orgRole: OrgRole | null;
  adminAccesses: AdminAccessDto[];
}
