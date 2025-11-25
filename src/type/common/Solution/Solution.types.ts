import { ScreenParamList } from "@type/Navigation/ParamType";

export interface Solution {
  id: string;
  title: string;
  slug: string;
  description: string | null;
}

export interface Help {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: keyof ScreenParamList | "";
  hint: string;
}
