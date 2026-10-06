import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles/TransactionFilterModal.styles";

interface TransactionFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onViewReport: (startDate: Date, endDate: Date) => void;
}

export const TransactionFilterModal = ({
  visible,
  onClose,
  onViewReport,
}: TransactionFilterModalProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);

  const [endDate, setEndDate] = useState(new Date());
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleViewReport = () => {
    const normalizedStartDate = new Date(startDate);
    normalizedStartDate.setHours(0, 0, 0, 0);

    const normalizedEndDate = new Date(endDate);
    normalizedEndDate.setHours(23, 59, 59, 999);

    onViewReport(normalizedStartDate, normalizedEndDate);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Filtros</Text>

              <Text style={styles.subtitle}>
                Defina o período das transações
                {"\n"}
                que deseja visualizar
              </Text>
            </View>

            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={26} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Período</Text>

          <View style={styles.dateRow}>
            {/* DATA INICIAL */}
            <TouchableOpacity
              style={styles.dateField}
              onPress={() => setShowStartPicker(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.dateLabel}>De</Text>

              <View style={styles.dateButton}>
                <Feather name="calendar" size={19} style={styles.dateIcon} />

                <Text style={styles.dateText}>
                  {startDate.toLocaleDateString("pt-BR")}
                </Text>
              </View>
            </TouchableOpacity>

            {showStartPicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowStartPicker(false);

                  if (selectedDate) {
                    setStartDate(selectedDate);
                  }
                }}
              />
            )}

            {/* DATA FINAL */}
            <TouchableOpacity
              style={styles.dateField}
              onPress={() => setShowEndPicker(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.dateLabel}>Até</Text>

              <View style={styles.dateButton}>
                <Feather name="calendar" size={19} style={styles.dateIcon} />

                <Text style={styles.dateText}>
                  {endDate.toLocaleDateString("pt-BR")}
                </Text>
              </View>
            </TouchableOpacity>

            {showEndPicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowEndPicker(false);

                  if (selectedDate) {
                    setEndDate(selectedDate);
                  }
                }}
              />
            )}
          </View>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.pdfButton}
            onPress={handleViewReport}
            activeOpacity={0.7}
          >
            <Feather name="file-text" size={22} style={styles.pdfIcon} />

            <Text style={styles.pdfText}>Visualizar relatório</Text>

            <Feather name="chevron-right" size={22} style={styles.pdfArrow} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
