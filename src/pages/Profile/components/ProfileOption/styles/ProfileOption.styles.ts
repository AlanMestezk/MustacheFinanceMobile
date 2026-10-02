import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    marginBottom: 8,
  },

  iconContainer: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "rgba(240,184,60,0.10)",
  },

  icon: {
    color: "#f0b83c",
  },

  content: {
    flex: 1,
    marginLeft: 13,
  },

  title: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "600",
  },

  description: {
    color: "rgba(255,255,255,0.42)",
    fontSize: 12,
    marginTop: 4,
  },

  arrow: {
    color: "rgba(255,255,255,0.40)",
    marginLeft: 10,
  },
});
