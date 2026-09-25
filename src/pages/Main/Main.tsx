import { Feather } from "@expo/vector-icons";

import { doc, getDoc } from "firebase/firestore";

import { useEffect, useState } from "react";

import { Image, Text, TouchableOpacity, View } from "react-native";

import { auth } from "../../firebase/auth";

import { db } from "../../firebase/firestore";

import { Navbar } from "./components/NavBar/NavBar";

import { styles } from "./styles/Main.styles";

import { router } from "expo-router";

import { colors } from "@/styles/colors";
// @ts-ignore
import appIcon from "../../../assets/logo/icon.png";

export const Main = () => {
  const [name, setName] = useState("");

  const [photoURL, setPhotoURL] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const user = auth.currentUser;

      if (!user) {
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();

          console.log("Dados do Firestore:", userData);

          setName(userData.name);
          setPhotoURL(userData.photoUrl);
        }
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    };

    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileButton}>
          {photoURL ? (
            <Image source={{ uri: photoURL }} style={styles.profilePhoto} />
          ) : (
            <Feather name="user" size={21} color={styles.profileIcon.color} />
          )}
        </TouchableOpacity>

        <Image source={appIcon} style={styles.appIcon} />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/new-transaction")}
        >
          <Feather name="plus" size={34} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceLabel}>SALDO DISPONÍVEL</Text>

          <Feather name="eye" size={20} color={styles.balanceIcon.color} />
        </View>

        <Text style={styles.balance}>R$ 0,00</Text>

        <Text style={styles.balanceDescription}>Seu saldo atual</Text>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryCard}>
          <Feather
            name="arrow-down-left"
            size={20}
            color={styles.incomeIcon.color}
          />

          <Text style={styles.summaryLabel}>ENTRADAS</Text>

          <Text style={styles.incomeValue}>R$ 0,00</Text>
        </View>

        <View style={styles.summaryCard}>
          <Feather
            name="arrow-up-right"
            size={20}
            color={styles.expenseIcon.color}
          />

          <Text style={styles.summaryLabel}>SAÍDAS</Text>

          <Text style={styles.expenseValue}>R$ 0,00</Text>
        </View>
      </View>

      <View style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <Text style={styles.sectionTitle}>Meta recente</Text>
        </View>

        <View style={styles.goalTop}>
          <View style={styles.goalIconContainer}>
            <Feather name="target" size={24} color={colors.primary} />
          </View>

          <View style={styles.goalInfo}>
            <Text style={styles.goalTitle}>Nenhuma meta criada</Text>

            <Text style={styles.goalDescription}>
              Crie uma meta para começar a acompanhar seus objetivos.
            </Text>
          </View>
        </View>

        <View style={styles.goalProgressContainer}>
          <View style={styles.goalProgressBackground}>
            <View style={styles.goalProgress} />
          </View>

          <Text style={styles.goalProgressText}>0%</Text>
        </View>
      </View>

      <Navbar />
    </View>
  );
};
