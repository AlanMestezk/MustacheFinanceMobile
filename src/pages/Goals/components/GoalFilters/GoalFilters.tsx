import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles/GoalFilters.styles";

export const GoalFilters = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={handleOpenModal}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          <Feather name="sliders" size={21} style={styles.icon} />

          <Text style={styles.title}>Filtrar metas</Text>
        </View>

        <Feather name="chevron-right" size={21} style={styles.arrow} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.handle} />

            <View style={styles.header}>
              <View>
                <Text style={styles.modalTitle}>Filtros</Text>

                <Text style={styles.modalSubtitle}>Organize suas metas</Text>
              </View>

              <TouchableOpacity onPress={handleCloseModal}>
                <Feather name="x" size={26} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Status</Text>

              <TouchableOpacity style={styles.optionActive}>
                <View style={styles.optionContent}>
                  <Feather
                    name="list"
                    size={19}
                    style={styles.optionIconActive}
                  />

                  <Text style={styles.optionTextActive}>Todas</Text>
                </View>

                <Feather name="check" size={20} style={styles.checkIcon} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.option}>
                <View style={styles.optionContent}>
                  <Feather name="clock" size={19} style={styles.optionIcon} />

                  <Text style={styles.optionText}>Em andamento</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.option}>
                <View style={styles.optionContent}>
                  <Feather
                    name="check-circle"
                    size={19}
                    style={styles.optionIcon}
                  />

                  <Text style={styles.optionText}>Concluídas</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.option}>
                <View style={styles.optionContent}>
                  <Feather
                    name="alert-circle"
                    size={19}
                    style={styles.optionIcon}
                  />

                  <Text style={styles.optionText}>Atrasadas</Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleCloseModal}
            >
              <Feather name="check" size={20} style={styles.applyIcon} />

              <Text style={styles.applyText}>Aplicar filtro</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
