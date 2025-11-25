import CustomIcon from "@components/Common/CustomIcon/CustomIcon";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { debounce } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { themes } from "@themes/themes";
interface SearchProps {
  q: string;
  setQ: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  setCountryCodeList: React.Dispatch<React.SetStateAction<string[]>>;
  marginTop?: number;
  backgroundColor?: string;
  paddingBottom?: number;
  isBackHidden?: "flex" | "none";
}
const Search: React.FC<SearchProps> = ({
  q,
  setQ,
  setPage,
  setHasMore,
  setCountryCodeList,
  marginTop = 10,
  backgroundColor = "#ffffff",
  paddingBottom = 0,
  isBackHidden = "flex",
}) => {
  const onChangeText = debounce((text: string) => {
    setQ(text);
    setCountryCodeList([]);
    setPage(1);
    setHasMore(true);
  }, 500);
  const navigation = useNavigation<any>();
  return (
    <View
      style={{
        ...styles.SearchWrapper,
        marginTop: marginTop,
        backgroundColor: backgroundColor,
        paddingBottom: paddingBottom,
      }}
    >
      <View style={styles.SearchMain}>
        <TouchableOpacity
          style={{ ...styles.Icon, display: isBackHidden }}
          onPress={() => navigation.goBack()}
        >
          <CustomIcon name="icon-back" color={"white"} size={15} />
        </TouchableOpacity>
        <View style={styles.SlugSearch}>
          <TextInput
            style={styles.Slug}
            placeholder="Search"
            onChangeText={(text) => onChangeText(text)}
          />
          <CustomIcon name="icon-search" color="#C4C4C4" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // 头部搜索
  SearchWrapper: {
    paddingHorizontal: 17,
  },
  SearchMain: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 45,
  },
  Icon: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 20,
    padding: 12,
    marginRight: 10,
  },
  SlugSearch: {
    flex: 1,
    height: 40,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  Slug: {
    flex: 1,
    height: "100%",
  },
});

export default Search;
