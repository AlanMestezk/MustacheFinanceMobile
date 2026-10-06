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
});
