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
  //   setServiceCategoryId: React.Dispatch<React.SetStateAction<string>>;
  //   setPage: React.Dispatch<React.SetStateAction<number>>;
  //   setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  //   show: boolean;
  //   setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const Filter: React.FC<FilterProps> = ({
  categoryList,
  tabIndex,
  setTabIndex,
  //   setServiceCategoryId,
  //   setPage,
  //   setHasMore,
  //   show,
  //   setShow,
}) => {
  const { t } = useTranslation();

  // 处理tabbar
  const handleTabBar = (index: number, id: string) => {
    setTabIndex(index);
    // setServiceCategoryId(id);
    // setPage(1);
    // setHasMore(true);
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
        {/* 国家筛选 */}
        {/* <TouchableOpacity style={styles.Search} onPress={() => setShow(!show)}>
          <View style={styles.Bar}></View>
          <Text style={styles.Desc}>{t("common:filter")}</Text>
          <CustomIcon name="icon-filter" color="gray" size={15} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  FilterWrapper: {
    paddingHorizontal: 10,
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 3px 5px 0px rgba(182, 182, 182, 0.25)",
  },
  FilterMain: {
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
