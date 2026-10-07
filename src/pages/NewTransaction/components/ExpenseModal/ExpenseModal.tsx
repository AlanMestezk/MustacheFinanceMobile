import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

import { auth } from "../../../../firebase/auth";
import { db } from "../../../../firebase/firestore";

import { CategoryPicker } from "../NewTransactionHeader/components/CategoryModal/CategoryPicker";
import { styles } from "./styles/ExpenseModal.styles";

interface ExpenseModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ExpenseModal = ({ visible, onClose }: ExpenseModalProps) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());

  const [categoryPickerVisible, setCategoryPickerVisible] = useState(false);

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const [saving, setSaving] = useState(false);

  const expenseCategories = [
    "Alimentação",
    "Transporte",
    "Casa",
    "Lazer",
    "Compras",
    "Saúde",
    "Educação",
    "Contas",
    "Entretenimento",
    "Outros",
  ];

  const handleAddExpense = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.log("Usuário não autenticado.");
      return;
    }

    if (!amount || !description || !category) {
      console.log("Preencha todos os campos.");
      return;
    }

    const numericAmount = Number(amount.replace(",", "."));

    if (isNaN(numericAmount) || numericAmount <= 0) {
      console.log("Valor da saída inválido.");
      return;
    }

    try {
      setSaving(true);

      await addDoc(collection(db, "users", user.uid, "expenses"), {
        amount: numericAmount,
        description,
        category,
        date,
        createdAt: serverTimestamp(),
      });

      console.log("Saída adicionada com sucesso!");

      setAmount("");
      setDescription("");
      setCategory("");
      setDate(new Date());

      onClose();
    } catch (error) {
      console.error("Erro ao adicionar saída:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
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
                  <Feather
                    name="arrow-up"
                    size={22}
                    style={styles.headerIcon}
                  />
                </View>

                <View>
                  <Text style={styles.title}>Nova saída</Text>

                  <Text style={styles.subtitle}>Registre um novo gasto</Text>
                </View>
              </View>

              <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
                <Feather name="x" size={26} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              {/* VALOR */}
              <View style={styles.field}>
                <Text style={styles.label}>Valor</Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.currency}>R$</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="0,00"
                    placeholderTextColor="rgba(255,255,255,0.30)"
                    keyboardType="decimal-pad"
                    value={amount}
                    onChangeText={setAmount}
                  />
                </View>
              </View>

              {/* DESCRIÇÃO */}
              <View style={styles.field}>
                <Text style={styles.label}>Descrição</Text>

                <View style={styles.inputContainer}>
                  <Feather name="edit-3" size={18} style={styles.inputIcon} />

                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Mercado"
                    placeholderTextColor="rgba(255,255,255,0.30)"
                    value={description}
                    onChangeText={setDescription}
                  />
                </View>
              </View>

              {/* CATEGORIA */}
              <View style={styles.field}>
                <Text style={styles.label}>Categoria</Text>

                <TouchableOpacity
                  style={styles.inputContainer}
                  onPress={() => setCategoryPickerVisible(true)}
                  activeOpacity={0.7}
                >
                  <Feather name="tag" size={18} style={styles.inputIcon} />

                  <Text style={styles.selectText}>
                    {category || "Selecionar categoria"}
                  </Text>

                  <Feather
                    name="chevron-down"
                    size={19}
                    style={styles.selectIcon}
                  />
                </TouchableOpacity>
              </View>

              {/* DATA */}
              <View style={styles.field}>
                <Text style={styles.label}>Data</Text>

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

            {/* BOTÃO */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddExpense}
              activeOpacity={0.7}
              disabled={saving}
            >
              <Feather name="minus" size={20} style={styles.submitIcon} />

              <Text style={styles.submitText}>
                {saving ? "Adicionando..." : "Adicionar saída"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <CategoryPicker
        visible={categoryPickerVisible}
        onClose={() => setCategoryPickerVisible(false)}
        onSelect={(selectedCategory) => setCategory(selectedCategory)}
        categories={expenseCategories}
      />
    </>
  );
};
