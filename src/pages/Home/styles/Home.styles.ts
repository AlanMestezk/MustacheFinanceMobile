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

  logo: {
    width: 380,
    height: 380,
    resizeMode: "contain",
  },
  subtitle: {
    marginTop: -170,
    fontSize: 15,
    lineHeight: 27,
    fontWeight: "700",
    textAlign: "center",
    color: colors.white,

    textShadowColor: "rgb(0, 0, 0)",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 3,
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
    backgroundColor: "rgba(13, 47, 80, 0.93)",
  },

  contentForeground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
