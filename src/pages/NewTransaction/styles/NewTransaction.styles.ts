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
  },

  sectionTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "700",
    marginTop: 5,
    marginBottom: 8,
    padding: 12,
  },
});
