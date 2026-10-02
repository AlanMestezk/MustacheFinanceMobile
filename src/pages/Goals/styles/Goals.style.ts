import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 120,
    gap: 16,
  },

  filterButton: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(240,184,60,0.18)",
    borderRadius: 18,
  },

  filterContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  filterIcon: {
    color: "#f0b83c",
    marginRight: 11,
  },

  filterText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "600",
  },

  filterArrow: {
    color: "rgba(255,255,255,0.45)",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 2,
  },

  sectionTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "700",
  },

  goalCount: {
    color: "rgba(255,255,255,0.40)",
    fontSize: 13,
  },
});
