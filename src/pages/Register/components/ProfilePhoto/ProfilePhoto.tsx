import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles/ProfilePhoto.styles";

export const ProfilePhoto = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.photoButton}>
        <Text style={styles.camera}>📷</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Add profile photo</Text>
    </View>
  );
};
