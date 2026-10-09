import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { auth } from "../../firebase/auth";
import {
  deleteUserTransaction,
  getUserExpenses,
  getUserIncomes,
  updateUserTransaction,
} from "../../firebase/firestore";

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

type FeedbackModal = "confirmDelete" | "deleted" | "updated" | null;

export const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [reportVisible, setReportVisible] = useState(false);
  const [reportStartDate, setReportStartDate] = useState<Date | null>(null);
  const [reportEndDate, setReportEndDate] = useState<Date | null>(null);

  const [editVisible, setEditVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [amount, setAmount] = useState("");

  const [feedbackModal, setFeedbackModal] = useState<FeedbackModal>(null);
  const [pendingDelete, setPendingDelete] = useState<Transaction | null>(null);

  const loadTransactions = async () => {
    const user = auth.currentUser;

    if (!user) {
      setTransactions([]);
      setAllTransactions([]);
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

      const sorted = [...expenseTransactions, ...incomeTransactions].sort(
        (a, b) => getDateValue(b.date) - getDateValue(a.date),
      );

      setAllTransactions(sorted);
      setTransactions(sorted.slice(0, 4));
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
      Alert.alert("Erro", "Não foi possível carregar as transações.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const getDateValue = (value: any): number => {
    if (!value) return 0;

    if (typeof value.toDate === "function") {
      return value.toDate().getTime();
    }

    if (typeof value.seconds === "number") {
      return value.seconds * 1000;
    }

    const timestamp = new Date(value).getTime();

    return Number.isNaN(timestamp) ? 0 : timestamp;
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";

    const transactionDate = new Date(getDateValue(timestamp));

    if (Number.isNaN(transactionDate.getTime())) return "";

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (transactionDate.toDateString() === today.toDateString()) {
      return "Hoje";
    }

    if (transactionDate.toDateString() === yesterday.toDateString()) {
      return "Ontem";
    }

    return transactionDate.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const getCategoryIcon = (
    categoryName: string,
  ): keyof typeof Feather.glyphMap => {
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

    return icons[categoryName] || "package";
  };

  const handleViewReport = (startDate: Date, endDate: Date) => {
    setReportStartDate(startDate);
    setReportEndDate(endDate);
    setReportVisible(true);
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setAmount(String(transaction.amount));
    setEditVisible(true);
  };

  const handleCloseEdit = () => {
    if (saving) return;

    setEditVisible(false);
    setSelectedTransaction(null);
    setAmount("");
  };

  const handleSaveEdit = async () => {
    const user = auth.currentUser;

    if (!user || !selectedTransaction) {
      Alert.alert("Atenção", "Não foi possível identificar a transação.");
      return;
    }

    const parsedAmount = Number(
      amount.trim().replace(/\s/g, "").replace(",", "."),
    );

    if (!amount.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      Alert.alert("Valor inválido", "Informe um valor maior que zero.");
      return;
    }

    try {
      setSaving(true);

      await updateUserTransaction(
        user.uid,
        selectedTransaction.id,
        selectedTransaction.type === "income" ? "incomes" : "expenses",
        {
          description: selectedTransaction.description,
          amount: parsedAmount,
          category: selectedTransaction.category,
          date: new Date(getDateValue(selectedTransaction.date)),
        },
      );

      setEditVisible(false);
      setSelectedTransaction(null);
      setAmount("");

      await loadTransactions();

      setFeedbackModal("updated");
    } catch (error) {
      console.error("Erro ao atualizar valor:", error);
      Alert.alert("Erro", "Não foi possível atualizar o valor.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (transaction: Transaction) => {
    setPendingDelete(transaction);
    setFeedbackModal("confirmDelete");
  };

  const confirmDelete = async () => {
    const user = auth.currentUser;

    if (!user || !pendingDelete) {
      setFeedbackModal(null);
      Alert.alert("Erro", "Não foi possível identificar a transação.");
      return;
    }

    try {
      setDeleting(true);

      await deleteUserTransaction(
        user.uid,
        pendingDelete.id,
        pendingDelete.type === "income" ? "incomes" : "expenses",
      );

      setPendingDelete(null);

      await loadTransactions();

      setFeedbackModal("deleted");
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
      setFeedbackModal(null);
      Alert.alert("Erro", "Não foi possível excluir a transação.");
    } finally {
      setDeleting(false);
    }
  };

  const closeFeedbackModal = () => {
    if (deleting) return;

    setFeedbackModal(null);
    setPendingDelete(null);
  };

  return (
    <View style={styles.container}>
      <TransactionsHeader />

      <TransactionFilters onViewReport={handleViewReport} />

      <View style={styles.transactionsHeader}>
        <Text style={styles.sectionTitle}>Últimas transações</Text>
      </View>

      {loading ? (
        <ActivityIndicator />
      ) : transactions.length > 0 ? (
        transactions.map((transaction) => (
          <TransactionCard
            key={`${transaction.type}-${transaction.id}`}
            title={transaction.description}
            category={transaction.category}
            date={formatDate(transaction.date)}
            amount={`${transaction.type === "income" ? "+" : "-"} ${formatCurrency(
              transaction.amount,
            )}`}
            type={transaction.type}
            icon={getCategoryIcon(transaction.category)}
            onEdit={() => handleEdit(transaction)}
            onDelete={() => handleDelete(transaction)}
          />
        ))
      ) : (
        <Text style={styles.emptyText}>Nenhuma transação encontrada.</Text>
      )}

      {/* Modal de edição do valor */}
      <Modal
        visible={editVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseEdit}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.editOverlay}
        >
          <View style={styles.editModal}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <Text style={styles.editTitle}>Editar valor</Text>

              <Text style={styles.editSubtitle}>
                Atualize o valor desta transação.
              </Text>

              <Text style={styles.editLabel}>Valor (R$)</Text>

              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="Ex.: 150,00"
                placeholderTextColor="#777B8B"
                keyboardType="decimal-pad"
                editable={!saving}
                style={styles.editInput}
              />

              <View style={styles.editButtons}>
                <TouchableOpacity
                  onPress={handleCloseEdit}
                  disabled={saving}
                  style={[styles.editButton, styles.cancelButton]}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleSaveEdit}
                  disabled={saving}
                  style={[
                    styles.editButton,
                    styles.saveButton,
                    saving && styles.saveButtonDisabled,
                  ]}
                >
                  {saving ? (
                    <ActivityIndicator color="#171923" />
                  ) : (
                    <Text style={styles.saveButtonText}>Salvar</Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal personalizado de confirmação e sucesso */}
      <Modal
        visible={feedbackModal !== null}
        transparent
        animationType="fade"
        onRequestClose={closeFeedbackModal}
      >
        <View style={styles.feedbackOverlay}>
          <View style={styles.feedbackModal}>
            <View style={styles.mustacheIcon}>
              <Image
                source={require("../../../assets/logo/icon.png")}
                style={styles.mustacheImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.feedbackTitle}>
              {feedbackModal === "confirmDelete"
                ? "Excluir transação?"
                : feedbackModal === "deleted"
                  ? "Transação excluída!"
                  : "Valor atualizado!"}
            </Text>

            <Text style={styles.feedbackMessage}>
              {feedbackModal === "confirmDelete"
                ? `Deseja realmente excluir "${pendingDelete?.description}"? Essa ação não pode ser desfeita.`
                : feedbackModal === "deleted"
                  ? "Sua transação foi excluída com sucesso!"
                  : "O valor da sua transação foi atualizado com sucesso!"}
            </Text>

            {feedbackModal === "confirmDelete" ? (
              <View style={styles.feedbackButtons}>
                <TouchableOpacity
                  onPress={closeFeedbackModal}
                  disabled={deleting}
                  style={[styles.feedbackButton, styles.feedbackCancelButton]}
                >
                  <Text style={styles.feedbackCancelText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={confirmDelete}
                  disabled={deleting}
                  style={[styles.feedbackButton, styles.feedbackDeleteButton]}
                >
                  {deleting ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.feedbackDeleteText}>Excluir</Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={closeFeedbackModal}
                style={[styles.feedbackButton, styles.feedbackSuccessButton]}
              >
                <Text style={styles.feedbackSuccessText}>Entendi!</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

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
