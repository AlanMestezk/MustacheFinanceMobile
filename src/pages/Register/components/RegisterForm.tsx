import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { auth } from "../../../firebase/auth";

import { colors } from "@/styles/colors";
import { styles } from "./styles/RegisterForm.styles";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

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
    <View style={styles.container}>
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

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Senha"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setShowPassword((previous) => !previous)}
          >
            <Feather
              name={showPassword ? "eye-off" : "eye"}
              size={21}
              color="rgba(255, 255, 255, 0.7)"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirmar senha"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setShowConfirmPassword((previous) => !previous)}
          >
            <Feather
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={21}
              color="rgba(255, 255, 255, 0.7)"
            />
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>CRIAR CONTA</Text>

          <Feather name="arrow-right" size={22} color={colors.background} />
        </TouchableOpacity>
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />

        <Text style={styles.dividerText}>ou</Text>

        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity style={styles.login} onPress={handleLogin}>
        <Text style={styles.loginText}>
          Já possui uma conta?{" "}
          <Text style={styles.loginHighlight}>Voltar para login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
