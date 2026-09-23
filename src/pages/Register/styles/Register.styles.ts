import { StyleSheet } from "react-native";

import { colors } from "../../../styles/colors";

export const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    backgroundColor: "rgba(13, 47, 80, 0.90)",
  },

  contentForeground: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 35,
  },

  logo: {
    width: 280,
    height: 120,
    resizeMode: "contain",
  },

  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "700",
    marginTop: 10,

    textShadowColor: "rgba(0, 0, 0, 0.45)",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 4,
  },
});
