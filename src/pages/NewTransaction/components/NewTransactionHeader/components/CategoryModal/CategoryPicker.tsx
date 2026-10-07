import { Feather } from "@expo/vector-icons";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles/CategoryPicker.styles";

interface CategoryPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (category: string) => void;
  categories: string[];
}

export const CategoryPicker = ({
  visible,
  onClose,
  onSelect,
  categories,
}: CategoryPickerProps) => {
  const getCategoryIcon = (category: string): keyof typeof Feather.glyphMap => {
    const icons: Record<string, keyof typeof Feather.glyphMap> = {
      Renda: "briefcase",
      "Renda extra": "dollar-sign",
      Investimentos: "trending-up",
      Presente: "gift",
      Prêmio: "award",
      Reembolso: "rotate-ccw",
      Outros: "package",

      // Categorias que serão utilizadas futuramente
      Alimentação: "coffee",
      Transporte: "truck",
      Casa: "home",
      Lazer: "play-circle",
      Compras: "shopping-bag",
      Saúde: "heart",
      Educação: "book",
      Contas: "credit-card",
      Entretenimento: "play-circle",
    };

    return icons[category] || "tag";
  };

  const handleSelect = (category: string) => {
    onSelect(category);
    onClose();
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
              <Text style={styles.title}>Selecionar categoria</Text>

              <Text style={styles.subtitle}>Escolha uma categoria</Text>
            </View>

            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <Feather name="x" size={25} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.categoryScroll}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          >
            <View style={styles.categoryList}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={styles.categoryButton}
                  onPress={() => handleSelect(category)}
                  activeOpacity={0.7}
                >
                  <View style={styles.categoryIcon}>
                    <Feather
                      name={getCategoryIcon(category)}
                      size={19}
                      style={styles.icon}
                    />
                  </View>

                  <Text style={styles.categoryText}>{category}</Text>

                  <Feather
                    name="chevron-right"
                    size={20}
                    style={styles.arrow}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
