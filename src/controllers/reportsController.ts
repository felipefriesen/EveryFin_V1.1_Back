import { Request, Response } from 'express';
import { transactions } from '../models/transactions';

export const generateReport = (req: Request, res: Response) => {
  const { type, start, end } = req.body;
  let filtered = transactions;
  if (type && type !== 'geral') {
    filtered = filtered.filter(tx => tx.type === type);
  }
  if (start) {
    filtered = filtered.filter(tx => tx.date >= start);
  }
  if (end) {
    filtered = filtered.filter(tx => tx.date <= end);
  }
  res.json(filtered);
};
