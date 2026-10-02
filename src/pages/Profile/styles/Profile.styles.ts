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
});
