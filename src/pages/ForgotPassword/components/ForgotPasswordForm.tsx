import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles } from "./styles/ForgotPasswordForm.styles";

export const ForgotPasswordForm = () => {
  const router = useRouter();

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
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>ENVIAR LINK</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.login} onPress={handleBackToLogin}>
        <Text style={styles.loginText}>
          Lembrou sua senha?{" "}
          <Text style={styles.loginHighlight}>Voltar para login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
