import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import {
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import { auth } from "../../../../firebase/auth";
import { db } from "../../../../firebase/firestore";

import { getCategoryIcon } from "../CategoryIcons/categoryIcons";
import { CategoryPicker } from "../CategoryModal/CategoryPicker";
import { styles } from "./styles/IncomeModal.styles";

interface IncomeModalProps {
  visible: boolean;
  onClose: () => void;
  onReopen: () => void;
}

export const IncomeModal = ({
  visible,
  onClose,
  onReopen,
}: IncomeModalProps) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const [categoryPickerVisible, setCategoryPickerVisible] = useState(false);

  const [openCategoryAfterDismiss, setOpenCategoryAfterDismiss] =
    useState(false);

  const [saving, setSaving] = useState(false);

  const incomeCategories = [
    "Renda",
    "Renda extra",
    "Investimentos",
    "Presente",
    "Prêmio",
    "Reembolso",
    "Outros",
  ];

  const handleOpenCategoryPicker = () => {
    if (Platform.OS === "ios") {
      setOpenCategoryAfterDismiss(true);
      onClose();
      return;
    }

    setCategoryPickerVisible(true);
  };

  const handleIncomeModalDismiss = () => {
    if (openCategoryAfterDismiss) {
      setOpenCategoryAfterDismiss(false);
      setCategoryPickerVisible(true);
    }
  };

  const handleCloseCategoryPicker = () => {
    setCategoryPickerVisible(false);
  };

  const handleCategoryPickerDismiss = () => {
    if (Platform.OS === "ios") {
      requestAnimationFrame(() => {
        onReopen();
      });
    }
  };

  const handleSelectCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
    handleCloseCategoryPicker();
  };

  const handleAddIncome = async () => {
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
      console.log("Valor da entrada inválido.");
      return;
    }

    try {
      setSaving(true);

      await addDoc(collection(db, "users", user.uid, "incomes"), {
        amount: numericAmount,
        description,
        category,
        date,
        createdAt: serverTimestamp(),
      });

      console.log("Entrada adicionada com sucesso!");

      setAmount("");
      setDescription("");
      setCategory("");
      setDate(new Date());

      onClose();
    } catch (error) {
      console.error("Erro ao adicionar entrada:", error);
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
        onDismiss={handleIncomeModalDismiss}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.handle} />

            <View style={styles.header}>
              <View style={styles.headerContent}>
                <View style={styles.iconContainer}>
                  <Feather
                    name="arrow-down"
                    size={22}
                    style={styles.headerIcon}
                  />
                </View>

                <View>
                  <Text style={styles.title}>Nova entrada</Text>

                  <Text style={styles.subtitle}>Adicione uma nova receita</Text>
                </View>
              </View>

              <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
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
                    placeholderTextColor="rgba(255, 255, 255, 0.30)"
                    keyboardType="decimal-pad"
                    value={amount}
                    onChangeText={setAmount}
                  />
                </View>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Descrição</Text>

                <View style={styles.inputContainer}>
                  <Feather name="edit-3" size={18} style={styles.inputIcon} />

                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Salário"
                    placeholderTextColor="rgba(255, 255, 255, 0.30)"
                    value={description}
                    onChangeText={setDescription}
                  />
                </View>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Categoria</Text>

                <TouchableOpacity
                  style={styles.inputContainer}
                  onPress={handleOpenCategoryPicker}
                  activeOpacity={0.7}
                >
                  {category ? (
                    <MaterialCommunityIcons
                      name={getCategoryIcon(category)}
                      size={18}
                      style={styles.inputIcon}
                    />
                  ) : (
                    <Feather name="tag" size={18} style={styles.inputIcon} />
                  )}

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

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddIncome}
              activeOpacity={0.7}
              disabled={saving}
            >
              <Feather name="plus" size={20} style={styles.submitIcon} />

              <Text style={styles.submitText}>
                {saving ? "Adicionando..." : "Adicionar entrada"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <CategoryPicker
        visible={categoryPickerVisible}
        onClose={handleCloseCategoryPicker}
        onSelect={handleSelectCategory}
        onDismiss={handleCategoryPickerDismiss}
        categories={incomeCategories}
      />
    </>
  );
};
