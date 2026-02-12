import React, { useMemo } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import type { TransactionType } from '../types';
import { formatBRL } from '../../../common/utils/formatCurrency';
import { Trash2 } from 'lucide-react';
import { Button } from '../../../common/components/Button/Button';
import { Card } from '../../../common/components/Card/Card';

interface TransactionListProps {
    filterType?: TransactionType;
    limit?: number;
    startDate?: string;
    endDate?: string;
    category?: string;
}

export const TransactionList: React.FC<TransactionListProps> = ({
    filterType,
    limit,
    startDate,
    endDate,
    category
}) => {
    const { transactions, removeTransaction } = useTransactions();

    const filteredTransactions = useMemo(() => {
        let result = transactions;
        if (filterType) {
            result = result.filter(t => t.type === filterType);
        }
        if (category) {
            result = result.filter(t => t.category === category);
        }
        if (startDate) {
            result = result.filter(t => t.date >= startDate);
        }
        if (endDate) {
            result = result.filter(t => t.date <= endDate);
        }

        // Sort by date desc
        result = [...result].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        if (limit) {
            result = result.slice(0, limit);
        }
        return result;
    }, [transactions, filterType, limit, startDate, endDate, category]);

    if (filteredTransactions.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>
                Nenhuma transação encontrada.
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredTransactions.map((transaction) => (
                <Card key={transaction.id} style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <h4 style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{transaction.title}</h4>
                            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{
                                fontWeight: 600,
                                color: transaction.type === 'income' ? 'var(--color-success)' : 'var(--color-danger)'
                            }}>
                                {transaction.type === 'income' ? '+' : '-'} {formatBRL(transaction.amount)}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTransaction(transaction.id)}
                                aria-label="Delete transaction"
                            >
                                <Trash2 size={16} color="var(--color-text-muted)" />
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};
