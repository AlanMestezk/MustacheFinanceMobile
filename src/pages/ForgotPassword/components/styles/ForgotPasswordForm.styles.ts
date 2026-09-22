import { StyleSheet } from "react-native";

import { colors } from "../../../../styles/colors";

export const styles = StyleSheet.create({
  form: {
    width: "80%",
    marginTop: 28,
    gap: 24,
  },

  input: {
    height: 48,
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    borderBottomWidth: 3,
    borderBottomColor: "rgb(255, 255, 255)",
    paddingHorizontal: 4,
    paddingVertical: 0,
  },

  button: {
    marginTop: 12,
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
    marginTop: 4,
    width: "100%",
  },

  loginText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: "Popins",
    textAlign: "center",
  },

  loginHighlight: {
    color: colors.primaryLight,
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Popins",
    textAlign: "center",
  },
  error: {
    color: "#ff6b6b",
    fontSize: 13,
    textAlign: "center",
  },

  success: {
    color: "#4ade80",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
