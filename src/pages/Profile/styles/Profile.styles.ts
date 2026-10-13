import { StyleSheet } from "react-native";

import { colors } from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 42,
    paddingBottom: 30,
    gap: 10,
  },

  section: {
    marginTop: 4,
  },

  sectionTitle: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
  },

  logoutButton: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 2,
  },

  logoutContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoutIcon: {
    color: "#ef4444",
    marginRight: 10,
  },

  logoutText: {
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "700",
  },

  logoutArrow: {
    color: "rgba(239, 68, 68, 0.55)",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  modalCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#222536",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#363A50",
    padding: 24,
    alignItems: "center",
  },

  dialogIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#363A50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  modalTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },

  modalDescription: {
    color: "#A7A9B7",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 24,
  },

  confirmLogoutButton: {
    width: "100%",
    backgroundColor: "#D4A72C",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 12,
  },

  confirmLogoutText: {
    color: "#171923",
    fontSize: 15,
    fontWeight: "700",
  },

  cancelLogoutButton: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#363A50",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },

  cancelLogoutText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
