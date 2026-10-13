import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { updatePassword } from "firebase/auth";
import { useState } from "react";
import {
    ActivityIndicator,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { auth } from "../../../../firebase/auth";
import { styles } from "./styles/Security.styles";

type DialogType = "success" | "error";

export default function Security() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  const [dialog, setDialog] = useState({
    visible: false,
    title: "",
    message: "",
    type: "success" as DialogType,
  });

  const showDialog = (title: string, message: string, type: DialogType) => {
    setDialog({
      visible: true,
      title,
      message,
      type,
    });
  };

  const closeDialog = () => {
    setDialog((current) => ({
      ...current,
      visible: false,
    }));
  };

  const handleSavePassword = async () => {
    const user = auth.currentUser;

    if (!user) {
      showDialog(
        "Atenção",
        "Você precisa estar logado para alterar sua senha.",
        "error",
      );
      return;
    }

    const newPassword = password.trim();

    if (!newPassword) {
      showDialog(
        "Campo obrigatório",
        "Digite sua nova senha para continuar.",
        "error",
      );
      return;
    }

    if (newPassword.length < 6) {
      showDialog(
        "Senha inválida",
        "A nova senha deve ter pelo menos 6 caracteres.",
        "error",
      );
      return;
    }

    try {
      setSaving(true);

      await updatePassword(user, newPassword);

      setPassword("");
      setShowPassword(false);

      showDialog(
        "Senha alterada!",
        "Sua nova senha foi salva com sucesso. Sua conta continua protegida.",
        "success",
      );
    } catch (error: unknown) {
      const firebaseError = error as { code?: string };

      console.error("Erro ao alterar senha:", firebaseError.code, error);

      if (firebaseError.code === "auth/requires-recent-login") {
        showDialog(
          "Autenticação necessária",
          "Por segurança, entre novamente na sua conta antes de alterar a senha.",
          "error",
        );
        return;
      }

      if (firebaseError.code === "auth/weak-password") {
        showDialog(
          "Senha fraca",
          "Escolha uma senha mais forte para proteger sua conta.",
          "error",
        );
        return;
      }

      if (firebaseError.code === "auth/network-request-failed") {
        showDialog(
          "Erro de conexão",
          "Verifique sua conexão com a internet e tente novamente.",
          "error",
        );
        return;
      }

      showDialog(
        "Erro ao salvar",
        "Não foi possível alterar sua senha. Tente novamente.",
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
            <Text style={styles.title}>Segurança</Text>
            <Text style={styles.subtitle}>Proteja o acesso à sua conta</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Feather name="shield" size={28} color="#D4A72C" />
          </View>

          <Text style={styles.infoTitle}>Seus dados estão protegidos</Text>

          <Text style={styles.infoDescription}>
            Seus dados são protegidos por mecanismos de segurança e
            criptografia. Trabalhamos para manter suas informações pessoais
            seguras e preservar sua privacidade.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Alterar senha</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Nova senha</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Digite sua nova senha"
                placeholderTextColor="#777B8A"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
              />

              <TouchableOpacity
                style={styles.visibilityButton}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#A7A9B7"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.helperText}>
              A senha deve ter pelo menos 6 caracteres.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.saveButton,
            (!password.trim() || saving) && styles.disabledButton,
          ]}
          onPress={handleSavePassword}
          disabled={!password.trim() || saving}
          activeOpacity={0.8}
        >
          {saving ? (
            <ActivityIndicator color="#171923" />
          ) : (
            <Text style={styles.saveButtonText}>Salvar nova senha</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={dialog.visible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={closeDialog}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View
              style={[
                styles.dialogIcon,
                dialog.type === "success"
                  ? styles.dialogIconSuccess
                  : styles.dialogIconError,
              ]}
            >
              <Feather
                name={
                  dialog.type === "success" ? "check-circle" : "alert-circle"
                }
                size={34}
                color={dialog.type === "success" ? "#D4A72C" : "#F87171"}
              />
            </View>

            <Text style={styles.modalTitle}>{dialog.title}</Text>

            <Text style={styles.modalDescription}>{dialog.message}</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={closeDialog}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText}>Entendi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
