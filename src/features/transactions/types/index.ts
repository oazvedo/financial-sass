export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string;
    title: string;
    amount: number;
    type: TransactionType;
    category: string;
    date: string; // ISO string
    createdAt: string;
}

export interface TransactionInput {
    title: string;
    amount: number;
    type: TransactionType;
    category: string;
    date: string;
}

export const INCOME_CATEGORIES = [
    'Salário',
    'Freelance',
    'Investimentos',
    'Outros',
];

export const EXPENSE_CATEGORIES = [
    'Alimentação',
    'Moradia',
    'Transporte',
    'Lazer',
    'Saúde',
    'Educação',
    'Outros',
];
