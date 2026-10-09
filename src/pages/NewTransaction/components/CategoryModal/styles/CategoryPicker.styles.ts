import { StyleSheet } from "react-native";

import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    elevation: 20,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "flex-end",
  },

  backdrop: {
    ...StyleSheet.absoluteFill,
  },

  container: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(240, 184, 60, 0.18)",
    paddingTop: 10,
    paddingBottom: 24,
    paddingHorizontal: 20,
    maxHeight: "75%",
    zIndex: 1000,
    elevation: 21,
  },

  handle: {
    alignSelf: "center",
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "800",
  },

  subtitle: {
    color: "rgba(255, 255, 255, 0.50)",
    fontSize: 13,
    marginTop: 4,
  },

  closeIcon: {
    color: colors.white,
  },

  categoryList: {
    gap: 8,
  },

  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 58,
    paddingHorizontal: 14,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
  },

  categoryIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(240, 184, 60, 0.10)",
    fontWeight: "bold",
  },

  icon: {
    color: colors.white,
  },

  categoryText: {
    flex: 1,
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 12,
  },

  arrow: {
    color: "rgba(255, 255, 255, 0.40)",
  },
  categoryScroll: {
    flexGrow: 0,
    flexShrink: 1,
    maxHeight: 480,
  },
});
