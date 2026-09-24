import { Feather } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";

import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles/NavBar.styles";

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.replace("/main")}
      >
        <Feather
          name="home"
          size={22}
          color={
            pathname === "/main" ? styles.activeIcon.color : styles.icon.color
          }
        />

        <Text style={pathname === "/main" ? styles.activeLabel : styles.label}>
          Início
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push("/transactions")}
      >
        <Feather
          name="repeat"
          size={22}
          color={
            pathname === "/transactions"
              ? styles.activeIcon.color
              : styles.icon.color
          }
        />

        <Text
          style={
            pathname === "/transactions" ? styles.activeLabel : styles.label
          }
        >
          Transações
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/new-transaction")}
      >
        <Feather name="plus" size={26} color={styles.addIcon.color} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push("/goals")}
      >
        <Feather
          name="target"
          size={22}
          color={
            pathname === "/goals" ? styles.activeIcon.color : styles.icon.color
          }
        />

        <Text style={pathname === "/goals" ? styles.activeLabel : styles.label}>
          Metas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push("/profile")}
      >
        <Feather
          name="user"
          size={22}
          color={
            pathname === "/profile"
              ? styles.activeIcon.color
              : styles.icon.color
          }
        />

        <Text
          style={pathname === "/profile" ? styles.activeLabel : styles.label}
        >
          Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
};
