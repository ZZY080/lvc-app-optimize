import { useNavigation } from "@react-navigation/native";
import { Article } from "@type/common/Article/Article.types";
import { ScreenProps } from "@type/Navigation/ScreenType";
import { formatIsoTime } from "@utils/time/time";
import { CircleDot } from "lucide-react-native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
interface ArticleItemProps {
  article: Article;
}
const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
  const navigation = useNavigation<ScreenProps["navigation"]>();
  const handleDetail = () => {
    navigation.navigate("ArticleDetail", {
      slug: article.slug,
    });
  };
  return (
    <Pressable style={styles.ArticleItemWrapper} onPress={() => handleDetail()}>
      <View style={styles.ArticleItemMain}>
        <View style={styles.Cover}>
          <Image
            style={{ width: "100%", height: "100%" }}
            src={article.previewImageUrl}
          />
        </View>
        <View style={styles.Info}>
          <Text style={styles.Title} numberOfLines={1} ellipsizeMode="tail">
            {article.title}
          </Text>
          <Text style={styles.Desc} numberOfLines={2} ellipsizeMode="tail">
            {article.description}
          </Text>
          <View style={styles.AuthorDotTime}>
            <Text style={styles.Author}>{article.author}</Text>
            <CircleDot style={styles.Dot} />
            <Text style={styles.Time}>
              {formatIsoTime(article.publishedAt)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  ArticleItemWrapper: {
    marginTop: 6,
  },
  ArticleItemMain: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",

    columnGap: 10,
  },
  Cover: {
    width: 120,
    height: 80,
    borderRadius: 5,
    overflow: "hidden",
  },

  Info: {
    flex: 1,
    marginRight: 2,
    height: 80,
  },
  Title: {
    fontFamily: "Inter",
    fontSize: 12,
    color: "#000000",
  },
  Desc: {
    flex: 1,
    fontFamily: "Inter",
    fontSize: 10,
    color: "#999999",
    paddingTop: 6,
  },
  AuthorDotTime: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  Author: {
    fontFamily: "Poppins",
    fontSize: 9,
    fontWeight: 300,
    color: "#A8A5DF",
    marginRight: 10,
  },
  Dot: {
    width: 4,
    height: 4,
    objectFit: "cover",
  },
  Time: {
    fontFamily: "Poppins",
    fontSize: 9,
    color: "#C4C4C4",
    marginLeft: 4,
  },
});
export default ArticleItem;
