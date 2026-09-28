import { Text, View } from "react-native";

import { TransactionCard } from "./components/TransactionCard/TransactionCard";
import { TransactionFilters } from "./components/TransactionFilters/TransactionFilters";
import { TransactionsHeader } from "./components/TransactionsHeader/TransactionsHeader";
import { styles } from "./styles/Transactions.styles";

export const Transactions = () => {
  return (
    <View style={styles.container}>
      <TransactionsHeader />

      <TransactionFilters />

      <View style={styles.transactionsHeader}>
        <Text style={styles.sectionTitle}>Últimas transações</Text>
      </View>

      <TransactionCard
        title="Mercado"
        category="Alimentação"
        date="Hoje"
        amount="- R$ 80,00"
        type="expense"
        icon="shopping-cart"
      />

      <TransactionCard
        title="Salário"
        category="Renda"
        date="Hoje"
        amount="+ R$ 5.000,00"
        type="income"
        icon="briefcase"
      />

      <TransactionCard
        title="Netflix"
        category="Entretenimento"
        date="Ontem"
        amount="- R$ 39,90"
        type="expense"
        icon="play-circle"
      />
    </View>
  );
};
