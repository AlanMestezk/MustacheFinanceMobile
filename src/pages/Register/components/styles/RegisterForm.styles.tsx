import { StyleSheet } from "react-native";

import { colors } from "../../../../styles/colors";

export const styles = StyleSheet.create({
  form: {
    width: "80%",
    marginTop: 10,
    gap: 20,
  },

  input: {
    height: 48,
    color: colors.white,
    fontSize: 18,
    borderBottomWidth: 3,
    borderBottomColor: "rgb(255, 255, 255)",
    paddingHorizontal: 4,
    paddingVertical: 0,
    fontWeight: "bold",
  },

  button: {
    marginTop: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  login: {
    alignItems: "center",
    marginTop: 8,
  },

  loginText: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  loginHighlight: {
    color: colors.primaryLight,
    fontWeight: "700",
  },
});
