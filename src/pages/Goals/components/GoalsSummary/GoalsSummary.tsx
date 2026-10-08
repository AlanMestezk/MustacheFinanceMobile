import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { styles } from "./styles/GoalsSummary.styles";

interface GoalsSummaryProps {
  totalGoals: number;
  completedGoals: number;
  completionPercentage: number;
}

export const GoalsSummary = ({
  totalGoals,
  completedGoals,
  completionPercentage,
}: GoalsSummaryProps) => {
  const getSubtitle = () => {
    if (totalGoals === 0) {
      return "Comece sua primeira meta! 🎯";
    }

    if (completionPercentage === 100) {
      return "Todas as metas concluídas! 🎉";
    }

    if (completionPercentage >= 75) {
      return "Está quase lá! 🔥";
    }

    if (completionPercentage >= 50) {
      return "Continue assim! 💪";
    }

    if (completionPercentage > 0) {
      return "Você está no caminho! 🚀";
    }

    return "Vamos começar! 🎯";
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name="target" size={24} style={styles.icon} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          {completedGoals} de {totalGoals} {totalGoals === 1 ? "meta" : "metas"}{" "}
          concluídas
        </Text>

        <Text style={styles.subtitle}>{getSubtitle()}</Text>
      </View>

      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressCircle,
            completionPercentage === 0 && styles.progressCircleEmpty,
          ]}
        >
          <Text style={styles.progressText}>{completionPercentage}%</Text>
        </View>
      </View>
    </View>
  );
};
