import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { auth } from "../../firebase/auth";
import { getUserInvestments } from "../../firebase/firestore";

import { GoalCard } from "./components/GoalCard/GoalCard";
import { GoalsHeader } from "./components/GoalsHEader/GoalsHeader";
import { GoalsSummary } from "./components/GoalsSummary/GoalsSummary";
import { styles } from "./styles/Goals.style";

interface Goal {
  id: string;
  description: string;
  amount: number;
  goalAmount: number;
  category: string;
  date: any;
}

export const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  const loadGoals = async () => {
    const user = auth.currentUser;

    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const investments = await getUserInvestments(user.uid);

      const formattedGoals: Goal[] = investments.map((investment) => ({
        id: investment.id,
        description: investment.description,
        amount: Number(investment.amount || 0),
        goalAmount: Number(investment.goalAmount || 0),
        category: investment.category,
        date: investment.date,
      }));

      setGoals(formattedGoals);
    } catch (error) {
      console.error("Erro ao carregar metas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

  const totalGoals = goals.length;

  const completedGoals = goals.filter(
    (goal) => goal.goalAmount > 0 && goal.amount >= goal.goalAmount,
  ).length;

  const completionPercentage =
    totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <GoalsHeader />

      <GoalsSummary
        totalGoals={totalGoals}
        completedGoals={completedGoals}
        completionPercentage={completionPercentage}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Minhas metas</Text>

        <Text style={styles.goalCount}>
          {goals.length} {goals.length === 1 ? "meta" : "metas"}
        </Text>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Carregando metas...</Text>
      ) : goals.length > 0 ? (
        goals.map((goal) => <GoalCard key={goal.id} goal={goal} />)
      ) : (
        <Text style={styles.emptyText}>Nenhuma meta encontrada.</Text>
      )}
    </ScrollView>
  );
};
