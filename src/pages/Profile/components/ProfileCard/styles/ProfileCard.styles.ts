import { StyleSheet } from "react-native";

import { colors } from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 5,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(240,184,60,0.20)",
    borderRadius: 24,
  },

  photoContainer: {
    position: "relative",
    marginBottom: 8,
  },

  photo: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#f0b83c",
  },

  photoPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 3,
    borderColor: "#f0b83c",
  },

  placeholderIcon: {
    color: "rgba(255,255,255,0.40)",
  },

  cameraButton: {
    position: "absolute",
    right: -2,
    bottom: 0,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: "#f0b83c",
    borderWidth: 3,
    borderColor: colors.background,
  },

  cameraIcon: {
    color: "#3b2a05",
  },

  name: {
    color: colors.white,
    fontSize: 19,
    fontWeight: "700",
  },
});
