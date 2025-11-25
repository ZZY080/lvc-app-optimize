// RootScreen ParamList路由参数 ()
export type StackScreenParamList = {
  Login: undefined;
  Register: undefined;
  ActiveAccount: undefined;
  ForgetPassword: undefined;
  Splash: undefined;
  Home: undefined;
  DocumentDetail: {
    slug: string;
  };

  MyProfile: undefined;
  WebinarDetail: {
    slug: string;
  };
  Search: undefined;
  SearchDetail: {
    q: string;
    topicId?: string;
  };
  SolutionDetail: {
    q: string;
    topicId?: string;
    slug?: string;
  };
  PlatformActivityDetail: {
    id: number;
  };
  Document: undefined;
  Demo: undefined;
  Article: undefined;
  ArticleDetail: {
    slug: string;
  };
  CourseDetail: {
    slug: string;
  };
  MyCourse: undefined;
  MyProduct: undefined;
  MyOrder: undefined;

  Language: undefined;
  VideoPlayer: {
    videoUrl: string;
  };
  CourseInstance: {
    instanceId: string;
  };
  Advisor: undefined;
  AdvisorDetail: {
    slug: string;
  };
  Course: undefined;
  PlatformActivity: undefined;
  MemberArea: undefined;
  CustomerArea: undefined;
  MemberAreaServiceOpportunityDetail: {
    id: string;
  };
  MemberAreaInvestmentOpportunityDetail: {
    id: string;
  };
  MemberAreaPostServiceOpportunity: undefined;
  MemberAreaPostInvestmentOpportunity: undefined;
  MemberAreaEditServiceOpportunity: {
    id: string;
  };
  MemberAreaEditInvestmentOpportunity: {
    id: string;
  };
  CustomerAreaPostServiceRequirement: undefined;
  CustomerAreaPostInvestmentOpportunity: undefined;
  CustomerAreaServiceRequirementDetail: {
    id: string;
  };
  CustomerAreaInvestmentOpportunityDetail: {
    id: string;
  };
  CustomerAreaEditServiceRequirement: {
    id: string;
  };
  CustomerAreaEditInvestmentOpportunity: {
    id: string;
  };
  RegisterMember: undefined;
  RuleCenter: undefined;
  PrivacyPolicy: undefined;
  ChangePassword: undefined;
  Product: undefined;
  WebView: {
    url: string;
  };
  Setting: undefined;
  DeleteAccount: undefined;
  Review: undefined;
};

// TabScreen ParamList
export type TabScreenParamList = {
  Index: undefined;
  Solution: undefined;
  Advisor: undefined;
  Insight: undefined;
  My: undefined;
};

// 混合类型
export type ScreenParamList = StackScreenParamList & TabScreenParamList;
