import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { auth } from "../../../firebase/auth";

import { styles } from "./styles/RegisterForm.styles";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      router.replace("/loading");
    } catch (error) {
      setError("Não foi possível criar sua conta. Verifique os campos.");
    }
  };

  const handleLogin = () => {
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

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>CRIAR CONTA</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.login} onPress={handleLogin}>
        <Text style={styles.loginText}>
          Já possui conta?{" "}
          <Text style={styles.loginHighlight}>Clique aqui</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
