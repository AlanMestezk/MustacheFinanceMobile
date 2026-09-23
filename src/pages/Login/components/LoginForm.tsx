import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ArrowRight } from "lucide-react-native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { auth } from "../../../firebase/auth";

import { colors } from "@/styles/colors";
import { styles } from "./styles/LoginForm.styles";

export const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
              n
            />
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR</Text>

          <ArrowRight size={22} color={colors.background} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />

        <Text style={styles.dividerText}>ou</Text>

        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => router.push("/forgot-password")}
      >
        <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.register} onPress={handleRegister}>
        <Text style={styles.registerText}>
          Primeira vez aqui?{" "}
          <Text style={styles.registerHighlight}>Crie sua conta</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
