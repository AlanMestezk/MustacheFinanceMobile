import { StyleSheet } from "react-native";

import { colors } from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },

  photoButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "rgb(255, 255, 255)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },

  camera: {
    fontSize: 28,
  },

  label: {
    marginTop: 8,
    color: colors.textSecondary,
    fontSize: 13,
  },
});
