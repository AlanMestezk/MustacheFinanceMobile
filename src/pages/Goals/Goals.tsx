import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { auth } from "../../firebase/auth";
import {
  completeUserInvestment,
  deleteUserInvestment,
  getUserInvestments,
  updateUserInvestmentAmount,
} from "../../firebase/firestore";

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
  completed?: boolean;
}

export const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados do modal de edição
  const [editVisible, setEditVisible] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [editedAmount, setEditedAmount] = useState("");
  const [saving, setSaving] = useState(false);

  // Estados do modal de sucesso
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [feedbackType, setFeedbackType] = useState<"updated" | "completed">(
    "updated",
  );

  // Estados do modal de conclusão
  const [completionVisible, setCompletionVisible] = useState(false);
  const [goalToComplete, setGoalToComplete] = useState<Goal | null>(null);
  const [completing, setCompleting] = useState(false);

  // Carrega as metas do usuário
  const loadGoals = async () => {
    const user = auth.currentUser;

    if (!user) {
      setGoals([]);
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
        completed: investment.completed === true,
      }));

      setGoals(formattedGoals);
    } catch (error) {
      console.error("Erro ao carregar metas:", error);
      Alert.alert("Erro", "Não foi possível carregar suas metas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

  // Abre o modal de edição
  const handleEditGoal = (goal: Goal) => {
    setSelectedGoal(goal);
    setEditedAmount(String(goal.amount));
    setEditVisible(true);
  };

  // Fecha o modal de edição
  const handleCloseEdit = () => {
    if (saving) return;

    setEditVisible(false);
    setSelectedGoal(null);
    setEditedAmount("");
  };

  // Excluir uma meta após confirmação
  const handleDeleteGoal = (goal: Goal) => {
    Alert.alert(
      "Excluir meta",
      `Tem certeza que deseja excluir a meta "${goal.description}"? Essa ação não poderá ser desfeita.`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const user = auth.currentUser;

            if (!user) {
              Alert.alert(
                "Atenção",
                "Você precisa estar logado para excluir uma meta.",
              );
              return;
            }

            try {
              await deleteUserInvestment(user.uid, goal.id);

              setGoals((currentGoals) =>
                currentGoals.filter((item) => item.id !== goal.id),
              );

              Alert.alert("Sucesso", "Meta excluída com sucesso!");
            } catch (error) {
              console.error("Erro ao excluir meta:", error);
              Alert.alert(
                "Erro",
                "Não foi possível excluir a meta. Tente novamente.",
              );
            }
          },
        },
      ],
    );
  };
  // Salva o novo valor acumulado
  const handleSaveGoalAmount = async () => {
    const user = auth.currentUser;

    if (!user || !selectedGoal) {
      Alert.alert("Atenção", "Não foi possível identificar a meta.");
      return;
    }

    const parsedAmount = Number(
      editedAmount.trim().replace(/\s/g, "").replace(",", "."),
    );

    if (
      !editedAmount.trim() ||
      !Number.isFinite(parsedAmount) ||
      parsedAmount < 0
    ) {
      Alert.alert(
        "Valor inválido",
        "Informe um valor igual ou maior que zero.",
      );
      return;
    }

    try {
      setSaving(true);

      await updateUserInvestmentAmount(user.uid, selectedGoal.id, parsedAmount);

      setGoals((currentGoals) =>
        currentGoals.map((goal) =>
          goal.id === selectedGoal.id
            ? {
                ...goal,
                amount: parsedAmount,
                completed:
                  goal.completed === true ||
                  (goal.goalAmount > 0 && parsedAmount >= goal.goalAmount),
              }
            : goal,
        ),
      );

      setEditVisible(false);
      setSelectedGoal(null);
      setEditedAmount("");

      setFeedbackType("updated");
      setFeedbackModal(true);
    } catch (error) {
      console.error("Erro ao atualizar valor da meta:", error);
      Alert.alert("Erro", "Não foi possível atualizar o valor da meta.");
    } finally {
      setSaving(false);
    }
  };

  // Solicita confirmação para concluir uma meta
  const handleRequestComplete = (goal: Goal) => {
    if (
      goal.completed === true ||
      (goal.goalAmount > 0 && goal.amount >= goal.goalAmount)
    ) {
      Alert.alert("Meta concluída", "Esta meta já foi concluída.");
      return;
    }

    setGoalToComplete(goal);
    setCompletionVisible(true);
  };

  // Fecha o modal de confirmação
  const handleCloseCompletion = () => {
    if (completing) return;

    setCompletionVisible(false);
    setGoalToComplete(null);
  };

  // Confirma e salva a conclusão no Firestore
  const handleConfirmComplete = async () => {
    const user = auth.currentUser;

    if (!user || !goalToComplete) {
      Alert.alert("Atenção", "Não foi possível identificar a meta.");
      return;
    }

    if (
      !Number.isFinite(goalToComplete.goalAmount) ||
      goalToComplete.goalAmount < 0
    ) {
      Alert.alert("Erro", "O valor definido para esta meta é inválido.");
      return;
    }

    try {
      setCompleting(true);

      await completeUserInvestment(
        user.uid,
        goalToComplete.id,
        goalToComplete.goalAmount,
      );

      setGoals((currentGoals) =>
        currentGoals.map((goal) =>
          goal.id === goalToComplete.id
            ? {
                ...goal,
                amount: goal.goalAmount,
                completed: true,
              }
            : goal,
        ),
      );

      setCompletionVisible(false);
      setGoalToComplete(null);

      setFeedbackType("completed");
      setFeedbackModal(true);
    } catch (error) {
      console.error("Erro ao concluir meta:", error);
      Alert.alert("Erro", "Não foi possível concluir a meta.");
    } finally {
      setCompleting(false);
    }
  };

  // Resumo das metas
  const totalGoals = goals.length;

  const completedGoals = goals.filter(
    (goal) =>
      goal.completed === true ||
      (goal.goalAmount > 0 && goal.amount >= goal.goalAmount),
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
        <View style={{ paddingVertical: 24 }}>
          <ActivityIndicator color="#D4A72C" />
          <Text style={styles.loadingText}>Carregando metas...</Text>
        </View>
      ) : goals.length > 0 ? (
        goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onEdit={handleEditGoal}
            onDelete={handleDeleteGoal}
            onComplete={handleRequestComplete}
          />
        ))
      ) : (
        <Text style={styles.emptyText}>Nenhuma meta encontrada.</Text>
      )}

      {/* Modal de confirmação de conclusão */}
      <Modal
        visible={completionVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseCompletion}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
            backgroundColor: "rgba(0,0,0,0.78)",
          }}
        >
          <View
            style={{
              width: "100%",
              maxWidth: 380,
              alignItems: "center",
              padding: 26,
              borderRadius: 24,
              backgroundColor: "#171923",
              borderWidth: 1,
              borderColor: "#343746",
            }}
          >
            <Image
              source={require("../../../assets/logo/icon.png")}
              style={{ width: 90, height: 90, marginBottom: 18 }}
              resizeMode="contain"
            />

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 21,
                fontWeight: "700",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Concluir meta?
            </Text>

            <Text
              style={{
                color: "#A7A9B7",
                fontSize: 14,
                lineHeight: 21,
                textAlign: "center",
                marginBottom: 12,
              }}
            >
              Deseja marcar a meta "{goalToComplete?.description}" como
              concluída?
            </Text>

            <Text
              style={{
                color: "#D4A72C",
                fontSize: 16,
                fontWeight: "700",
                textAlign: "center",
                marginBottom: 24,
              }}
            >
              Valor final:{" "}
              {(goalToComplete?.goalAmount ?? 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>

            <Text
              style={{
                color: "#A7A9B7",
                fontSize: 12,
                lineHeight: 18,
                textAlign: "center",
                marginBottom: 22,
              }}
            >
              Ao confirmar, o valor acumulado será ajustado para o valor
              definido na meta.
            </Text>

            <View
              style={{
                flexDirection: "row",
                gap: 12,
                width: "100%",
              }}
            >
              <TouchableOpacity
                disabled={completing}
                onPress={handleCloseCompletion}
                style={{
                  flex: 1,
                  padding: 14,
                  borderRadius: 12,
                  alignItems: "center",
                  backgroundColor: "#2B2E3B",
                  opacity: completing ? 0.6 : 1,
                }}
              >
                <Text style={{ color: "#E5E7EB", fontWeight: "600" }}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={completing}
                onPress={handleConfirmComplete}
                style={{
                  flex: 1,
                  padding: 14,
                  borderRadius: 12,
                  alignItems: "center",
                  backgroundColor: "#D4A72C",
                  opacity: completing ? 0.7 : 1,
                }}
              >
                {completing ? (
                  <ActivityIndicator color="#171923" />
                ) : (
                  <Text style={{ color: "#171923", fontWeight: "700" }}>
                    Confirmar
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para editar o valor da meta */}
      <Modal
        visible={editVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseEdit}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 24,
            backgroundColor: "rgba(0,0,0,0.78)",
          }}
        >
          <View
            style={{
              padding: 24,
              borderRadius: 24,
              backgroundColor: "#171923",
              borderWidth: 1,
              borderColor: "#343746",
            }}
          >
            <View style={{ alignItems: "center", marginBottom: 18 }}>
              <Image
                source={require("../../../assets/logo/icon.png")}
                style={{ width: 90, height: 90 }}
                resizeMode="contain"
              />
            </View>

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 21,
                fontWeight: "700",
                marginBottom: 8,
              }}
            >
              Editar valor da meta
            </Text>

            <Text
              style={{
                color: "#A7A9B7",
                fontSize: 14,
                marginBottom: 20,
              }}
            >
              {selectedGoal?.description}
            </Text>

            <Text
              style={{
                color: "#E5E7EB",
                fontSize: 14,
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              Valor acumulado (R$)
            </Text>

            <TextInput
              value={editedAmount}
              onChangeText={setEditedAmount}
              placeholder="Ex.: 500,00"
              placeholderTextColor="#777B8B"
              keyboardType="decimal-pad"
              editable={!saving}
              selectTextOnFocus
              style={{
                borderWidth: 1,
                borderColor: "#3B3E4D",
                borderRadius: 12,
                padding: 14,
                color: "#FFFFFF",
                backgroundColor: "#222532",
                fontSize: 16,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                gap: 12,
                marginTop: 24,
              }}
            >
              <TouchableOpacity
                disabled={saving}
                onPress={handleCloseEdit}
                style={{
                  flex: 1,
                  padding: 14,
                  borderRadius: 12,
                  alignItems: "center",
                  backgroundColor: "#2B2E3B",
                  opacity: saving ? 0.6 : 1,
                }}
              >
                <Text style={{ color: "#E5E7EB", fontWeight: "600" }}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={saving}
                onPress={handleSaveGoalAmount}
                style={{
                  flex: 1,
                  padding: 14,
                  borderRadius: 12,
                  alignItems: "center",
                  backgroundColor: "#D4A72C",
                  opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? (
                  <ActivityIndicator color="#171923" />
                ) : (
                  <Text style={{ color: "#171923", fontWeight: "700" }}>
                    Salvar
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal personalizado de sucesso */}
      <Modal
        visible={feedbackModal}
        transparent
        animationType="fade"
        onRequestClose={() => setFeedbackModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
            backgroundColor: "rgba(0,0,0,0.78)",
          }}
        >
          <View
            style={{
              width: "100%",
              maxWidth: 380,
              alignItems: "center",
              padding: 26,
              borderRadius: 24,
              backgroundColor: "#171923",
              borderWidth: 1,
              borderColor: "#343746",
            }}
          >
            <View
              style={{
                width: 100,
                height: 80,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Image
                source={require("../../../assets/logo/icon.png")}
                style={{ width: 90, height: 90 }}
                resizeMode="contain"
              />
            </View>

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 21,
                fontWeight: "700",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              {feedbackType === "completed"
                ? "Meta concluída!"
                : "Valor atualizado!"}
            </Text>

            <Text
              style={{
                color: "#A7A9B7",
                fontSize: 14,
                lineHeight: 21,
                textAlign: "center",
                marginBottom: 24,
              }}
            >
              {feedbackType === "completed"
                ? "Parabéns! Sua meta foi marcada como concluída com sucesso."
                : "O valor da sua meta foi atualizado com sucesso!"}
            </Text>

            <TouchableOpacity
              onPress={() => setFeedbackModal(false)}
              style={{
                width: "100%",
                minHeight: 48,
                padding: 14,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#D4A72C",
              }}
            >
              <Text
                style={{
                  color: "#171923",
                  fontSize: 15,
                  fontWeight: "700",
                }}
              >
                Entendi!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
