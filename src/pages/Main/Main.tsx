import { Feather } from "@expo/vector-icons";

import { doc, getDoc } from "firebase/firestore";

import { useEffect, useState } from "react";

import { Text, TouchableOpacity, View } from "react-native";

import { auth } from "../../firebase/auth";

import { db } from "../../firebase/firestore";

import { Navbar } from "./components/NavBar/NavBar";

import { styles } from "./styles/Main.styles";

export const Main = () => {
  const [name, setName] = useState("");

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

          setName(userData.name);
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
        <View>
          <Text style={styles.greeting}>Olá, {name || "usuário"}! 👋</Text>

          <Text style={styles.subtitle}>
            Aqui está o resumo das suas finanças.
          </Text>
        </View>

        <TouchableOpacity style={styles.profileButton}>
          <Feather name="user" size={21} color={styles.profileIcon.color} />
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

      <View style={styles.transactionsHeader}>
        <Text style={styles.sectionTitle}>Transações recentes</Text>

        <Text style={styles.seeAll}>Ver todas</Text>
      </View>

      <View style={styles.emptyState}>
        <Feather name="inbox" size={32} color={styles.emptyIcon.color} />

        <Text style={styles.emptyTitle}>Nenhuma transação ainda</Text>

        <Text style={styles.emptyDescription}>
          Suas transações aparecerão aqui.
        </Text>
      </View>

      <Navbar />
    </View>
  );
};
