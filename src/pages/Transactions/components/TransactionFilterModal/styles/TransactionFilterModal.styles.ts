import { StyleSheet } from "react-native";

import { colors } from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },

  container: {
    padding: 20,
    paddingTop: 12,

    backgroundColor: colors.background,

    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
  },

  handle: {
    alignSelf: "center",

    width: 44,
    height: 5,

    borderRadius: 10,

    backgroundColor: "rgba(255, 255, 255, 0.35)",

    marginBottom: 22,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "700",
  },

  subtitle: {
    color: "rgba(255, 255, 255, 0.55)",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },

  closeIcon: {
    color: "rgba(255, 255, 255, 0.70)",
  },

  sectionTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",

    marginTop: 28,
    marginBottom: 14,
  },

  dateRow: {
    flexDirection: "row",
    gap: 12,
  },

  dateField: {
    flex: 1,
  },

  dateLabel: {
    color: "rgba(255, 255, 255, 0.55)",
    fontSize: 13,
    marginBottom: 7,
  },

  dateButton: {
    height: 54,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 12,

    backgroundColor: "rgba(255, 255, 255, 0.06)",

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",

    borderRadius: 14,
  },

  dateIcon: {
    color: colors.primary,
    marginRight: 8,
  },

  dateText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "600",
  },

  applyButton: {
    height: 54,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: colors.primary,

    borderRadius: 16,

    marginTop: 20,
  },

  applyButtonText: {
    color: colors.background,
    fontSize: 15,
    fontWeight: "800",
  },

  divider: {
    height: 1,

    backgroundColor: "rgba(255, 255, 255, 0.10)",

    marginVertical: 26,
  },

  reportTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
  },

  reportDescription: {
    color: "rgba(255, 255, 255, 0.55)",
    fontSize: 13,
    lineHeight: 19,

    marginTop: 6,
    marginBottom: 16,
  },

  pdfButton: {
    height: 58,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 16,

    backgroundColor: "rgba(255, 255, 255, 0.06)",

    borderWidth: 1,
    borderColor: "rgba(240, 184, 60, 0.30)",

    borderRadius: 16,
  },

  pdfIcon: {
    color: colors.primary,
    marginRight: 12,
  },

  pdfText: {
    flex: 1,

    color: colors.white,
    fontSize: 14,
    fontWeight: "700",
  },

  pdfArrow: {
    color: "rgba(255, 255, 255, 0.55)",
  },
});
