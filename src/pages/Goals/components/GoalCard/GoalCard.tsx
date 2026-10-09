import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles/GoalCard.style";

export interface Goal {
  id: string;
  description: string;
  amount: number;
  goalAmount: number;
  category: string;
  date: any;
  completed?: boolean;
}

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (goal: Goal) => void;
  onComplete: (goal: Goal) => void;
}

export const GoalCard = ({
  goal,
  onEdit,
  onDelete,
  onComplete,
}: GoalCardProps) => {
  const goalImages: Record<string, any> = {
    Viagem: require("../../../../../assets/goals/viagem.png"),
    Compras: require("../../../../../assets/goals/compras.png"),
    Tecnologia: require("../../../../../assets/goals/tecnologia.png"),
    Casa: require("../../../../../assets/goals/casa.png"),
    Estudo: require("../../../../../assets/goals/estudo.png"),
    Investimento: require("../../../../../assets/goals/investimento.png"),
    Lazer: require("../../../../../assets/goals/lazer.png"),
    Outros: require("../../../../../assets/goals/outros.png"),
  };

  const goalIcons: Record<
    string,
    keyof typeof MaterialCommunityIcons.glyphMap
  > = {
    Viagem: "bag-carry-on",
    Compras: "shopping",
    Tecnologia: "cellphone",
    Casa: "home",
    Veículo: "car",
    Estudo: "book-open-variant",
    Investimento: "trending-up",
    Lazer: "party-popper",
    Outros: "package-variant",
  };

  const getGoalDate = () => {
    if (!goal.date) {
      return null;
    }

    if (typeof goal.date?.toDate === "function") {
      return goal.date.toDate();
    }

    if (goal.date?.seconds) {
      return new Date(goal.date.seconds * 1000);
    }

    return new Date(goal.date);
  };

  const goalDate = getGoalDate();

  const percentage =
    goal.goalAmount > 0
      ? Math.min((goal.amount / goal.goalAmount) * 100, 100)
      : 0;

  const roundedPercentage = Math.round(percentage);

  const isCompleted =
    goal.completed === true ||
    (goal.goalAmount > 0 && goal.amount >= goal.goalAmount);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatDate = (date: Date | null) => {
    if (!date || Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getRemainingText = (date: Date | null) => {
    if (isCompleted) {
      return "Meta concluída";
    }

    if (!date || Number.isNaN(date.getTime())) {
      return "";
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const difference = targetDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(difference / (1000 * 60 * 60 * 24));

    if (daysRemaining < 0) {
      return "Prazo encerrado";
    }

    if (daysRemaining === 0) {
      return "Termina hoje";
    }

    if (daysRemaining < 29) {
      return `Faltam ${daysRemaining} ${daysRemaining === 1 ? "dia" : "dias"}`;
    }

    const monthsRemaining = Math.floor(daysRemaining / 30);

    return `Faltam ${monthsRemaining} ${
      monthsRemaining === 1 ? "mês" : "meses"
    }`;
  };

  const status = isCompleted ? "Concluída" : "Em andamento";

  const image = goalImages[goal.category] || goalImages.Outros;
  const icon = goalIcons[goal.category] || "target";

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />

        <View style={styles.imageOverlay} />

        <View style={styles.goalIcon}>
          <MaterialCommunityIcons name={icon} size={20} style={styles.icon} />
        </View>

        <View style={[styles.status, isCompleted && styles.completedStatus]}>
          <Text
            style={[
              styles.statusText,
              isCompleted && styles.completedStatusText,
            ]}
          >
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{goal.description}</Text>

        <Text style={styles.amount}>
          {formatCurrency(goal.amount)}{" "}
          <Text style={styles.target}>
            de {formatCurrency(goal.goalAmount)}
          </Text>
        </Text>

        <View style={styles.progressRow}>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progress,
                {
                  width: `${percentage}%`,
                },
                isCompleted && styles.completedProgress,
              ]}
            />
          </View>

          <Text
            style={[
              styles.percentage,
              isCompleted && styles.completedPercentage,
            ]}
          >
            {roundedPercentage}%
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.dateContainer}>
            <MaterialCommunityIcons
              name="calendar-outline"
              size={16}
              style={styles.dateIcon}
            />

            <Text style={styles.date}>{formatDate(goalDate)}</Text>
          </View>

          <Text style={styles.remaining}>{getRemainingText(goalDate)}</Text>
        </View>

        <View style={styles.actions}>
          {!isCompleted && (
            <>
              <TouchableOpacity
                onPress={() => onEdit(goal)}
                style={[styles.actionButton, styles.editAction]}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={18}
                  color="#D4A72C"
                />

                <Text style={styles.editActionText}>Editar valor</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onComplete(goal)}
                style={[styles.actionButton, styles.completeAction]}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons
                  name="check-circle-outline"
                  size={18}
                  color="#4ADE80"
                />

                <Text style={styles.completeActionText}>Concluir</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            onPress={() => onDelete(goal)}
            style={[styles.actionButton, styles.deleteAction]}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={18}
              color="#F87171"
            />

            <Text style={styles.deleteActionText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
