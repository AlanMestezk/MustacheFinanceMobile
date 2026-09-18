import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { auth } from "../../../firebase/auth";

import { styles } from "./styles/LoginForm.styles";

export const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      router.replace("/loading");
    } catch (error) {
      setError("E-mail ou senha inválidos.");
    }
  };

  const handleRegister = () => {
    router.push("/register");
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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => router.push("/forgot-password")}
      >
        <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.register} onPress={handleRegister}>
        <Text style={styles.registerText}>
          Primeira vez aqui?{" "}
          <Text style={styles.registerHighlight}>Crie sua conta aqui</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
