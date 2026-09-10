import { useVideoPlayer, VideoView } from "expo-video";
import { Image, Text, View } from "react-native";

import { StartButton } from "./components/StartButton";
import { styles } from "./styles/Home.styles";

export default function Home() {
  const player = useVideoPlayer(
    require("../../../assets/images/vidMustache.mp4"),
    (player) => {
      player.loop = true;
      player.muted = true;
      player.play();
    },
  );

  return (
    <View style={styles.content}>
      <VideoView
        player={player}
        style={styles.backgroundVideo}
        contentFit="cover"
        nativeControls={false}
      />

      <View style={styles.overlay} />

      <View style={styles.contentForeground}>
        <Image
          source={require("../../../assets/logo/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.subtitle}>
          Take control of your <Text style={styles.highlightGold}>money</Text>{" "}
          and your <Text style={styles.highlightTeal}>plans.</Text>
        </Text>

        <StartButton />
      </View>
    </View>
  );
}
