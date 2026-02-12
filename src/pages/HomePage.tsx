import React, { useState } from 'react';
import { SummaryCards } from '../features/dashboard/components/SummaryCards';
import { CategoryChart } from '../features/dashboard/components/CategoryChart';
import { TransactionList } from '../features/transactions/components/TransactionList';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useCategories } from '../features/categories/hooks/useCategories';
import { FilterButton } from '../common/components/Filter/FilterButton';

export const HomePage: React.FC = () => {
    const { user } = useAuth();
    const { incomeCategories, expenseCategories } = useCategories();
    // Merge categories for dashboard filter
    const allCategories = React.useMemo(() => [...new Set([...incomeCategories, ...expenseCategories])], [incomeCategories, expenseCategories]);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [category, setCategory] = useState('');

    const firstName = user?.name.split(' ')[0];

    const handleFilterApply = (filters: { startDate: string; endDate: string; category: string }) => {
        setStartDate(filters.startDate);
        setEndDate(filters.endDate);
        setCategory(filters.category);
    };

    return (
        <div>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        Olá, {firstName}
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Aqui está o resumo das suas finanças hoje.</p>
                </div>
                <FilterButton
                    categories={allCategories}
                    onApply={handleFilterApply}
                />
            </div>

            <SummaryCards startDate={startDate} endDate={endDate} category={category} />

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2rem',
                marginBottom: '2rem'
            }}>
                <div style={{ minWidth: 0 }}> {/* minWidth 0 prevents flex child from overflowing */}
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
                        Despesas por Categoria
                    </h2>
                    <CategoryChart startDate={startDate} endDate={endDate} category={category} />
                </div>

                <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                            Últimas Transações
                        </h2>
                        {/* Link to view all could go here */}
                    </div>
                    <TransactionList limit={5} startDate={startDate} endDate={endDate} category={category} />
                </div>
            </div>
        </div>
    );
};
