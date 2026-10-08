import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.60)",
  },

  container: {
    maxHeight: "92%",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    backgroundColor: colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(240, 184, 60, 0.25)",
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

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconContainer: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "rgba(240, 184, 60, 0.12)",
    marginRight: 12,
  },

  headerIcon: {
    color: "#f0b83c",
  },

  title: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "700",
  },

  subtitle: {
    color: "rgba(255,255,255,0.50)",
    fontSize: 13,
    marginTop: 4,
  },

  closeIcon: {
    color: "rgba(255,255,255,0.65)",
  },

  form: {
    gap: 16,
  },

  field: {
    width: "100%",
  },

  label: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 7,
  },

  optional: {
    color: "rgba(255,255,255,0.35)",
    fontWeight: "400",
  },

  inputContainer: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    borderRadius: 15,
  },

  currency: {
    color: "#f0b83c",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },

  input: {
    flex: 1,
    color: colors.white,
    fontSize: 15,
    paddingVertical: 0,
  },

  inputIcon: {
    color: "rgba(255,255,255,0.50)",
    marginRight: 10,
  },

  selectText: {
    flex: 1,
    color: "rgba(255,255,255,0.65)",
    fontSize: 14,
  },

  observationContainer: {
    minHeight: 80,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    borderRadius: 15,
  },

  observationInput: {
    flex: 1,
    color: colors.white,
    fontSize: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  submitButton: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0b83c",
    borderRadius: 17,
    marginTop: 22,
  },

  submitIcon: {
    color: "#3b2a05",
    marginRight: 8,
  },

  submitText: {
    color: "#3b2a05",
    fontSize: 15,
    fontWeight: "800",
  },
  selectIcon: {
    color: "rgba(255, 255, 255, 0.45)",
  },
});
