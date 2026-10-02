import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

//@ts-ignore
import appIcon from "../../../../../assets/logo/icon.png";
import { auth } from "../../../../firebase/auth";
import { db } from "../../../../firebase/firestore";
import { styles } from "./styles/GoalsHeader.styles";

export const GoalsHeader = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const user = auth.currentUser;

      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();

          setName(userData.name || "");
        }
      } catch (error) {
        console.error("Erro ao carregar nome do usuário:", error);
      }
    };

    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Metas</Text>

        <Text style={styles.userName}>{name || "Usuário"}</Text>

        <Text style={styles.subtitle}>
          Seus objetivos, mais perto da realidade.
        </Text>
      </View>

      <Image source={appIcon} style={styles.appIcon} />
    </View>
  );
};
