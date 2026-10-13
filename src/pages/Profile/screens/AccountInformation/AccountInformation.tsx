import { Feather } from "@expo/vector-icons";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useRouter } from "expo-router";
import { auth } from "../../../../firebase/auth";
import { db } from "../../../../firebase/firestore";
import { styles } from "./styles/AccountInformation.styles";

export const AccountInformation = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [originalName, setOriginalName] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const loadUserData = async () => {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Atenção", "Você precisa estar logado.");
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);

        setEmail(user.email ?? "");

        let currentName = user.displayName ?? "";
        let currentPhoto = user.photoURL ?? null;

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();

          currentName = userData.name ?? currentName;
          // Aceita os dois nomes de campo usados no projeto.
          currentPhoto = userData.photoUrl ?? userData.photoURL ?? currentPhoto;
        }

        setName(currentName);
        setPhotoUrl(currentPhoto);
        setOriginalName(currentName);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        Alert.alert("Erro", "Não foi possível carregar seus dados.");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const hasNameChanged = name.trim() !== originalName.trim();
  const hasChanges = hasNameChanged;

  const handleSave = async () => {
    const user = auth.currentUser;
    const trimmedName = name.trim();

    if (!user) {
      Alert.alert("Atenção", "Você precisa estar logado.");
      return;
    }

    if (!trimmedName) {
      Alert.alert("Nome obrigatório", "Informe seu nome antes de salvar.");
      return;
    }

    if (!hasChanges) {
      return;
    }

    try {
      setSaving(true);

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { name: trimmedName });

      setName(trimmedName);
      setOriginalName(trimmedName);
      setSuccessVisible(true);
    } catch (error: unknown) {
      const saveError = error as {
        code?: string;
        message?: string;
        serverResponse?: string;
      };

      console.error("Erro ao salvar perfil:", error);
      console.error("Código do erro:", saveError.code);
      console.error("Mensagem do erro:", saveError.message);
      console.error("Resposta do servidor:", saveError.serverResponse);

      Alert.alert(
        "Erro ao salvar",
        saveError.message ?? "Não foi possível salvar as alterações.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#D4A72C" />
      </View>
    );
  }

  return (
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
          <Text style={styles.title}>Informações da conta</Text>
          <Text style={styles.subtitle}>Gerencie seus dados pessoais</Text>
        </View>
      </View>

      <View style={styles.photoSection}>
        <View style={styles.photoContainer}>
          {photoUrl ? (
            <Image source={{ uri: photoUrl }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Feather name="user" size={48} color="#A7A9B7" />
            </View>
          )}
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
            placeholderTextColor="#777B8A"
            autoCapitalize="words"
            maxLength={80}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.field}>
            <Text style={styles.emailText}>
              {email || "E-mail não disponível"}
            </Text>
          </View>
          <Text style={styles.helperText}>O e-mail não pode ser alterado.</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.saveButton,
          (!hasChanges || saving) && styles.disabledButton,
        ]}
        onPress={handleSave}
        disabled={!hasChanges || saving}
        activeOpacity={0.8}
      >
        {saving ? (
          <ActivityIndicator color="#171923" />
        ) : (
          <Text style={styles.saveButtonText}>Salvar alterações</Text>
        )}
      </TouchableOpacity>

      {successVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.successIcon}>
              <Feather name="check-circle" size={36} color="#D4A72C" />
            </View>

            <Text style={styles.modalTitle}>Tudo certo!</Text>
            <Text style={styles.modalDescription}>
              Suas informações foram atualizadas com sucesso.
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setSuccessVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};
