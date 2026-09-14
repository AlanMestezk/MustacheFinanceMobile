import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles } from "./styles/LoginForm.styles";

export const LoginForm = () => {
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

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.register}>
        <Text style={styles.registerText}>
          Primeira vez aqui?{" "}
          <Text style={styles.registerHighlight}>Crie sua conta aqui</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
