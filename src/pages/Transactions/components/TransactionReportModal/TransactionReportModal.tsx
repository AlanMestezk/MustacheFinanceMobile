import { Feather } from "@expo/vector-icons";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles/TransactionReportModal.styles";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: any;
  type: "income" | "expense";
}

interface TransactionReportModalProps {
  visible: boolean;
  onClose: () => void;
  transactions: Transaction[];
  startDate: Date | null;
  endDate: Date | null;
}

export const TransactionReportModal = ({
  visible,
  onClose,
  transactions,
  startDate,
  endDate,
}: TransactionReportModalProps) => {
  const getTransactionDate = (timestamp: any) => {
    if (!timestamp) {
      return null;
    }

    return timestamp?.seconds
      ? new Date(timestamp.seconds * 1000)
      : new Date(timestamp);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = getTransactionDate(transaction.date);

    if (!transactionDate || !startDate || !endDate) {
      return false;
    }

    return transactionDate >= startDate && transactionDate <= endDate;
  });

  const incomeTotal = filteredTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenseTotal = filteredTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = incomeTotal - expenseTotal;

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR");
  };

  const getCategoryIcon = (category: string): keyof typeof Feather.glyphMap => {
    const icons: Record<string, keyof typeof Feather.glyphMap> = {
      Alimentação: "coffee",
      Transporte: "truck",
      Casa: "home",
      Lazer: "play-circle",
      Compras: "shopping-bag",
      Saúde: "heart",
      Educação: "book",
      Contas: "credit-card",
      Renda: "briefcase",
      "Renda extra": "dollar-sign",
      Entretenimento: "play-circle",
      Outros: "package",
    };

    return icons[category] || "package";
  };

  const handleExportReport = async () => {
    if (!startDate || !endDate) {
      return;
    }

    try {
      let reportText = "";

      reportText += "MUSTACHE FINANCE\n";
      reportText += "RELATÓRIO DE TRANSAÇÕES\n\n";

      reportText += `Período: ${formatDate(
        startDate,
      )} — ${formatDate(endDate)}\n\n`;

      reportText += "==============================\n";
      reportText += "RESUMO\n";
      reportText += "==============================\n\n";

      reportText += `Entradas: ${formatCurrency(incomeTotal)}\n`;

      reportText += `Saídas: ${formatCurrency(expenseTotal)}\n`;

      reportText += `Saldo do período: ${formatCurrency(balance)}\n\n`;

      reportText += "==============================\n";
      reportText += "TRANSAÇÕES\n";
      reportText += "==============================\n\n";

      filteredTransactions.forEach((transaction) => {
        const transactionDate = getTransactionDate(transaction.date);

        reportText += `${transactionDate ? formatDate(transactionDate) : ""}\n`;

        reportText += `${transaction.description}\n`;
        reportText += `${transaction.category}\n`;

        reportText += `${
          transaction.type === "income" ? "+" : "-"
        } ${formatCurrency(transaction.amount)}\n\n`;
      });

      reportText += "==============================\n";
      reportText += `Total de transações: ${filteredTransactions.length}\n`;

      const file = new File(Paths.cache, "relatorio-transacoes.txt");

      file.write(reportText);

      const fileUri = file.uri;

      const canShare = await Sharing.isAvailableAsync();

      if (!canShare) {
        console.log("Compartilhamento não disponível neste dispositivo.");
        return;
      }

      await Sharing.shareAsync(fileUri, {
        mimeType: "text/plain",
        dialogTitle: "Exportar relatório",
        UTI: "public.plain-text",
      });
    } catch (error) {
      console.error("Erro ao exportar relatório:", error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Relatório</Text>

              <Text style={styles.subtitle}>Resumo das suas transações</Text>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Feather name="x" size={24} color={styles.closeIcon.color} />
            </TouchableOpacity>
          </View>

          {startDate && endDate && (
            <View style={styles.periodContainer}>
              <Feather
                name="calendar"
                size={18}
                color={styles.periodIcon.color}
              />

              <Text style={styles.periodText}>
                {formatDate(startDate)} — {formatDate(endDate)}
              </Text>
            </View>
          )}

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.sectionTitle}>Resumo</Text>

            <View style={styles.summary}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Entradas</Text>

                <Text style={styles.incomeValue}>
                  {formatCurrency(incomeTotal)}
                </Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Saídas</Text>

                <Text style={styles.expenseValue}>
                  {formatCurrency(expenseTotal)}
                </Text>
              </View>
            </View>

            <View style={styles.balanceCard}>
              <Text style={styles.balanceLabel}>Saldo do período</Text>

              <Text style={styles.balanceValue}>{formatCurrency(balance)}</Text>
            </View>

            <TouchableOpacity
              style={styles.exportButton}
              onPress={handleExportReport}
              activeOpacity={0.7}
            >
              <Feather name="file-text" size={21} style={styles.exportIcon} />

              <Text style={styles.exportText}>Exportar relatório</Text>

              <Feather name="download" size={20} style={styles.exportArrow} />
            </TouchableOpacity>

            <View style={styles.transactionsHeader}>
              <Text style={styles.sectionTitle}>Transações</Text>

              <Text style={styles.transactionCount}>
                {filteredTransactions.length}{" "}
                {filteredTransactions.length === 1 ? "transação" : "transações"}
              </Text>
            </View>

            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => {
                const transactionDate = getTransactionDate(transaction.date);

                return (
                  <View
                    key={`${transaction.type}-${transaction.id}`}
                    style={styles.transactionCard}
                  >
                    <View style={styles.transactionIcon}>
                      <Feather
                        name={getCategoryIcon(transaction.category)}
                        size={20}
                        color={
                          transaction.type === "income"
                            ? styles.incomeIcon.color
                            : styles.expenseIcon.color
                        }
                      />
                    </View>

                    <View style={styles.transactionInfo}>
                      <Text style={styles.transactionTitle}>
                        {transaction.description}
                      </Text>

                      <Text style={styles.transactionDescription}>
                        {transaction.category} •{" "}
                        {transactionDate ? formatDate(transactionDate) : ""}
                      </Text>
                    </View>

                    <Text
                      style={
                        transaction.type === "income"
                          ? styles.incomeAmount
                          : styles.expenseAmount
                      }
                    >
                      {transaction.type === "income" ? "+" : "-"}{" "}
                      {formatCurrency(transaction.amount)}
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text style={styles.emptyText}>
                Nenhuma transação encontrada neste período.
              </Text>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
