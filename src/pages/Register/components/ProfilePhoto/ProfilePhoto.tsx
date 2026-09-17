import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles/ProfilePhoto.styles";

export const ProfilePhoto = () => {
  const [image, setImage] = useState<string | null>(null);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.photoButton} onPress={handlePickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.photo} />
        ) : (
          <Text style={styles.camera}>📷</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Add profile photo</Text>
    </View>
  );
};
