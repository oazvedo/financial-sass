import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Transaction, TransactionInput } from '../types';

interface TransactionContextType {
    transactions: Transaction[];
    addTransaction: (transaction: TransactionInput) => void;
    removeTransaction: (id: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        try {
            const stored = localStorage.getItem('financial-sass-transactions');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to parse transactions from local storage', error);
            return [];
        }
    });

    // Save to local storage
    useEffect(() => {
        localStorage.setItem('financial-sass-transactions', JSON.stringify(transactions));
    }, [transactions]);

    const addTransaction = (input: TransactionInput) => {
        const newTransaction: Transaction = {
            ...input,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        };
        setTransactions((prev) => [newTransaction, ...prev]);
    };

    const removeTransaction = (id: string) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction, removeTransaction }}>
            {children}
        </TransactionContext.Provider>
    );
};
