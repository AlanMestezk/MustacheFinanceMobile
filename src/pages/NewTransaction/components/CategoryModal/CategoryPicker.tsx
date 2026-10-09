import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { getCategoryIcon } from "../CategoryIcons/categoryIcons";
import { styles } from "./styles/CategoryPicker.styles";

interface CategoryPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (category: string) => void;
  categories: string[];
  onDismiss?: () => void;
}

export const CategoryPicker = ({
  visible,
  onClose,
  onSelect,
  onDismiss,
  categories,
}: CategoryPickerProps) => {
  const handleSelect = (category: string) => {
    console.log("Categoria selecionada:", category);
    onSelect(category);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      presentationStyle="overFullScreen"
      onRequestClose={onClose}
      onDismiss={onDismiss}
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
            keyboardShouldPersistTaps="handled"
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
