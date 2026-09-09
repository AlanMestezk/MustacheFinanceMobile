import { StyleSheet } from "react-native";

import { colors } from "../../../styles/colors";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "700",
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: "contain",
  },
  subtitle: {
    marginTop: 24,
    fontSize: 19,
    lineHeight: 27,
    fontWeight: "700",
    textAlign: "center",
    color: colors.white,
  },

  highlightGold: {
    color: colors.primaryLight,
  },

  highlightTeal: {
    color: colors.primaryTeal,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(1, 2, 3, 0.8)",
  },

  contentForeground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
