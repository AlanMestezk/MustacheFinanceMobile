import { StyleSheet } from "react-native";

import { colors } from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
    borderRadius: 26,
    overflow: "hidden",

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
  },

  container: {
    minHeight: 112,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  iconContainer: {
    width: 58,
    height: 58,

    borderRadius: 18,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255, 255, 255, 0.07)",
  },

  icon: {
    color: colors.white,
  },

  content: {
    flex: 1,
    marginLeft: 16,
  },

  title: {
    color: colors.white,
    fontSize: 19,
    fontWeight: "700",
  },

  description: {
    color: "rgba(255, 255, 255, 0.55)",
    fontSize: 13,
    marginTop: 5,
  },

  arrow: {
    color: "rgb(255, 255, 255)",
    marginLeft: 10,
  },
  incomeBorder: {
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.35)",
  },

  expenseBorder: {
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.35)",
  },

  goalBorder: {
    borderWidth: 1,
    borderColor: "rgba(240, 184, 60, 0.35)",
  },
});
