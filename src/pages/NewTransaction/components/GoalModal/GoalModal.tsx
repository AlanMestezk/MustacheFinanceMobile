import { Feather } from "@expo/vector-icons";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles } from "./styles/GoalModal.styles";

interface GoalModalProps {
  visible: boolean;
  onClose: () => void;
}

export const GoalModal = ({ visible, onClose }: GoalModalProps) => {
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
            <View style={styles.headerContent}>
              <View style={styles.iconContainer}>
                <Feather name="target" size={22} style={styles.headerIcon} />
              </View>

              <View>
                <Text style={styles.title}>Nova meta</Text>

                <Text style={styles.subtitle}>
                  Defina um objetivo financeiro
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={26} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Nome da meta</Text>

              <View style={styles.inputContainer}>
                <Feather name="target" size={18} style={styles.inputIcon} />

                <TextInput
                  style={styles.input}
                  placeholder="Ex: Viagem para a Europa"
                  placeholderTextColor="rgba(255,255,255,0.30)"
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Valor desejado</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.currency}>R$</Text>

                <TextInput
                  style={styles.input}
                  placeholder="0,00"
                  placeholderTextColor="rgba(255,255,255,0.30)"
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Valor inicial</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.currency}>R$</Text>

                <TextInput
                  style={styles.input}
                  placeholder="0,00"
                  placeholderTextColor="rgba(255,255,255,0.30)"
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Data limite</Text>

              <TouchableOpacity style={styles.inputContainer}>
                <Feather name="calendar" size={18} style={styles.inputIcon} />

                <Text style={styles.selectText}>31/12/2026</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton}>
            <Feather name="target" size={20} style={styles.submitIcon} />

            <Text style={styles.submitText}>Criar meta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
