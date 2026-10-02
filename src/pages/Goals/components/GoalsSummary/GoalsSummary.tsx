import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { styles } from "./styles/GoalsSummary.styles";

export const GoalsSummary = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name="target" size={24} style={styles.icon} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>2 de 4 metas</Text>

        <Text style={styles.subtitle}>Continue assim! 💪</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressCircle}>
          <Text style={styles.progressText}>50%</Text>
        </View>
      </View>
    </View>
  );
};
