import { StyleSheet } from "react-native";

import { colors } from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    padding: 20,
    marginTop: 10,
    marginBottom: 20,
  },

  content: {
    flex: 1,
  },

  title: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "700",
  },

  userName: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: "600",
    marginTop: 4,
  },

  subtitle: {
    color: "rgba(255, 255, 255, 0.55)",
    fontSize: 14,
    marginTop: 6,
  },

  appIcon: {
    width: 64,
    height: 64,
    resizeMode: "contain",
    marginLeft: 12,
  },
});
