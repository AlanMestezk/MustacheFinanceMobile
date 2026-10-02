import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(240,184,60,0.18)",
    borderRadius: 18,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    color: "#f0b83c",
    marginRight: 11,
  },

  title: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "600",
  },

  arrow: {
    color: "rgba(255,255,255,0.45)",
  },

  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.60)",
  },

  modalContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    backgroundColor: colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(240,184,60,0.25)",
  },

  handle: {
    alignSelf: "center",
    width: 44,
    height: 5,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.30)",
    marginBottom: 22,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 26,
  },

  modalTitle: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "700",
  },

  modalSubtitle: {
    color: "rgba(255,255,255,0.50)",
    fontSize: 13,
    marginTop: 4,
  },

  closeIcon: {
    color: "rgba(255,255,255,0.65)",
  },

  section: {
    gap: 10,
  },

  sectionTitle: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 2,
  },

  option: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 15,
  },

  optionActive: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    backgroundColor: "rgba(240,184,60,0.10)",
    borderWidth: 1,
    borderColor: "rgba(240,184,60,0.30)",
    borderRadius: 15,
  },

  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  optionIcon: {
    color: "rgba(255,255,255,0.45)",
    marginRight: 11,
  },

  optionIconActive: {
    color: "#f0b83c",
    marginRight: 11,
  },

  optionText: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 14,
  },

  optionTextActive: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },

  checkIcon: {
    color: "#f0b83c",
  },

  applyButton: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0b83c",
    borderRadius: 17,
    marginTop: 24,
  },

  applyIcon: {
    color: "#3b2a05",
    marginRight: 8,
  },

  applyText: {
    color: "#3b2a05",
    fontSize: 15,
    fontWeight: "800",
  },
});
