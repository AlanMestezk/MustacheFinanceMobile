import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { auth } from "@/firebase/auth";
import { ProfileCard } from "./components/ProfileCard/ProfileCard";
import { ProfileHeader } from "./components/ProfileHeader/ProfileHeader";
import { ProfileOption } from "./components/ProfileOption/ProfileOption";
import { styles } from "./styles/Profile.styles";

export const Profile = () => {
  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      await signOut(auth);

      setLogoutDialogVisible(false);

      router.dismissAll();
      router.replace("/");
    } catch (error) {
      console.error("Erro ao sair da conta:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ProfileHeader />

      <ProfileCard />

      {/* Conta */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conta</Text>

        <ProfileOption
          title="Informações da conta"
          description="Edite seus dados pessoais"
          icon="user"
          onPress={() => router.push("/account-information")}
        />

        <ProfileOption
          title="Segurança"
          description="Senha e segurança da conta"
          icon="lock"
          onPress={() => router.push("/security-information")}
        />
      </View>

      {/* Preferências */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferências</Text>

        <ProfileOption
          title="Notificações"
          description="Configure suas notificações"
          icon="bell"
          onPress={() => router.push("/notifications-information")}
        />
      </View>

      {/* Sair */}
      <TouchableOpacity
        style={styles.logoutButton}
        activeOpacity={0.7}
        onPress={() => setLogoutDialogVisible(true)}
      >
        <View style={styles.logoutContent}>
          <Feather name="log-out" size={20} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </View>
      </TouchableOpacity>

      {/* Diálogo de confirmação */}
      <Modal
        visible={logoutDialogVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => {
          if (!isLoggingOut) {
            setLogoutDialogVisible(false);
          }
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.dialogIcon}>
              <Feather name="log-out" size={28} color="#D4A72C" />
            </View>

            <Text style={styles.modalTitle}>Sair da conta?</Text>

            <Text style={styles.modalDescription}>
              Tem certeza de que deseja sair da sua conta?
            </Text>

            <TouchableOpacity
              style={styles.confirmLogoutButton}
              activeOpacity={0.8}
              disabled={isLoggingOut}
              onPress={handleLogout}
            >
              <Text style={styles.confirmLogoutText}>
                {isLoggingOut ? "Saindo..." : "Sim, sair da conta"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelLogoutButton}
              activeOpacity={0.8}
              disabled={isLoggingOut}
              onPress={() => setLogoutDialogVisible(false)}
            >
              <Text style={styles.cancelLogoutText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
