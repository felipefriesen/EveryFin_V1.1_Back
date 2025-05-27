export interface Transaction {
  id: number;
  type: 'entrada' | 'saida';
  description: string;
  value: number;
  date: string; // ISO yyyy-mm-dd
  category: string;
  client?: string;
}

export const transactions: Transaction[] = [];

export let nextTxId = 1;
