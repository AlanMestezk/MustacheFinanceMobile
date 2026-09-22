import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect } from "react";
import { Text, View } from "react-native";

import { styles } from "./styles/Loading.styles";

export const Loading = () => {
  const router = useRouter();

  const player = useVideoPlayer(
    require("../../../assets/images/vidMustache.mp4"),
    (player) => {
      player.loop = true;
      player.muted = true;
      player.play();
    },
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/main");
    }, 7500);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.backgroundVideo}
        contentFit="cover"
        nativeControls={false}
      />

      <View style={styles.overlay} />

      <View style={styles.content}>
        <Image
          source={require("../../../assets/images/transparent-loadLoginAcount (1).gif")}
          style={styles.gif}
          contentFit="contain"
        />

        <Text style={styles.loadingText}>Accessing your account...</Text>
      </View>
    </View>
  );
};
