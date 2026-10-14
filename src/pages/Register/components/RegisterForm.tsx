import { Feather } from "@expo/vector-icons";
import * as ImageManipulator from "expo-image-manipulator";
import { router } from "expo-router";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { auth } from "../../../firebase/auth";
import { db } from "../../../firebase/firestore";

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
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async () => {
    if (isRegistering) return;

    setError("");

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedName || !normalizedEmail || !password) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    if (password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    setIsRegistering(true);

    try {
      // Cria a conta no Firebase Authentication.
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        normalizedEmail,
        password,
      );

      const user = userCredential.user;

      // A foto é opcional e será salva como Base64 no Firestore.
      let photoUrl = "";

      if (image) {
        try {
          const manipulatedImage = await ImageManipulator.manipulateAsync(
            image,
            [{ resize: { width: 800 } }],
            {
              compress: 0.7,
              format: ImageManipulator.SaveFormat.JPEG,
              base64: true,
            },
          );

          if (!manipulatedImage.base64) {
            throw new Error(
              "O processamento da imagem não retornou conteúdo Base64.",
            );
          }

          photoUrl = `data:image/jpeg;base64,${manipulatedImage.base64}`;
        } catch (photoError) {
          console.error("Erro ao processar a foto de perfil:", photoError);

          // A foto não é obrigatória para concluir o cadastro.
          photoUrl = "";
        }
      }

      // Salva os dados do usuário no Firestore.
      await setDoc(doc(db, "users", user.uid), {
        name: trimmedName,
        email: user.email,
        photoUrl,
        createdAt: serverTimestamp(),
        notificationPreferences: {
          enabled: true,
        },
      });

      router.replace("/loading");
    } catch (registerError) {
      console.error("Erro ao criar conta:", registerError);

      if (registerError instanceof FirebaseError) {
        switch (registerError.code) {
          case "auth/email-already-in-use":
            setError(
              "Este e-mail já está cadastrado. Entre na sua conta ou use outro e-mail.",
            );
            break;

          case "auth/invalid-email":
            setError("Informe um endereço de e-mail válido.");
            break;

          case "auth/weak-password":
            setError("Escolha uma senha com pelo menos 6 caracteres.");
            break;

          case "auth/network-request-failed":
            setError(
              "Falha de conexão. Verifique sua internet e tente novamente.",
            );
            break;

          case "auth/operation-not-allowed":
            setError("O cadastro por e-mail e senha não está habilitado.");
            break;

          case "permission-denied":
          case "firestore/permission-denied":
            setError(
              "Não foi possível salvar seus dados. Verifique as permissões do Firestore.",
            );
            break;

          default:
            setError("Não foi possível concluir o cadastro. Tente novamente.");
        }
      } else {
        setError("Ocorreu um erro inesperado. Tente novamente.");
      }
    } finally {
      setIsRegistering(false);
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
          editable={!isRegistering}
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          editable={!isRegistering}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Senha"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            editable={!isRegistering}
          />

          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setShowPassword((previous) => !previous)}
            disabled={isRegistering}
          >
            <Feather
              name={showPassword ? "eye-off" : "eye"}
              size={21}
              color="rgba(255, 255, 255, 0.7)"
            />
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={isRegistering}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {isRegistering ? "CRIANDO CONTA..." : "CRIAR CONTA"}
          </Text>

          {!isRegistering && (
            <Feather name="arrow-right" size={22} color={colors.background} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>ou</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity
        style={styles.login}
        onPress={handleLogin}
        disabled={isRegistering}
      >
        <Text style={styles.loginText}>
          Já possui uma conta?{" "}
          <Text style={styles.loginHighlight}>Voltar para login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
