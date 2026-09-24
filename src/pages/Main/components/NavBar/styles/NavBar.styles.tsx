import { StyleSheet } from "react-native";

import { colors } from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",

    left: 16,
    right: 16,
    bottom: 50,

    height: 72,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    backgroundColor: "rgba(13, 47, 80, 0.94)",

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",

    borderRadius: 24,

    paddingHorizontal: 8,
  },

  item: {
    flex: 1,

    height: "100%",

    alignItems: "center",
    justifyContent: "center",

    gap: 4,
  },

  icon: {
    color: "rgba(255, 255, 255, 0.55)",
  },

  activeIcon: {
    color: colors.primaryLight,
  },

  label: {
    color: "rgba(255, 255, 255, 0.55)",

    fontSize: 10,

    fontWeight: "500",
  },

  activeLabel: {
    color: colors.primaryLight,

    fontSize: 10,

    fontWeight: "700",
  },

  addButton: {
    width: 52,
    height: 52,

    borderRadius: 26,

    backgroundColor: colors.primary,

    alignItems: "center",
    justifyContent: "center",

    marginHorizontal: 4,
  },

  addIcon: {
    color: colors.background,
  },
});
