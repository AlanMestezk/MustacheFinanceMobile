import { Feather } from "@expo/vector-icons";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { router } from "expo-router";
import { auth } from "../../../../firebase/auth";
import { db } from "../../../../firebase/firestore";
import { styles } from "./styles/Notifications.styles";

export default function Notifications() {
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadPreferences = async () => {
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        Alert.alert("Atenção", "Você precisa estar logado.");
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          const preferences = snapshot.data().notificationPreferences;

          if (typeof preferences?.enabled === "boolean") {
            setEnabled(preferences.enabled);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar preferências de notificações:", error);

        Alert.alert("Erro", "Não foi possível carregar suas preferências.");
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const handleToggle = async (value: boolean) => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Atenção", "Você precisa estar logado.");
      return;
    }

    const previousValue = enabled;

    setEnabled(value);
    setSaving(true);

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          notificationPreferences: {
            enabled: value,
          },
        },
        { merge: true },
      );
    } catch (error) {
      console.error("Erro ao salvar preferência de notificações:", error);

      setEnabled(previousValue);

      Alert.alert(
        "Erro ao salvar",
        "Não foi possível atualizar sua preferência. Tente novamente.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D4A72C" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/profile")}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.title}>Notificações</Text>
          <Text style={styles.subtitle}>
            Gerencie seus lembretes financeiros
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardIcon}>
          <Feather name="bell" size={24} color="#D4A72C" />
        </View>

        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>Receber notificações</Text>

          <Text style={styles.cardDescription}>
            {enabled
              ? "Você receberá lembretes para manter suas finanças organizadas."
              : "Seus lembretes financeiros estão desativados."}
          </Text>
        </View>

        <Switch
          value={enabled}
          onValueChange={handleToggle}
          disabled={saving}
          trackColor={{
            false: "#363A50",
            true: "#8C752C",
          }}
          thumbColor={enabled ? "#D4A72C" : "#A7A9B7"}
          ios_backgroundColor="#363A50"
        />
      </View>

      {saving && (
        <View style={styles.savingIndicator}>
          <ActivityIndicator size="small" color="#D4A72C" />
          <Text style={styles.savingText}>Salvando preferência...</Text>
        </View>
      )}
    </ScrollView>
  );
}
