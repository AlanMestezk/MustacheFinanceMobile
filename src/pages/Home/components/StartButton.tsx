import { Text, TouchableOpacity } from "react-native";

import { router } from "expo-router";
import { styles } from "./styles/StartButton.styles";

export const StartButton = () => {
  const handleStart = () => {
    router.push("/login");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleStart}>
      <Text style={styles.text}>VAMOS COMEÇAR</Text>
    </TouchableOpacity>
  );
};
