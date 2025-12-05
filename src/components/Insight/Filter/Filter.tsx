import { UserProfile } from "@type/common/User/User.types";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
interface FilterProps {
  categoryList: {
    id: string;
    name: string;
  }[];
  tabIndex: number;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
  userProfile: UserProfile | null;
}
const Filter: React.FC<FilterProps> = ({
  categoryList,
  tabIndex,
  setTabIndex,
  userProfile,
}) => {
  const { t } = useTranslation();

  // 处理tabbar
  const handleTabBar = (index: number, id: string) => {
    setTabIndex(index);
  };

  return (
    <View style={styles.FilterWrapper}>
      <View style={styles.FilterMain}>
        {/* tabBar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          overScrollMode="never" //禁用溢出时的波纹效果 适用于 Android 平台
          bounces={false} // 禁用溢出时的波纹效果 适用于 ios 平台
          style={styles.TabBarWrapper}
        >
          <View style={styles.TabBarMain}>
            {categoryList.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => handleTabBar(index, item.id)}
                  style={{
                    ...styles.TabBarItem,
                    borderBottomColor: index === tabIndex ? "#11181C" : "#fff",
                    ...(index === 3
                      ? userProfile
                        ? userProfile.memberId || userProfile.orgId
                          ? {
                              display: "flex",
                            }
                          : {
                              display: "none",
                            }
                        : {
                            display: "none",
                          }
                      : { display: "flex" }),
                  }}
                  key={index}
                >
                  <Text
                    style={{
                      ...styles.Word,
                      color: index === tabIndex ? "#11181C" : "#71717A",
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  FilterWrapper: {
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    // boxShadow: "0px 3px 5px 0px rgba(182, 182, 182, 0.25)",
  },
  FilterMain: {
    height: 45,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  TabBarWrapper: {},
  TabBarMain: {
    display: "flex",
    flexDirection: "row",
  },
  TabBarItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: 25,
    paddingHorizontal: 4,
    paddingBottom: 6,
    borderBottomWidth: 1,
  },
  Word: {
    fontFamily: "Inter",
    fontSize: 11,
    fontWeight: 500,
    color: "#000000",
  },
});

export default Filter;
