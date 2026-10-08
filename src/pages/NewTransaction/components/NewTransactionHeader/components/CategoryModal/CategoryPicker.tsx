import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

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
  const getCategoryIcon = (
    category: string,
  ): keyof typeof MaterialCommunityIcons.glyphMap => {
    const icons: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> =
      {
        // Categorias de entrada
        Renda: "briefcase",
        "Renda extra": "cash-plus",
        Investimentos: "trending-up",
        Presente: "gift",
        Prêmio: "trophy",
        Reembolso: "cash-refund",
        Outros: "package-variant",

        // Categorias de saída
        Alimentação: "food",
        Transporte: "car",
        Casa: "home",
        Lazer: "party-popper",
        Compras: "shopping",
        Saúde: "heart-pulse",
        Educação: "book-open-variant",
        Contas: "credit-card-outline",
        Entretenimento: "movie-open",

        // Categorias de metas
        Viagem: "bag-checked",
        Tecnologia: "cellphone",
        Veículo: "car",
        Estudo: "book-open-variant",
        Investimento: "trending-up",
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
                    <MaterialCommunityIcons
                      name={getCategoryIcon(category)}
                      size={20}
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
