import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";

import { auth } from "../../firebase/auth";
import {
  db,
  getUserExpenses,
  getUserIncomes,
  getUserInvestments,
} from "../../firebase/firestore";

import { colors } from "@/styles/colors";

import { styles } from "./styles/Main.styles";

// @ts-ignore
import appIcon from "../../../assets/logo/icon.png";

interface MustacheMaskProps {
  color: string;
}

const MustacheMask = ({ color }: MustacheMaskProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      <MaterialCommunityIcons name="mustache" size={25} color={color} />

      <MaterialCommunityIcons name="mustache" size={25} color={color} />

      <MaterialCommunityIcons name="mustache" size={25} color={color} />
    </View>
  );
};

export const Main = () => {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);

  const [goal, setGoal] = useState<any | null>(null);

  const [refreshing, setRefreshing] = useState(false);

  const [valuesVisible, setValuesVisible] = useState(true);

  const rotation = useRef(new Animated.Value(0)).current;

  const loadDashboard = async () => {
    const user = auth.currentUser;

    if (!user) {
      return;
    }

    const rotationAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    );

    try {
      setRefreshing(true);

      rotation.setValue(0);
      rotationAnimation.start();

      // =========================
      // USUÁRIO
      // =========================

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();

        setName(userData.name || "");
        setPhotoURL(userData.photoUrl || null);
      }

      // =========================
      // ENTRADAS
      // =========================

      const incomes = await getUserIncomes(user.uid);

      const totalIncomes = incomes.reduce((total, income) => {
        return total + Number(income.amount || 0);
      }, 0);

      setIncomeTotal(totalIncomes);

      // =========================
      // SAÍDAS
      // =========================

      const expenses = await getUserExpenses(user.uid);

      const totalExpenses = expenses.reduce((total, expense) => {
        return total + Number(expense.amount || 0);
      }, 0);

      setExpenseTotal(totalExpenses);

      // =========================
      // META MAIS RECENTE
      // =========================

      const investments = await getUserInvestments(user.uid);

      if (investments.length > 0) {
        setGoal(investments[0]);
      } else {
        setGoal(null);
      }
    } catch (error) {
      console.error("Erro ao atualizar dashboard:", error);
    } finally {
      setTimeout(() => {
        rotationAnimation.stop();
        rotation.setValue(0);
        setRefreshing(false);
      }, 800);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const balance = incomeTotal - expenseTotal;

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const goalProgress =
    goal && Number(goal.goalAmount) > 0
      ? Math.min(
          (Number(goal.amount || 0) / Number(goal.goalAmount)) * 100,
          100,
        )
      : 0;

  const rotationInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      {/* HEADER */}

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
          onPress={loadDashboard}
          activeOpacity={0.7}
          disabled={refreshing}
        >
          <Animated.View
            style={{
              transform: [
                {
                  rotate: rotationInterpolate,
                },
              ],
            }}
          >
            <Feather name="rotate-cw" size={30} color={colors.primary} />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* SALDO */}

      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceLabel}>SALDO DISPONÍVEL</Text>

          <TouchableOpacity
            onPress={() => setValuesVisible((visible) => !visible)}
            activeOpacity={0.7}
          >
            <Feather
              name={valuesVisible ? "eye" : "eye-off"}
              size={20}
              color={styles.balanceIcon.color}
            />
          </TouchableOpacity>
        </View>

        {valuesVisible ? (
          <Text style={styles.balance}>{formatCurrency(balance)}</Text>
        ) : (
          <MustacheMask color={colors.white} />
        )}

        <Text style={styles.balanceDescription}>Seu saldo atual</Text>
      </View>

      {/* ENTRADAS / SAÍDAS */}

      <View style={styles.summary}>
        <View style={styles.summaryCard}>
          <Feather
            name="arrow-down-left"
            size={20}
            color={styles.incomeIcon.color}
          />

          <Text style={styles.summaryLabel}>ENTRADAS</Text>

          {valuesVisible ? (
            <Text style={styles.incomeValue}>
              {formatCurrency(incomeTotal)}
            </Text>
          ) : (
            <MustacheMask color={styles.incomeValue.color} />
          )}
        </View>

        <View style={styles.summaryCard}>
          <Feather
            name="arrow-up-right"
            size={20}
            color={styles.expenseIcon.color}
          />

          <Text style={styles.summaryLabel}>SAÍDAS</Text>

          {valuesVisible ? (
            <Text style={styles.expenseValue}>
              {formatCurrency(expenseTotal)}
            </Text>
          ) : (
            <MustacheMask color={styles.expenseValue.color} />
          )}
        </View>
      </View>

      {/* META RECENTE */}

      <View style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <Text style={styles.sectionTitle}>Meta recente</Text>
        </View>

        {goal ? (
          <>
            <View style={styles.goalTop}>
              <View style={styles.goalIconContainer}>
                <Feather name="target" size={24} color={colors.primary} />
              </View>

              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>
                  {goal.description || "Meta sem nome"}
                </Text>

                {valuesVisible ? (
                  <Text style={styles.goalDescription}>
                    {formatCurrency(Number(goal.amount || 0))} de{" "}
                    {formatCurrency(Number(goal.goalAmount || 0))}
                  </Text>
                ) : (
                  <MustacheMask color={styles.goalDescription.color} />
                )}
              </View>
            </View>

            <View style={styles.goalProgressContainer}>
              <View style={styles.goalProgressBackground}>
                <View
                  style={[
                    styles.goalProgress,
                    {
                      width: `${goalProgress}%`,
                    },
                  ]}
                />
              </View>

              <Text style={styles.goalProgressText}>
                {Math.round(goalProgress)}%
              </Text>
            </View>
          </>
        ) : (
          <>
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
          </>
        )}
      </View>
    </View>
  );
};
