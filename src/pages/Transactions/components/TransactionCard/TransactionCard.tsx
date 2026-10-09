import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import { colors } from "../../../../styles/colors";
import { styles } from "./styles/TransactionCard.styles";

interface TransactionCardProps {
  title: string;
  category: string;
  date: string;
  amount: string;
  type: "income" | "expense";
  icon: keyof typeof Feather.glyphMap;
  onEdit: () => void;
  onDelete: () => void;
}

export const TransactionCard = ({
  title,
  category,
  date,
  amount,
  type,
  icon,
  onEdit,
  onDelete,
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

      <View style={styles.actions}>
        <Text
          style={type === "income" ? styles.incomeAmount : styles.expenseAmount}
        >
          {amount}
        </Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={onEdit}
            activeOpacity={0.7}
            accessibilityLabel="Editar transação"
          >
            <Feather name="edit-2" size={17} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onDelete}
            activeOpacity={0.7}
            accessibilityLabel="Excluir transação"
          >
            <Feather name="trash-2" size={17} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
