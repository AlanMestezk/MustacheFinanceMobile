import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { colors } from "../../../../styles/colors";
import { styles } from "./styles/TransactionCard.styles";

interface TransactionCardProps {
  title: string;
  category: string;
  date: string;
  amount: string;
  type: "income" | "expense";
  icon: keyof typeof Feather.glyphMap;
}

export const TransactionCard = ({
  title,
  category,
  date,
  amount,
  type,
  icon,
}: TransactionCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name={icon} size={21} color={colors.primary} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>
          {category} • {date}
        </Text>
      </View>

      <Text
        style={type === "income" ? styles.incomeAmount : styles.expenseAmount}
      >
        {amount}
      </Text>
    </View>
  );
};
