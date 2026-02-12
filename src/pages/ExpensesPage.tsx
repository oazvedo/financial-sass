import React, { useState, useMemo } from 'react';
import { TransactionList } from '../features/transactions/components/TransactionList';
import { TransactionForm } from '../features/transactions/components/TransactionForm';
import { useTransactions } from '../features/transactions/hooks/useTransactions';
import { useCategories } from '../features/categories/hooks/useCategories';
import { FilterButton } from '../common/components/Filter/FilterButton';
import { Modal } from '../common/components/Modal/Modal';
import { Button } from '../common/components/Button/Button';
import { Card } from '../common/components/Card/Card';
import { formatBRL } from '../common/utils/formatCurrency';
import { Plus } from 'lucide-react';

export const ExpensesPage: React.FC = () => {
    const { transactions } = useTransactions();
    const { expenseCategories } = useCategories();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [category, setCategory] = useState('');

    const totalExpenses = useMemo(() => {
        return transactions
            .filter((t) => t.type === 'expense')
            .filter((t) => !category || t.category === category)
            .filter((t) => !startDate || t.date >= startDate)
            .filter((t) => !endDate || t.date <= endDate)
            .reduce((acc, curr) => acc + curr.amount, 0);
    }, [transactions, category, startDate, endDate]);

    const handleFilterApply = (filters: { startDate: string; endDate: string; category: string }) => {
        setStartDate(filters.startDate);
        setEndDate(filters.endDate);
        setCategory(filters.category);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Despesas</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Gerencie suas saídas financeiras</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <FilterButton
                        categories={expenseCategories}
                        onApply={handleFilterApply}
                    />
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        variant="danger"
                        icon={<Plus size={20} />}
                    >
                        Nova Despesa
                    </Button>
                </div>
            </div>

            <Card style={{ marginBottom: '2rem', borderColor: 'var(--color-danger)' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Total Despesas</p>
                <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-danger)' }}>
                    {formatBRL(totalExpenses)}
                </p>
            </Card>

            <TransactionList
                filterType="expense"
                startDate={startDate}
                endDate={endDate}
                category={category}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Nova Despesa"
            >
                <TransactionForm
                    defaultType="expense"
                    fixedType="expense"
                    onSuccess={() => setIsModalOpen(false)}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
};
