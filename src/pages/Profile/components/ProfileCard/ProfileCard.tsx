import { Feather } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

import { auth } from "../../../../firebase/auth";
import { db } from "../../../../firebase/firestore";
import { styles } from "./styles/ProfileCard.styles";

export const ProfileCard = () => {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const user = auth.currentUser;

      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();

          setName(userData.name || "");
          setPhotoUrl(userData.photoUrl || null);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };

    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        {photoUrl ? (
          <Image source={{ uri: photoUrl }} style={styles.photo} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Feather name="user" size={42} style={styles.placeholderIcon} />
          </View>
        )}
      </View>

      <Text style={styles.name}>{name || "Usuário"}</Text>
    </View>
  );
};
