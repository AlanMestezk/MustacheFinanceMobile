import { Feather } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles/GoalCard.style";

export const GoalCard = () => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.85}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
          }}
          style={styles.image}
        />

        <View style={styles.imageOverlay} />

        <View style={styles.goalIcon}>
          <Feather name="navigation" size={20} style={styles.icon} />
        </View>

        <View style={styles.status}>
          <Text style={styles.statusText}>Em andamento</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Viagem para Europa</Text>

        <Text style={styles.amount}>
          R$ 2.000 <Text style={styles.target}>de R$ 10.000</Text>
        </Text>

        <View style={styles.progressRow}>
          <View style={styles.progressBackground}>
            <View style={styles.progress} />
          </View>

          <Text style={styles.percentage}>20%</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.dateContainer}>
            <Feather name="calendar" size={15} style={styles.dateIcon} />

            <Text style={styles.date}>30/06/2027</Text>
          </View>

          <Text style={styles.remaining}>Faltam 8 meses</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
