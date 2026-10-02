import { Feather } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { ProfileCard } from "./components/ProfileCard/ProfileCard";
import { ProfileHeader } from "./components/ProfileHeader/ProfileHeader";
import { ProfileOption } from "./components/ProfileOption/ProfileOption";
import { styles } from "./styles/Profile.styles";

export const Profile = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ProfileHeader />

      <ProfileCard />

      {/* Conta */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conta</Text>

        <ProfileOption
          title="Informações da conta"
          description="Edite seus dados pessoais"
          icon="user"
        />

        <ProfileOption
          title="Segurança"
          description="Senha e segurança da conta"
          icon="lock"
        />
      </View>

      {/* Preferências */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferências</Text>

        <ProfileOption
          title="Notificações"
          description="Configure suas notificações"
          icon="bell"
        />
      </View>

      {/* Sair */}
      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
        <View style={styles.logoutContent}>
          <Feather name="log-out" size={20} style={styles.logoutIcon} />

          <Text style={styles.logoutText}>Sair da conta</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};
