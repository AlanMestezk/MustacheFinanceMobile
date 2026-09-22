import { useRouter } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { auth } from "../../../firebase/auth";

import { styles } from "./styles/ForgotPasswordForm.styles";

export const ForgotPasswordForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);

      setMessage("Link de recuperação enviado! Verifique seu e-mail.");
    } catch (error) {
      setError("Não foi possível enviar o link de recuperação.");
    }
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      {message && <Text style={styles.success}>{message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>ENVIAR LINK</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.login} onPress={handleBackToLogin}>
        <Text style={styles.loginText}>
          Lembrou ou já cadastrou sua nova senha?
        </Text>

        <Text style={styles.loginHighlight}>Voltar para login</Text>
      </TouchableOpacity>
    </View>
  );
};
