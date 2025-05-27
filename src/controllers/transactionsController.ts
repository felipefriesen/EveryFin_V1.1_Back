import { Request, Response } from 'express';
import { transactions, nextTxId } from '../models/transactions';

export const getEntradas = (req: Request, res: Response) => {
  const entradas = transactions.filter(tx => tx.type === 'entrada');
  res.json(entradas);
};

export const getSaidas = (req: Request, res: Response) => {
  const saidas = transactions.filter(tx => tx.type === 'saida');
  res.json(saidas);
};

export const createTransaction = (req: Request, res: Response) => {
  const { type, description, value, date, category, client } = req.body;
  if (!type || !description || value == null || !date || !category) {
    return res.status(400).json({ message: 'Dados inválidos' });
  }
  const id = nextTxId++;
  const tx = { id, type, description, value, date, category, client };
  transactions.push(tx);
  res.status(201).json(tx);
};
