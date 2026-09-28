import { StyleSheet } from "react-native";

import { colors } from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    padding: 16,

    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
    borderRadius: 18,

    marginBottom: 10,
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 15,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255, 255, 255, 0.08)",

    marginRight: 12,
  },

  icon: {
    color: colors.primary,
  },

  content: {
    flex: 1,
  },

  title: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
  },

  description: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 12,
    marginTop: 4,
  },

  incomeAmount: {
    color: "#4ade80",
    fontSize: 14,
    fontWeight: "700",
  },

  expenseAmount: {
    color: "#ff6b6b",
    fontSize: 14,
    fontWeight: "700",
  },
});
