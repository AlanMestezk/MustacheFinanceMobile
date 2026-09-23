import { useVideoPlayer, VideoView } from "expo-video";

import { Image, Text, View } from "react-native";

import { ForgotPasswordForm } from "./components/ForgotPasswordForm";

import { styles } from "./styles/ForgotPassword.styles";

export const ForgotPassword = () => {
  const player = useVideoPlayer(
    require("../../../assets/images/vidMustache.mp4"),
    (player) => {
      player.loop = true;
      player.muted = true;
      player.play();
    },
  );

  return (
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

        <Text style={styles.title}>Reset your password</Text>

        <Text style={styles.description}>
          Enter your e-mail and we'll send you a link to reset your password.
        </Text>

        <ForgotPasswordForm />
      </View>
    </View>
  );
};
