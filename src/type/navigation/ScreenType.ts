import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  StackScreenParamList,
  TabScreenParamList,
} from "@type/Navigation/ParamType";

// 多种页面类型
export type ScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackScreenParamList, keyof StackScreenParamList>,
  BottomTabScreenProps<TabScreenParamList, keyof TabScreenParamList>
>;
