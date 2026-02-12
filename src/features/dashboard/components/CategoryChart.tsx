import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTransactions } from '../../transactions/hooks/useTransactions';
import { Card } from '../../../common/components/Card/Card';

const COLORS = [
    '#6366f1', // Indigo
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#8b5cf6', // Violet
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#f97316', // Orange
];

interface CategoryChartProps {
    startDate?: string;
    endDate?: string;
    category?: string;
}

export const CategoryChart: React.FC<CategoryChartProps> = ({ startDate, endDate, category }) => {
    const { transactions } = useTransactions();

    const data = useMemo(() => {
        let filtered = transactions.filter(t => t.type === 'expense');

        if (category) {
            filtered = filtered.filter(t => t.category === category);
        }
        if (startDate) {
            filtered = filtered.filter(t => t.date >= startDate);
        }
        if (endDate) {
            filtered = filtered.filter(t => t.date <= endDate);
        }

        const categoryTotals: Record<string, number> = {};

        filtered.forEach(t => {
            categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
        });

        return Object.entries(categoryTotals)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    }, [transactions, category, startDate, endDate]);

    if (data.length === 0) {
        return (
            <Card title="Despesas por Categoria" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: 'var(--color-text-secondary)' }}>Sem dados de despesas para exibir.</p>
            </Card>
        );
    }

    return (
        <Card title="Despesas por Categoria">
            <div style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number | undefined) => `R$ ${Number(value || 0).toFixed(2)}`}
                            contentStyle={{
                                backgroundColor: 'var(--color-bg-secondary)',
                                borderColor: 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--color-text-primary)'
                            }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};
