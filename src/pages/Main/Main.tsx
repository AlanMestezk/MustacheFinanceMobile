import { Text, View } from "react-native";

import { styles } from "./styles/Main.styles";

export const Main = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logou com sucesso!</Text>
    </View>
  );
};
