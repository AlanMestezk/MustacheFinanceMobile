import { StyleSheet } from "react-native";

import { colors } from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 18,
    height: 64,

    backgroundColor: "rgba(255, 255, 255, 0.06)",

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",

    borderRadius: 18,

    marginBottom: 24,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    color: colors.primary,
    marginRight: 12,
  },

  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },

  arrow: {
    color: "rgba(255, 255, 255, 0.55)",
  },
});
