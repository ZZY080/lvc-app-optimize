import CustomIcon from "@components/Common/CustomIcon/CustomIcon";
import NavigateBack from "@components/Common/NavigateBack/NavigateBack";
import { useNavigation } from "@react-navigation/native";
import { CourseInstance } from "@type/common/Course/Course.types";
import { ScreenProps } from "@type/Navigation/ScreenType";
import { useVideoPlayer, VideoView } from "expo-video";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
interface VideoPlayProps {
  video: CourseInstance["videos"][number];
}
const VideoPlay: React.FC<VideoPlayProps> = ({ video }) => {
  const navigation = useNavigation<ScreenProps["navigation"]>();
  const [videoLoading, setVideoLoading] = useState<boolean>(false);
  const player = useVideoPlayer(video.videoHLSUrl, (player) => {
    setVideoLoading(true);
    player.loop = true;
    player.play();
  });
  player.addListener("playingChange", () => {
    setVideoLoading(false);
  });

  return (
    <View style={styles.VideoPlayWrapper}>
      <View style={styles.VideoPlayMain}>
        <VideoView
          player={player}
          style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}
          nativeControls={videoLoading ? false : true}
          contentFit="contain"
          allowsFullscreen
          allowsPictureInPicture
        />
        {videoLoading && (
          <View style={styles.VideoLoading}>
            <ActivityIndicator size="large" color={"#6562A9"} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // 视频播放区域
  VideoPlayWrapper: {},
  VideoPlayMain: {
    position: "relative",
    height: 220,
    width: "100%",
    backgroundColor: "black",
  },
  VideoLoading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [
      {
        translateX: "-50%",
      },
      {
        translateY: "-50%",
      },
    ],
  },
});

export default VideoPlay;
