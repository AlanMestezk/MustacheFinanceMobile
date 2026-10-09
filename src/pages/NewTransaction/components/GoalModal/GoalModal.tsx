import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
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

import { auth } from "../../../../firebase/auth";
import { db } from "../../../../firebase/firestore";

import { getCategoryIcon } from "../CategoryIcons/categoryIcons";
import { CategoryPicker } from "../CategoryModal/CategoryPicker";
import { styles } from "./styles/GoalModal.styles";

interface GoalModalProps {
  visible: boolean;
  onClose: () => void;
  onReopen: () => void;
}

export const GoalModal = ({ visible, onClose, onReopen }: GoalModalProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [initialAmount, setInitialAmount] = useState("");
  const [date, setDate] = useState(new Date());

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const [categoryPickerVisible, setCategoryPickerVisible] = useState(false);

  const [openCategoryAfterDismiss, setOpenCategoryAfterDismiss] =
    useState(false);

  const [saving, setSaving] = useState(false);

  const goalCategories = [
    "Viagem",
    "Compras",
    "Tecnologia",
    "Casa",
    "Estudo",
    "Investimento",
    "Lazer",
    "Outros",
  ];

  const parseCurrency = (value: string) => {
    const normalizedValue = value.replace(/\./g, "").replace(",", ".");

    return Number(normalizedValue);
  };

  const handleOpenCategoryPicker = () => {
    if (Platform.OS === "ios") {
      setOpenCategoryAfterDismiss(true);
      onClose();
      return;
    }

    setCategoryPickerVisible(true);
  };

  const handleGoalModalDismiss = () => {
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

  const handleCreateGoal = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.log("Usuário não autenticado.");
      return;
    }

    if (!name || !category || !goalAmount) {
      console.log("Preencha o nome, categoria e valor desejado.");
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
        category,
        amount: numericInitialAmount,
        goalAmount: numericGoalAmount,
        date,
        createdAt: serverTimestamp(),
      });

      console.log("Meta criada com sucesso!");

      setName("");
      setCategory("");
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
    <>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
        onDismiss={handleGoalModalDismiss}
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

              {/* CATEGORIA */}
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

      <CategoryPicker
        visible={categoryPickerVisible}
        onClose={handleCloseCategoryPicker}
        onSelect={handleSelectCategory}
        onDismiss={handleCategoryPickerDismiss}
        categories={goalCategories}
      />
    </>
  );
};
