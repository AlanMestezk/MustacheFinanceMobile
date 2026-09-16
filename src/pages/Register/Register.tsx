import { useVideoPlayer, VideoView } from "expo-video";
import { Image, Text, View } from "react-native";

import { ProfilePhoto } from "./components/ProfilePhoto/ProfilePhoto";
import { RegisterForm } from "./components/RegisterForm";
import { styles } from "./styles/Register.styles";

export const Register = () => {
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

        <Text style={styles.title}>Create your account</Text>

        <ProfilePhoto />

        <RegisterForm />
      </View>
    </View>
  );
};
