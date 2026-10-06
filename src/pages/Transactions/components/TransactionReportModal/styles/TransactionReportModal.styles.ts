import { StyleSheet } from "react-native";

import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "flex-end",
  },

  container: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(240, 184, 60, 0.18)",
    maxHeight: "90%",
    paddingTop: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },

  title: {
    color: colors.white,
    fontSize: 26,
    fontWeight: "800",
  },

  subtitle: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 14,
    marginTop: 4,
  },

  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  closeIcon: {
    color: colors.white,
  },

  periodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
  },

  periodIcon: {
    color: colors.primary,
  },

  periodText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 10,
  },

  scroll: {
    paddingHorizontal: 20,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  sectionTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
  },

  summary: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },

  summaryCard: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
  },

  summaryLabel: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 13,
    marginBottom: 8,
  },

  incomeValue: {
    color: "#22c55e",
    fontSize: 17,
    fontWeight: "800",
  },

  expenseValue: {
    color: "#ef4444",
    fontSize: 17,
    fontWeight: "800",
  },

  balanceCard: {
    marginTop: 10,
    padding: 18,
    backgroundColor: "rgba(240,184,60,0.08)",
    borderWidth: 1,
    borderColor: "rgba(240,184,60,0.22)",
    borderRadius: 16,
  },

  balanceLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
  },

  balanceValue: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "800",
    marginTop: 5,
  },

  transactionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 12,
  },

  transactionCount: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 13,
    fontFamily: "Popins",
  },

  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
  },

  transactionIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  incomeIcon: {
    color: "#22c55e",
  },

  expenseIcon: {
    color: "#ef4444",
  },

  transactionInfo: {
    flex: 1,
    marginLeft: 12,
  },

  transactionTitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "700",
  },

  transactionDescription: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "Popins",
  },

  incomeAmount: {
    color: "#22c55e",
    fontSize: 13,
    fontWeight: "800",
    marginLeft: 8,
  },

  expenseAmount: {
    color: "#ef4444",
    fontSize: 13,
    fontWeight: "800",
    marginLeft: 8,
  },
  emptyText: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 14,
    textAlign: "center",
    marginTop: 24,
    fontFamily: "Popins",
  },
  exportButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginTop: 12,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 16,
  },

  exportIcon: {
    color: colors.background,
  },

  exportText: {
    flex: 1,
    color: colors.background,
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 12,
    fontFamily: "Popins",
  },

  exportArrow: {
    color: colors.background,
    fontFamily: "Popins",
  },
});
