import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles } from "./styles/LoginForm.styles";

export const LoginForm = () => {
  const router = useRouter();

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
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}>
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
