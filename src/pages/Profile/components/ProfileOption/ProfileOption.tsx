import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles/ProfileOption.styles";

interface ProfileOptionProps {
  title: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
  onPress?: () => void;
}

export const ProfileOption = ({
  title,
  description,
  icon,
  onPress,
}: ProfileOptionProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Feather name={icon} size={20} style={styles.icon} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>{description}</Text>
      </View>

      <Feather name="chevron-right" size={20} style={styles.arrow} />
    </TouchableOpacity>
  );
};
