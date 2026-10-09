import { MaterialCommunityIcons } from "@expo/vector-icons";

export const getCategoryIcon = (
  category: string,
): keyof typeof MaterialCommunityIcons.glyphMap => {
  const icons: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
    // Categorias de entrada
    Renda: "briefcase",
    "Renda extra": "cash-plus",
    Investimentos: "trending-up",
    Presente: "gift",
    Prêmio: "trophy",
    Reembolso: "cash-refund",
    Outros: "package-variant",

    // Categorias de saída
    Alimentação: "food",
    Transporte: "car",
    Casa: "home",
    Lazer: "party-popper",
    Compras: "shopping",
    Saúde: "heart-pulse",
    Educação: "book-open-variant",
    Contas: "credit-card-outline",
    Entretenimento: "movie-open",

    // Categorias de metas
    Viagem: "bag-checked",
    Tecnologia: "cellphone",
    Veículo: "car",
    Estudo: "book-open-variant",
    Investimento: "trending-up",
  };

  return icons[category] || "tag";
};
