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

export const IncomesPage: React.FC = () => {
    const { transactions } = useTransactions();
    const { incomeCategories } = useCategories();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [category, setCategory] = useState('');

    const totalIncomes = useMemo(() => {
        return transactions
            .filter((t) => t.type === 'income')
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
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Receitas</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Gerencie suas entradas financeiras</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <FilterButton
                        categories={incomeCategories}
                        onApply={handleFilterApply}
                    />
                    <Button onClick={() => setIsModalOpen(true)} icon={<Plus size={20} />}>
                        Nova Receita
                    </Button>
                </div>
            </div>

            <Card style={{ marginBottom: '2rem', borderColor: 'var(--color-success)' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Total Receitas</p>
                <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-success)' }}>
                    {formatBRL(totalIncomes)}
                </p>
            </Card>

            <TransactionList
                filterType="income"
                startDate={startDate}
                endDate={endDate}
                category={category}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Nova Receita"
            >
                <TransactionForm
                    defaultType="income"
                    fixedType="income"
                    onSuccess={() => setIsModalOpen(false)}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
};
