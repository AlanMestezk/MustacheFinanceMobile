import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles/GoalCard.style";

interface Goal {
  id: string;
  description: string;
  amount: number;
  goalAmount: number;
  category: string;
  date: any;
}

interface GoalCardProps {
  goal: Goal;
}

export const GoalCard = ({ goal }: GoalCardProps) => {
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

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatDate = (date: Date | null) => {
    if (!date) {
      return "";
    }

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getRemainingText = (date: Date | null) => {
    if (!date) {
      return "";
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(date);

    targetDate.setHours(0, 0, 0, 0);

    const difference = targetDate.getTime() - today.getTime();

    const daysRemaining = Math.ceil(difference / (1000 * 60 * 60 * 24));

    if (roundedPercentage >= 100) {
      return "Meta concluída";
    }

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

  const status = roundedPercentage >= 100 ? "Concluída" : "Em andamento";

  const image = goalImages[goal.category] || goalImages.Outros;

  const icon = goalIcons[goal.category] || "target";

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.85}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />

        <View style={styles.imageOverlay} />

        <View style={styles.goalIcon}>
          <MaterialCommunityIcons name={icon} size={20} style={styles.icon} />
        </View>

        <View style={styles.status}>
          <Text style={styles.statusText}>{status}</Text>
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
              ]}
            />
          </View>

          <Text style={styles.percentage}>{roundedPercentage}%</Text>
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
      </View>
    </TouchableOpacity>
  );
};
