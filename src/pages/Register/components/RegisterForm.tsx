import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { router } from "expo-router";

import { styles } from "./styles/RegisterForm.styles";

export const RegisterForm = () => {
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
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}>
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
