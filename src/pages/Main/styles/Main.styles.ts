import { StyleSheet } from "react-native";

import { colors } from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: colors.background,

    paddingHorizontal: 20,
    paddingTop: 50,
  },

  header: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 24,
  },

  greeting: {
    color: colors.white,

    fontSize: 26,
    fontWeight: "700",
  },

  subtitle: {
    color: "rgba(255, 255, 255, 0.6)",

    fontSize: 13,

    marginTop: 4,
  },

  profileButton: {
    width: 44,
    height: 44,

    borderRadius: 22,

    backgroundColor: "rgba(255, 255, 255, 0.08)",

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",

    alignItems: "center",
    justifyContent: "center",
  },

  profileIcon: {
    color: colors.white,
  },

  balanceCard: {
    padding: 22,

    borderRadius: 24,

    backgroundColor: "rgba(255, 255, 255, 0.08)",

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },

  balanceHeader: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",
  },

  balanceLabel: {
    color: "rgba(255, 255, 255, 0.65)",

    fontSize: 12,
    fontWeight: "600",

    letterSpacing: 0.8,
  },

  balanceIcon: {
    color: "rgba(255, 255, 255, 0.7)",
  },

  balance: {
    color: colors.white,

    fontSize: 34,
    fontWeight: "700",

    marginTop: 12,
  },

  balanceDescription: {
    color: "rgba(255, 255, 255, 0.5)",

    fontSize: 12,

    marginTop: 4,
  },

  summary: {
    flexDirection: "row",

    gap: 12,

    marginTop: 16,
  },

  summaryCard: {
    flex: 1,

    padding: 16,

    borderRadius: 18,

    backgroundColor: "rgba(255, 255, 255, 0.06)",

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
  },

  summaryLabel: {
    color: "rgba(255, 255, 255, 0.55)",

    fontSize: 11,
    fontWeight: "600",

    marginTop: 10,
  },

  incomeIcon: {
    color: "#4ade80",
  },

  expenseIcon: {
    color: "#ff6b6b",
  },

  incomeValue: {
    color: "#4ade80",

    fontSize: 17,
    fontWeight: "700",

    marginTop: 5,
  },

  expenseValue: {
    color: "#ff6b6b",

    fontSize: 17,
    fontWeight: "700",

    marginTop: 5,
  },

  transactionsHeader: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",

    marginTop: 28,
    marginBottom: 12,
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

  emptyState: {
    alignItems: "center",

    paddingVertical: 35,
  },

  emptyIcon: {
    color: "rgba(255, 255, 255, 0.25)",
  },

  emptyTitle: {
    color: colors.white,

    fontSize: 15,
    fontWeight: "600",

    marginTop: 12,
  },

  emptyDescription: {
    color: "rgba(255, 255, 255, 0.5)",

    fontSize: 13,

    marginTop: 5,
  },
});
