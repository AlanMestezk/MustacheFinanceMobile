import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171923",
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    gap: 16,
    marginTop: 32,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    color: "#A7A9B7",
    fontSize: 14,
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: "#222536",
    borderRadius: 20,
    padding: 22,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#303449",
  },
  infoIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#303044",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  infoTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  infoDescription: {
    color: "#A7A9B7",
    fontSize: 14,
    lineHeight: 22,
  },
  form: {
    marginBottom: 28,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },
  field: {
    gap: 10,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222536",
    borderWidth: 1,
    borderColor: "#363A50",
    borderRadius: 14,
    minHeight: 54,
  },
  passwordInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  visibilityButton: {
    padding: 15,
  },
  helperText: {
    color: "#85899B",
    fontSize: 12,
    lineHeight: 18,
  },
  saveButton: {
    minHeight: 54,
    borderRadius: 14,
    backgroundColor: "#D4A72C",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: "#171923",
    fontSize: 15,
    fontWeight: "700",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.72)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#222536",
    borderRadius: 24,
    padding: 26,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#363A50",
  },
  dialogIcon: {
    width: 68,
    height: 68,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  dialogIconSuccess: {
    backgroundColor: "rgba(212, 167, 44, 0.12)",
  },
  dialogIconError: {
    backgroundColor: "rgba(248, 113, 113, 0.12)",
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },
  modalDescription: {
    color: "#A7A9B7",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 26,
  },
  modalButton: {
    width: "100%",
    minHeight: 50,
    borderRadius: 14,
    backgroundColor: "#D4A72C",
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonText: {
    color: "#171923",
    fontSize: 15,
    fontWeight: "700",
  },
});
