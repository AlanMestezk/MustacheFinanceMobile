import * as ImagePicker from "expo-image-picker";

import { Image, Text, TouchableOpacity, View } from "react-native";

import { Feather } from "@expo/vector-icons";

import { styles } from "./styles/ProfilePhoto.styles";

interface ProfilePhotoProps {
  image: string | null;
  onImageSelected: (uri: string) => void;
}

export const ProfilePhoto = ({ image, onImageSelected }: ProfilePhotoProps) => {
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.photoButton} onPress={handlePickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.photo} />
        ) : (
          <Feather name="camera" size={28} color="rgba(255, 255, 255, 0.75)" />
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Add profile photo</Text>
    </View>
  );
};
