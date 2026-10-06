import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { TransactionFilterModal } from "../TransactionFilterModal/TransactionFilterModal";
import { styles } from "./styles/TransactionFilters.styles";

interface TransactionFiltersProps {
  onViewReport: (startDate: Date, endDate: Date) => void;
}

export const TransactionFilters = ({
  onViewReport,
}: TransactionFiltersProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleViewReport = (startDate: Date, endDate: Date) => {
    setModalVisible(false);

    onViewReport(startDate, endDate);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={handleOpenModal}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          <Feather name="sliders" size={22} style={styles.icon} />

          <Text style={styles.title}>Filtrar</Text>
        </View>

        <Feather name="chevron-right" size={22} style={styles.arrow} />
      </TouchableOpacity>

      <TransactionFilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onViewReport={handleViewReport}
      />
    </>
  );
};
