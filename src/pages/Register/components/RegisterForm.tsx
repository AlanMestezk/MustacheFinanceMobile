import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { auth } from "../../../firebase/auth";
import { db } from "../../../firebase/firestore";
import { storage } from "../../../firebase/storage";

import { colors } from "@/styles/colors";

import { styles } from "./styles/RegisterForm.styles";

interface RegisterFormProps {
  image: string | null;
}

export const RegisterForm = ({ image }: RegisterFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      let photoURL: string | null = null;

      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();

        const photoRef = ref(storage, `profilePhotos/${user.uid}`);

        await uploadBytes(photoRef, blob);

        photoURL = await getDownloadURL(photoRef);
      }

      await setDoc(doc(db, "users", user.uid), {
        name,
        email: user.email,
        photoURL,
        createdAt: serverTimestamp(),
      });

      router.replace("/loading");
    } catch (error) {
      console.error("Erro ao criar conta:", error);

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
          placeholder="Nome"
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          autoCapitalize="words"
          value={name}
          onChangeText={setName}
        />

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
