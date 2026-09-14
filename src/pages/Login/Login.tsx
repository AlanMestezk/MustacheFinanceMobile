import { useVideoPlayer, VideoView } from "expo-video";
import { Image, KeyboardAvoidingView, Text, View } from "react-native";

import { LoginForm } from "./components/LoginForm";
import { styles } from "./styles/LoginS.styles";

export const Login = () => {
  const player = useVideoPlayer(
    require("../../../assets/images/vidMustache.mp4"),
    (player) => {
      player.loop = true;
      player.muted = true;
      player.play();
    },
  );

  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="height">
      <View style={styles.container}>
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

          <Text style={styles.title}>Welcome back!</Text>

          <LoginForm />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
