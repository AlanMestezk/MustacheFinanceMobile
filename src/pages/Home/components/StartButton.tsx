import { Text, TouchableOpacity } from "react-native";

import { styles } from "./styles/StartButton.styles";

export const StartButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>VAMOS COMEÇAR</Text>
    </TouchableOpacity>
  );
};
