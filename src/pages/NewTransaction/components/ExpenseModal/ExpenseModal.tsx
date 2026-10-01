import { Feather } from "@expo/vector-icons";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles } from "./styles/ExpenseModal.styles";

interface ExpenseModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ExpenseModal = ({ visible, onClose }: ExpenseModalProps) => {
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
                <Feather name="arrow-up" size={22} style={styles.headerIcon} />
              </View>

              <View>
                <Text style={styles.title}>Nova saída</Text>
                <Text style={styles.subtitle}>Registre um novo gasto</Text>
              </View>
            </View>

            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={26} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Valor</Text>

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
              <Text style={styles.label}>Descrição</Text>

              <View style={styles.inputContainer}>
                <Feather name="edit-3" size={18} style={styles.inputIcon} />

                <TextInput
                  style={styles.input}
                  placeholder="Ex: Mercado"
                  placeholderTextColor="rgba(255,255,255,0.30)"
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Categoria</Text>

              <TouchableOpacity style={styles.inputContainer}>
                <Feather name="tag" size={18} style={styles.inputIcon} />

                <Text style={styles.selectText}>Selecionar categoria</Text>

                <Feather
                  name="chevron-down"
                  size={19}
                  style={styles.selectIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Data</Text>

              <TouchableOpacity style={styles.inputContainer}>
                <Feather name="calendar" size={18} style={styles.inputIcon} />

                <Text style={styles.selectText}>01/10/2026</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton}>
            <Feather name="minus" size={20} style={styles.submitIcon} />

            <Text style={styles.submitText}>Adicionar saída</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
