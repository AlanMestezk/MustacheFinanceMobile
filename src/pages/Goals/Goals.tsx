import { ScrollView, Text, View } from "react-native";

import { GoalCard } from "./components/GoalCard/GoalCard";
import { GoalFilters } from "./components/GoalFilters/GoalFilters";
import { GoalsHeader } from "./components/GoalsHEader/GoalsHeader";
import { GoalsSummary } from "./components/GoalsSummary/GoalsSummary";
import { styles } from "./styles/Goals.style";

export const Goals = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <GoalsHeader />

      <GoalsSummary />

      <GoalFilters />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Minhas metas</Text>

        <Text style={styles.goalCount}>4 metas</Text>
      </View>

      <GoalCard />

      <GoalCard />

      <GoalCard />
    </ScrollView>
  );
};
