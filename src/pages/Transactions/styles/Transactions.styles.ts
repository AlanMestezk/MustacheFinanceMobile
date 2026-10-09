import { StyleSheet } from "react-native";

import { colors } from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  transactionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  sectionTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
  },

  seeAll: {
    color: colors.primaryLight,
    fontSize: 13,
    fontWeight: "600",
  },
  loadingText: {
    color: colors.white,
    textAlign: "center",
    marginTop: 20,
  },

  emptyText: {
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    marginTop: 20,
  },

  editOverlay: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },

  editModal: {
    backgroundColor: "#171923",
    borderRadius: 20,
    padding: 22,
    maxHeight: "90%",
    borderWidth: 1,
    borderColor: "#343746",
  },

  editTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 6,
  },

  editSubtitle: {
    color: "#A7A9B7",
    marginBottom: 20,
  },

  editLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E5E7EB",
    marginBottom: 7,
  },

  editInput: {
    borderWidth: 1,
    borderColor: "#3B3E4D",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 15,
    color: "#FFFFFF",
    backgroundColor: "#222532",
    marginBottom: 15,
  },

  editButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },

  editButton: {
    flex: 1,
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
  },

  cancelButton: {
    backgroundColor: "#2B2E3B",
    borderWidth: 1,
    borderColor: "#424657",
  },

  saveButton: {
    backgroundColor: "#D4A72C",
  },

  saveButtonDisabled: {
    opacity: 0.7,
  },

  cancelButtonText: {
    color: "#E5E7EB",
    fontWeight: "600",
  },

  saveButtonText: {
    color: "#171923",
    fontWeight: "700",
  },

  feedbackOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "rgba(0, 0, 0, 0.78)",
  },

  feedbackModal: {
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
    padding: 26,
    borderRadius: 24,
    backgroundColor: "#171923",
    borderWidth: 1,
    borderColor: "#343746",
  },

  mustacheIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  mustacheEmoji: {
    fontSize: 38,
  },

  feedbackTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },

  feedbackMessage: {
    fontSize: 14,
    lineHeight: 21,
    color: "#A7A9B7",
    textAlign: "center",
    marginBottom: 24,
  },

  feedbackButtons: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
  },

  feedbackButton: {
    minHeight: 48,
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  feedbackCancelButton: {
    flex: 1,
    backgroundColor: "#2B2E3B",
    borderWidth: 1,
    borderColor: "#424657",
  },

  feedbackCancelText: {
    color: "#E5E7EB",
    fontSize: 14,
    fontWeight: "600",
  },

  feedbackDeleteButton: {
    flex: 1,
    backgroundColor: "#DC4545",
  },

  feedbackDeleteText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  feedbackSuccessButton: {
    width: "100%",
    backgroundColor: "#D4A72C",
  },

  feedbackSuccessText: {
    color: "#171923",
    fontSize: 15,
    fontWeight: "700",
  },
  mustacheImage: {
    width: 90,
    height: 90,
  },
});
