import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { auth } from "../../firebase/auth";
import { getUserExpenses, getUserIncomes } from "../../firebase/firestore";

import { TransactionCard } from "./components/TransactionCard/TransactionCard";
import { TransactionFilters } from "./components/TransactionFilters/TransactionFilters";
import { TransactionReportModal } from "./components/TransactionReportModal/TransactionReportModal";
import { TransactionsHeader } from "./components/TransactionsHeader/TransactionsHeader";
import { styles } from "./styles/Transactions.styles";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: any;
  type: "income" | "expense";
}

export const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [reportVisible, setReportVisible] = useState(false);

  const [reportStartDate, setReportStartDate] = useState<Date | null>(null);

  const [reportEndDate, setReportEndDate] = useState<Date | null>(null);

  const loadTransactions = async () => {
    const user = auth.currentUser;

    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const [expenses, incomes] = await Promise.all([
        getUserExpenses(user.uid),
        getUserIncomes(user.uid),
      ]);

      const expenseTransactions: Transaction[] = expenses.map((expense) => ({
        id: expense.id,
        description: expense.description,
        amount: Number(expense.amount || 0),
        category: expense.category,
        date: expense.date,
        type: "expense",
      }));

      const incomeTransactions: Transaction[] = incomes.map((income) => ({
        id: income.id,
        description: income.description,
        amount: Number(income.amount || 0),
        category: income.category,
        date: income.date,
        type: "income",
      }));

      // Todas as transações, ordenadas da mais recente para a mais antiga.
      const allTransactionsSorted = [
        ...expenseTransactions,
        ...incomeTransactions,
      ].sort((a, b) => {
        const dateA = a.date?.seconds
          ? a.date.seconds * 1000
          : new Date(a.date).getTime();

        const dateB = b.date?.seconds
          ? b.date.seconds * 1000
          : new Date(b.date).getTime();

        return dateB - dateA;
      });

      // Guarda todas as transações para o relatório.
      setAllTransactions(allTransactionsSorted);

      // A tela principal continua mostrando somente as 4 últimas.
      setTransactions(allTransactionsSorted.slice(0, 4));
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleViewReport = (startDate: Date, endDate: Date) => {
    setReportStartDate(startDate);
    setReportEndDate(endDate);
    setReportVisible(true);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";

    const date = timestamp?.seconds
      ? new Date(timestamp.seconds * 1000)
      : new Date(timestamp);

    const today = new Date();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Hoje";
    }

    if (date.toDateString() === yesterday.toDateString()) {
      return "Ontem";
    }

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
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

  return (
    <View style={styles.container}>
      <TransactionsHeader />

      <TransactionFilters onViewReport={handleViewReport} />

      <View style={styles.transactionsHeader}>
        <Text style={styles.sectionTitle}>Últimas transações</Text>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Carregando transações...</Text>
      ) : transactions.length > 0 ? (
        transactions.map((transaction) => (
          <TransactionCard
            key={`${transaction.type}-${transaction.id}`}
            title={transaction.description}
            category={transaction.category}
            date={formatDate(transaction.date)}
            amount={`${
              transaction.type === "income" ? "+" : "-"
            } ${formatCurrency(transaction.amount)}`}
            type={transaction.type}
            icon={getCategoryIcon(transaction.category)}
          />
        ))
      ) : (
        <Text style={styles.emptyText}>Nenhuma transação encontrada.</Text>
      )}

      <TransactionReportModal
        visible={reportVisible}
        onClose={() => setReportVisible(false)}
        transactions={allTransactions}
        startDate={reportStartDate}
        endDate={reportEndDate}
      />
    </View>
  );
};
