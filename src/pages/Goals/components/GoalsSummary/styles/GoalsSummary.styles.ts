import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    minHeight: 110,
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(240,184,60,0.20)",
    borderRadius: 24,
  },

  iconContainer: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: "rgba(240,184,60,0.12)",
  },

  icon: {
    color: "#f0b83c",
  },

  content: {
    flex: 1,
    marginLeft: 15,
  },

  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
  },

  subtitle: {
    color: "rgba(255,255,255,0.50)",
    fontSize: 13,
    marginTop: 5,
  },

  progressContainer: {
    marginLeft: 12,
  },

  progressCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 7,
    borderColor: "#4ade80",
    backgroundColor: "rgba(74,222,128,0.05)",
  },

  progressText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },
});
