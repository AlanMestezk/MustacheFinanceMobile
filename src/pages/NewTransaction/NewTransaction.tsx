import { ScrollView, Text } from "react-native";

import { useState } from "react";
import { AddOption } from "./components/AddOption/AddOption";
import { ExpenseModal } from "./components/ExpenseModal/ExpenseModal";
import { GoalModal } from "./components/GoalModal/GoalModal";
import { IncomeModal } from "./components/IncomeModal/IncomeModal";
import { NewTransactionHeader } from "./components/NewTransactionHeader/NewTransactionHeader";
import { styles } from "./styles/NewTransaction.styles";

export const NewTransaction = () => {
  const [incomeModalVisible, setIncomeModalVisible] = useState(false);
  const [expenseModalVisible, setExpenseModalVisible] = useState(false);
  const [goalModalVisible, setGoalModalVisible] = useState(false);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <NewTransactionHeader />

      <Text style={styles.sectionTitle}>O que vamos adicionar?</Text>

      <AddOption
        title="Entrada"
        description="Adicionar uma nova receita"
        icon="arrow-down"
        type="income"
        onPress={() => setIncomeModalVisible(true)}
      />

      <AddOption
        title="Saída"
        description="Registrar um novo gasto"
        icon="arrow-up"
        type="expense"
        onPress={() => setExpenseModalVisible(true)}
      />

      <AddOption
        title="Planejamento"
        description="Criar uma nova meta financeira"
        icon="target"
        type="goal"
        onPress={() => setGoalModalVisible(true)}
      />

      <IncomeModal
        visible={incomeModalVisible}
        onClose={() => setIncomeModalVisible(false)}
      />

      <ExpenseModal
        visible={expenseModalVisible}
        onClose={() => setExpenseModalVisible(false)}
      />

      <GoalModal
        visible={goalModalVisible}
        onClose={() => setGoalModalVisible(false)}
      />
    </ScrollView>
  );
};
