import { useVideoPlayer, VideoView } from "expo-video";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
interface VideoPlayProps {
  videoUrl: string;
}
const VideoPlay: React.FC<VideoPlayProps> = ({ videoUrl }) => {
  const [videoLoading, setVideoLoading] = useState<boolean>(false);
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
    player.play();
    setVideoLoading(true);
  });

  player.addListener("playingChange", () => {
    setVideoLoading(false);
  });
  return (
    <View style={styles.VideoPlayWrapper}>
      <View style={styles.VideoPlayMain}>
        <VideoView
          player={player}
          style={{ width: "100%", height: "100%" }}
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
    backgroundColor: "#fff",
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
