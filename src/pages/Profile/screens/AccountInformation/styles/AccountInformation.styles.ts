import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10111A",
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    marginTop: 35,
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10111A",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
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
    marginLeft: 14,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

  subtitle: {
    color: "#A7A9B7",
    fontSize: 13,
    marginTop: 5,
  },

  photoSection: {
    alignItems: "center",
    marginBottom: 36,
  },

  photoContainer: {
    width: 124,
    height: 124,
    borderRadius: 62,
    overflow: "hidden",
    backgroundColor: "#20222E",
    borderWidth: 2,
    borderColor: "#D4A72C",
    alignItems: "center",
    justifyContent: "center",
  },

  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  photoPlaceholder: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  changePhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#242332",
    borderWidth: 1,
    borderColor: "#51452B",
  },

  changePhotoText: {
    color: "#D4A72C",
    fontSize: 14,
    fontWeight: "600",
  },

  photoHint: {
    color: "#777B8A",
    fontSize: 12,
    marginTop: 9,
    textAlign: "center",
    fontFamily: "Popins",
  },

  form: {
    gap: 24,
  },

  field: {
    gap: 10,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  input: {
    minHeight: 54,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#343746",
    backgroundColor: "#191B27",
    color: "#FFFFFF",
    fontSize: 15,
  },

  readOnlyInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 16,
    backgroundColor: "#151620",
  },

  emailText: {
    color: "#A7A9B7",
    fontSize: 15,
    marginTop: 2,
  },

  helperText: {
    color: "#c00303b2",
    fontSize: 12,
    marginTop: -2,
  },

  saveButton: {
    minHeight: 54,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 36,
    borderRadius: 14,
    backgroundColor: "#D4A72C",
    paddingHorizontal: 20,
  },

  saveButtonText: {
    color: "#171923",
    fontSize: 15,
    fontWeight: "700",
  },

  disabledButton: {
    opacity: 0.65,
  },

  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.78)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  modalCard: {
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
    padding: 26,
    borderRadius: 24,
    backgroundColor: "#171923",
    borderWidth: 1,
    borderColor: "#343746",
  },

  successIcon: {
    marginBottom: 16,
  },

  modalTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "700",
    textAlign: "center",
  },

  modalDescription: {
    color: "#A7A9B7",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 10,
  },

  modalButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#D4A72C",
    marginTop: 24,
  },

  modalButtonText: {
    color: "#171923",
    fontSize: 14,
    fontWeight: "700",
  },
});
