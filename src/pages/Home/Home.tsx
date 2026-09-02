import { Text, View } from "react-native";

import { styles } from "./styles/Home.styles";

export function Home() {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Mustache Finance</Text>
    </View>
  );
}
