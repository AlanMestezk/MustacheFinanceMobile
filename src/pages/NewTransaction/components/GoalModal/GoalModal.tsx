import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

import { auth } from "../../../../firebase/auth";
import { db } from "../../../../firebase/firestore";

import { styles } from "./styles/GoalModal.styles";

interface GoalModalProps {
  visible: boolean;
  onClose: () => void;
}

export const GoalModal = ({ visible, onClose }: GoalModalProps) => {
  const [name, setName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [initialAmount, setInitialAmount] = useState("");
  const [date, setDate] = useState(new Date());

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const [saving, setSaving] = useState(false);

  const parseCurrency = (value: string) => {
    const normalizedValue = value.replace(/\./g, "").replace(",", ".");

    return Number(normalizedValue);
  };

  const handleCreateGoal = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.log("Usuário não autenticado.");
      return;
    }

    if (!name || !goalAmount) {
      console.log("Preencha o nome e o valor desejado.");
      return;
    }

    const numericGoalAmount = parseCurrency(goalAmount);

    const numericInitialAmount = initialAmount
      ? parseCurrency(initialAmount)
      : 0;

    if (isNaN(numericGoalAmount) || numericGoalAmount <= 0) {
      console.log("Valor desejado inválido.");
      return;
    }

    if (isNaN(numericInitialAmount) || numericInitialAmount < 0) {
      console.log("Valor inicial inválido.");
      return;
    }

    try {
      setSaving(true);

      await addDoc(collection(db, "users", user.uid, "investments"), {
        description: name,
        amount: numericInitialAmount,
        goalAmount: numericGoalAmount,
        date,
        createdAt: serverTimestamp(),
      });

      console.log("Meta criada com sucesso!");

      setName("");
      setGoalAmount("");
      setInitialAmount("");
      setDate(new Date());

      onClose();
    } catch (error) {
      console.error("Erro ao criar meta:", error);
    } finally {
      setSaving(false);
    }
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

            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <Feather name="x" size={26} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            {/* NOME */}
            <View style={styles.field}>
              <Text style={styles.label}>Nome da meta</Text>

              <View style={styles.inputContainer}>
                <Feather name="target" size={18} style={styles.inputIcon} />

                <TextInput
                  style={styles.input}
                  placeholder="Ex: Viagem para a Europa"
                  placeholderTextColor="rgba(255,255,255,0.30)"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            {/* VALOR DESEJADO */}
            <View style={styles.field}>
              <Text style={styles.label}>Valor desejado</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.currency}>R$</Text>

                <TextInput
                  style={styles.input}
                  placeholder="0,00"
                  placeholderTextColor="rgba(255,255,255,0.30)"
                  keyboardType="decimal-pad"
                  value={goalAmount}
                  onChangeText={setGoalAmount}
                />
              </View>
            </View>

            {/* VALOR INICIAL */}
            <View style={styles.field}>
              <Text style={styles.label}>Valor inicial</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.currency}>R$</Text>

                <TextInput
                  style={styles.input}
                  placeholder="0,00"
                  placeholderTextColor="rgba(255,255,255,0.30)"
                  keyboardType="decimal-pad"
                  value={initialAmount}
                  onChangeText={setInitialAmount}
                />
              </View>
            </View>

            {/* DATA LIMITE */}
            <View style={styles.field}>
              <Text style={styles.label}>Data limite</Text>

              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setDatePickerVisible(true)}
                activeOpacity={0.7}
              >
                <Feather name="calendar" size={18} style={styles.inputIcon} />

                <Text style={styles.selectText}>
                  {date.toLocaleDateString("pt-BR")}
                </Text>
              </TouchableOpacity>

              {datePickerVisible && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setDatePickerVisible(false);

                    if (selectedDate) {
                      setDate(selectedDate);
                    }
                  }}
                />
              )}
            </View>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleCreateGoal}
            activeOpacity={0.7}
            disabled={saving}
          >
            <Feather name="target" size={20} style={styles.submitIcon} />

            <Text style={styles.submitText}>
              {saving ? "Criando..." : "Criar meta"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
