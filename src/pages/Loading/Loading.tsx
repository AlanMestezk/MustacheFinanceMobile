import { useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect } from "react";
import { View } from "react-native";

import { styles } from "./styles/Loading.styles";

export const Loading = () => {
  const router = useRouter();

  const player = useVideoPlayer(
    require("../../../assets/images/loadLoginAcount.mp4"),
    (player) => {
      player.loop = true;
      player.muted = true;
      player.play();
    },
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/main");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.video}
        contentFit="contain"
        nativeControls={false}
      />
    </View>
  );
};
