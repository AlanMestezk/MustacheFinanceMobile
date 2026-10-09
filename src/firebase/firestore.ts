import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { app } from "./config";

export const db = getFirestore(app);

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: any;
}

interface Investment {
  id: string;
  description: string;
  amount: number;
  goalAmount: number;
  category: string;
  date: any;
  completed?: boolean;
}

// Buscar despesas do usuário
export const getUserExpenses = async (uid: string): Promise<Transaction[]> => {
  const expensesRef = collection(db, "users", uid, "expenses");
  const expensesQuery = query(expensesRef, orderBy("date", "desc"));
  const snapshot = await getDocs(expensesQuery);

  return snapshot.docs.map((expense) => ({
    id: expense.id,
    ...(expense.data() as Omit<Transaction, "id">),
  }));
};

// Buscar entradas do usuário
export const getUserIncomes = async (uid: string): Promise<Transaction[]> => {
  const incomesRef = collection(db, "users", uid, "incomes");
  const incomesQuery = query(incomesRef, orderBy("date", "desc"));
  const snapshot = await getDocs(incomesQuery);

  return snapshot.docs.map((income) => ({
    id: income.id,
    ...(income.data() as Omit<Transaction, "id">),
  }));
};

// Buscar planejamentos/metas do usuário
export const getUserInvestments = async (
  uid: string,
): Promise<Investment[]> => {
  const investmentsRef = collection(db, "users", uid, "investments");
  const investmentsQuery = query(investmentsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(investmentsQuery);

  return snapshot.docs.map((investment) => ({
    id: investment.id,
    ...(investment.data() as Omit<Investment, "id">),
  }));
};

type TransactionCollection = "incomes" | "expenses";

// Atualizar uma transação
export const updateUserTransaction = async (
  uid: string,
  transactionId: string,
  type: TransactionCollection,
  data: {
    description: string;
    amount: number;
    category: string;
    date: Date;
  },
) => {
  const transactionRef = doc(db, "users", uid, type, transactionId);
  await updateDoc(transactionRef, data);
};

// Excluir uma transação
export const deleteUserTransaction = async (
  uid: string,
  transactionId: string,
  type: TransactionCollection,
) => {
  const transactionRef = doc(db, "users", uid, type, transactionId);
  await deleteDoc(transactionRef);
};

// Atualizar somente o valor acumulado da meta
export const updateUserInvestmentAmount = async (
  uid: string,
  investmentId: string,
  amount: number,
) => {
  const investmentRef = doc(db, "users", uid, "investments", investmentId);

  await updateDoc(investmentRef, { amount });
};

// Excluir uma meta
export const deleteUserInvestment = async (
  uid: string,
  investmentId: string,
) => {
  const investmentRef = doc(db, "users", uid, "investments", investmentId);

  await deleteDoc(investmentRef);
};

// Marcar uma meta como concluída

export const completeUserInvestment = async (
  uid: string,
  investmentId: string,
  goalAmount: number,
) => {
  const investmentRef = doc(db, "users", uid, "investments", investmentId);

  await updateDoc(investmentRef, {
    amount: goalAmount,
    completed: true,
  });
};
