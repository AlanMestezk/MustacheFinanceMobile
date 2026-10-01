import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles/AddOption.styles";

interface AddOptionProps {
  title: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
  type: "income" | "expense" | "goal";
  onPress: () => void;
}

export const AddOption = ({
  title,
  description,
  icon,
  type,
  onPress,
}: AddOptionProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.wrapper,
        type === "income"
          ? styles.incomeBorder
          : type === "expense"
            ? styles.expenseBorder
            : styles.goalBorder,
      ]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <LinearGradient
        colors={
          type === "income"
            ? [
                "rgba(34, 197, 94, 0.30)",
                "rgba(34, 197, 94, 0.16)",
                "rgba(34, 197, 94, 0.07)",
                "rgba(34, 197, 94, 0.01)",
              ]
            : type === "expense"
              ? [
                  "rgba(239, 68, 68, 0.30)",
                  "rgba(239, 68, 68, 0.16)",
                  "rgba(239, 68, 68, 0.07)",
                  "rgba(239, 68, 68, 0.01)",
                ]
              : [
                  "rgba(240, 184, 60, 0.30)",
                  "rgba(240, 184, 60, 0.16)",
                  "rgba(240, 184, 60, 0.07)",
                  "rgba(240, 184, 60, 0.01)",
                ]
        }
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1.2, y: 0.5 }}
        style={styles.container}
      >
        <View style={styles.iconContainer}>
          <Feather name={icon} size={28} style={styles.icon} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.description}>{description}</Text>
        </View>

        <Feather name="chevron-right" size={24} style={styles.arrow} />
      </LinearGradient>
    </TouchableOpacity>
  );
};
