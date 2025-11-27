import { Article } from "@type/common/Article/Article.types";
import { formatIsoTime } from "@utils/time/time";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
interface NewArticleItemProps {
  article: Article;
}
const NewArticleItem: React.FC<NewArticleItemProps> = ({ article }) => {
  const handleDetail = () => {
    router.push(`/article/${article.slug}`);
  };
  return (
    <View style={styles.NewArticleItemWrapper}>
      <Pressable
        style={styles.NewArticleItemMain}
        onPress={() => handleDetail()}
      >
        <Image style={styles.Image} src={article?.previewImageUrl} />
        <Text style={styles.Title} numberOfLines={2} ellipsizeMode="tail">
          {article?.title}
        </Text>
        <View style={styles.TagDotTime}>
          <Text style={styles.Tag} numberOfLines={1} ellipsizeMode="tail">
            {article?.author}
          </Text>
          {/* <View style={styles.Dot}>
          <CustomIcon name="icon-dot" color="gray" size={10} />
        </View> */}
          <Text style={styles.Time}>{formatIsoTime(article?.publishedAt)}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  NewArticleItemWrapper: {},
  NewArticleItemMain: {
    width: 226,
    marginRight: 11,
  },
  Image: {
    width: "100%",
    height: 117,
    borderRadius: 8,
    objectFit: "cover",
  },
  Title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 400,
    color: "#11181C",
    height: 36,
  },
  TagDotTime: {
    marginTop: 6,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  Tag: {
    flex: 1,
    fontSize: 10,
    fontWeight: 300,
    color: "#71717A",
  },
  // Dot: {
  //   marginLeft: 10,
  //   marginRight: 4,
  // },
  Time: {
    fontSize: 9,
    fontWeight: 300,
    letterSpacing: 0,
    color: " #C4C4C4",
  },
});

export default NewArticleItem;
