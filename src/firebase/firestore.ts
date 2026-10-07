import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
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

  // Mais recente adicionada primeiro
  const investmentsQuery = query(investmentsRef, orderBy("createdAt", "desc"));

  const snapshot = await getDocs(investmentsQuery);

  return snapshot.docs.map((investment) => ({
    id: investment.id,
    ...(investment.data() as Omit<Investment, "id">),
  }));
};
