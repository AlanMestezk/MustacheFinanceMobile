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

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  gif: {
    width: 500,
    height: 300,
  },

  loadingText: {
    marginTop: -40,
    color: colors.white,
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 0.3,
    fontFamily: "Popins",
  },
});
