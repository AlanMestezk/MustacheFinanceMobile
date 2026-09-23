import { StyleSheet } from "react-native";

import { colors } from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
    marginTop: 28,
  },

  form: {
    width: "100%",
    padding: 22,

    backgroundColor: "rgba(255, 255, 255, 0.07)",

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.14)",

    borderRadius: 24,

    gap: 16,
  },

  input: {
    height: 54,

    color: colors.white,
    fontSize: 16,
    fontWeight: "500",

    backgroundColor: "rgba(255, 255, 255, 0.06)",

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.16)",

    borderRadius: 14,

    paddingHorizontal: 16,
  },

  error: {
    color: "#ff6b6b",
    fontSize: 13,
    textAlign: "center",
    marginTop: -4,
  },

  button: {
    height: 54,
    marginTop: 4,
    backgroundColor: colors.primary,
    borderRadius: 27,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  buttonText: {
    color: colors.background,
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  buttonArrowContainer: {
    marginLeft: 14,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonArrow: {
    color: colors.background,
    fontSize: 30,
    fontWeight: "600",
    lineHeight: 30,
  },

  divider: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 4,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.39)",
  },

  dividerText: {
    color: "rgba(255, 255, 255, 0.65)",
    fontSize: 13,
    marginHorizontal: 12,
  },

  forgotPassword: {
    alignItems: "center",
    marginTop: 2,
  },

  forgotPasswordText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: "Popins",
    textAlign: "center",
    opacity: 0.9,
  },

  passwordContainer: {
    height: 54,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "rgba(255, 255, 255, 0.06)",

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.16)",

    borderRadius: 14,
  },

  passwordInput: {
    flex: 1,

    height: "100%",

    color: colors.white,
    fontSize: 16,
    fontWeight: "500",

    paddingHorizontal: 16,
  },

  passwordToggle: {
    width: 50,
    height: "100%",

    alignItems: "center",
    justifyContent: "center",
  },

  register: {
    alignItems: "center",
    marginTop: 4,
  },

  registerText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: "Popins",
    textAlign: "center",
    opacity: 0.9,
  },

  registerHighlight: {
    color: colors.primaryLight,
    fontWeight: "700",
  },
});
