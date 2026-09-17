import { StyleSheet } from "react-native";

import { colors } from "../../../styles/colors";

export const styles = StyleSheet.create({
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
    backgroundColor: "rgba(13, 47, 80, 0.93)",
  },

  contentForeground: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 10,
  },

  logo: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    marginTop: -70,
  },

  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "700",
    marginTop: -120,

    textShadowColor: "rgb(0, 0, 0)",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 3,
  },

  description: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 12,
    maxWidth: 320,
  },
});
