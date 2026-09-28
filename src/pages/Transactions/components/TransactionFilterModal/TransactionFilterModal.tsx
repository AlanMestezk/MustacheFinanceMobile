import { Feather } from "@expo/vector-icons";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles/TransactionFilterModal.styles";

interface TransactionFilterModalProps {
  visible: boolean;
  onClose: () => void;
}

export const TransactionFilterModal = ({
  visible,
  onClose,
}: TransactionFilterModalProps) => {
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
            <TouchableOpacity style={styles.dateField}>
              <Text style={styles.dateLabel}>De</Text>

              <View style={styles.dateButton}>
                <Feather name="calendar" size={19} style={styles.dateIcon} />

                <Text style={styles.dateText}>01/09/2026</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.dateField}>
              <Text style={styles.dateLabel}>Até</Text>

              <View style={styles.dateButton}>
                <Feather name="calendar" size={19} style={styles.dateIcon} />

                <Text style={styles.dateText}>28/09/2026</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Aplicar filtro</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <View>
            <Text style={styles.reportTitle}>Relatório</Text>

            <Text style={styles.reportDescription}>
              Baixe um relatório em PDF do período
              {"\n"}
              selecionado
            </Text>

            <TouchableOpacity style={styles.pdfButton}>
              <Feather name="file-text" size={22} style={styles.pdfIcon} />

              <Text style={styles.pdfText}>Baixar relatório em PDF</Text>

              <Feather name="chevron-right" size={22} style={styles.pdfArrow} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
