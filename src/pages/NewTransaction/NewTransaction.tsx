import { ScrollView, Text } from "react-native";

import { AddOption } from "./components/AddOption/AddOption";
import { NewTransactionHeader } from "./components/NewTransactionHeader/NewTransactionHeader";
import { styles } from "./styles/NewTransaction.styles";

export const NewTransaction = () => {
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
      />

      <AddOption
        title="Saída"
        description="Registrar um novo gasto"
        icon="arrow-up"
        type="expense"
      />

      <AddOption
        title="Planejamento"
        description="Criar uma nova meta financeira"
        icon="target"
        type="goal"
      />
    </ScrollView>
  );
};
