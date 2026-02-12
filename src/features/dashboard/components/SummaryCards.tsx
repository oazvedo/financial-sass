import React, { useMemo } from 'react';
import { useTransactions } from '../../transactions/hooks/useTransactions';
import { Card } from '../../../common/components/Card/Card';
import { formatBRL } from '../../../common/utils/formatCurrency';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';

interface SummaryCardsProps {
    startDate?: string;
    endDate?: string;
    category?: string;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ startDate, endDate, category }) => {
    const { transactions } = useTransactions();

    const summary = useMemo(() => {
        let filtered = transactions;

        if (category) {
            filtered = filtered.filter(t => t.category === category);
        }
        if (startDate) {
            filtered = filtered.filter(t => t.date >= startDate);
        }
        if (endDate) {
            filtered = filtered.filter(t => t.date <= endDate);
        }

        const income = filtered
            .filter((t) => t.type === 'income')
            .reduce((acc, curr) => acc + curr.amount, 0);
        const expense = filtered
            .filter((t) => t.type === 'expense')
            .reduce((acc, curr) => acc + curr.amount, 0);
        const balance = income - expense;
        return { income, expense, balance };
    }, [transactions, category, startDate, endDate]);

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
        }}>
            <Card>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Entradas</span>
                    <ArrowUpCircle size={24} color="var(--color-success)" />
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {formatBRL(summary.income)}
                </div>
            </Card>

            <Card>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Saídas</span>
                    <ArrowDownCircle size={24} color="var(--color-danger)" />
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {formatBRL(summary.expense)}
                </div>
            </Card>

            <Card style={{
                backgroundColor: summary.balance >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                borderColor: summary.balance >= 0 ? 'var(--color-success)' : 'var(--color-danger)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ color: 'var(--color-text-primary)', fontSize: '0.875rem', fontWeight: 500 }}>Saldo Total</span>
                    <Wallet size={24} color={summary.balance >= 0 ? 'var(--color-success)' : 'var(--color-danger)'} />
                </div>
                <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: summary.balance >= 0 ? 'var(--color-success)' : 'var(--color-danger)'
                }}>
                    {formatBRL(summary.balance)}
                </div>
            </Card>
        </div>
    );
};
