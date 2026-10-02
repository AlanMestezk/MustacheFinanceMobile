import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 16,
  },

  imageContainer: {
    height: 150,
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(5,15,25,0.28)",
  },

  goalIcon: {
    position: "absolute",
    left: 16,
    bottom: 16,
    width: 46,
    height: 46,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20,25,30,0.75)",
    borderWidth: 1,
    borderColor: "rgba(240,184,60,0.30)",
  },

  icon: {
    color: "#f0b83c",
  },

  status: {
    position: "absolute",
    top: 16,
    right: 16,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(34,197,94,0.16)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.30)",
  },

  statusText: {
    color: "#4ade80",
    fontSize: 11,
    fontWeight: "700",
  },

  content: {
    padding: 18,
  },

  title: {
    color: colors.white,
    fontSize: 19,
    fontWeight: "700",
  },

  amount: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 8,
  },

  target: {
    color: "rgba(255,255,255,0.45)",
    fontWeight: "400",
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  progressBackground: {
    flex: 1,
    height: 8,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.10)",
    overflow: "hidden",
  },

  progress: {
    width: "20%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#4ade80",
  },

  percentage: {
    color: "#4ade80",
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 10,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  dateIcon: {
    color: "rgba(255,255,255,0.45)",
    marginRight: 6,
  },

  date: {
    color: "rgba(255,255,255,0.50)",
    fontSize: 12,
  },

  remaining: {
    color: "rgba(255,255,255,0.40)",
    fontSize: 12,
  },
});
