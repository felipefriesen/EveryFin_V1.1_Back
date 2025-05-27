import { Request, Response } from 'express';
import { transactions } from '../models/transactions';

export const getSummary = (req: Request, res: Response) => {
  const entradas = transactions.filter(tx => tx.type === 'entrada');
  const saidas = transactions.filter(tx => tx.type === 'saida');
  const totalEntradas = entradas.reduce((sum, tx) => sum + tx.value, 0);
  const totalSaidas = saidas.reduce((sum, tx) => sum + tx.value, 0);
  const lucro = totalEntradas - totalSaidas;
  const projection = lucro; // Simples projeção igual ao lucro atual

  // History: group by date
  const dates = Array.from(new Set(transactions.map(tx => tx.date))).sort();
  const history = dates.map(date => {
    const sum = transactions
      .filter(tx => tx.date === date)
      .reduce((s, tx) => s + tx.value * (tx.type === 'saida' ? -1 : 1), 0);
    return { date, value: sum };
  });

  res.json({ totalEntradas, totalSaidas, lucro, projection, history });
};
