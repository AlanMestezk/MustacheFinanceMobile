import { StyleSheet } from "react-native";

import { colors } from "../../../../styles/colors";

export const styles = StyleSheet.create({
  form: {
    width: "80%",
    marginTop: 20,
    gap: 24,
  },

  input: {
    height: 48,
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    borderBottomWidth: 3,
    borderBottomColor: "rgba(255, 255, 255, 0.97)",
    paddingHorizontal: 4,
    paddingVertical: 0,
  },

  error: {
    color: "#ff6b6b",
    fontSize: 13,
    textAlign: "center",
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
  forgotPassword: {
    alignItems: "center",
    marginTop: 4,
  },

  forgotPasswordText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "Popins",

    textShadowColor: "rgb(0, 0, 0)",
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 3,
  },

  register: {
    alignItems: "center",
    marginTop: 8,
    textShadowColor: "rgb(0, 0, 0)",
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 1,
  },

  registerText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "Popins",

    textShadowColor: "rgb(0, 0, 0)",
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 3,
  },

  registerHighlight: {
    color: colors.primaryLight,
    fontWeight: "700",
  },
});
