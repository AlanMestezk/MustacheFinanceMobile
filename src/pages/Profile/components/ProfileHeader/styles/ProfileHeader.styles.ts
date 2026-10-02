import { StyleSheet } from "react-native";

import { colors } from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },

  content: {
    flex: 1,
  },

  title: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "700",
  },

  subtitle: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 14,
    marginTop: 5,
  },

  appIcon: {
    width: 64,
    height: 64,
    resizeMode: "contain",
    marginLeft: 12,
  },
});
