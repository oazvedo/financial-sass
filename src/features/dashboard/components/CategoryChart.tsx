import React, { useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { useTransactions } from '../../transactions/hooks/useTransactions';
import { Card } from '../../../common/components/Card/Card';

// Using a refined palette for the bars
const BAR_COLORS = [
    '#6366f1', // Indigo
    '#8b5cf6', // Violet
    '#ec4899', // Pink
    '#f43f5e', // Rose
    '#f97316', // Orange
    '#f59e0b', // Amber
    '#10b981', // Emerald
    '#06b6d4', // Cyan
];

interface CategoryChartProps {
    startDate?: string;
    endDate?: string;
    category?: string;
}

interface ChartData {
    name: string;
    value: number;
    percentage: number;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: {
        payload: {
            name: string;
            value: number;
            percentage: number;
        };
    }[];
    label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div style={{
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <p style={{
                    margin: 0,
                    color: 'var(--color-text-primary)',
                    fontWeight: 600,
                    marginBottom: '0.25rem'
                }}>
                    {label}
                </p>
                <p style={{ margin: 0, color: 'var(--color-primary)', fontWeight: 500 }}>
                    {`R$ ${data.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                </p>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                    {`${data.percentage.toFixed(1)}% do total`}
                </p>
            </div>
        );
    }
    return null;
};

export const CategoryChart: React.FC<CategoryChartProps> = ({ startDate, endDate, category }) => {
    const { transactions } = useTransactions();

    const data = useMemo<ChartData[]>(() => {
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
        let totalAmount = 0;

        filtered.forEach(t => {
            categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
            totalAmount += t.amount;
        });

        // Top 5 categories + Others if needed, but for now let's just show top 8 to fit nicely
        return Object.entries(categoryTotals)
            .map(([name, value]) => ({
                name,
                value,
                percentage: totalAmount > 0 ? (value / totalAmount) * 100 : 0
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 8); // Limit to top 8 for cleaner UI
    }, [transactions, category, startDate, endDate]);

    if (data.length === 0) {
        return (
            <Card title="Despesas por Categoria" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-bg-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-text-muted)',
                        fontSize: '1.5rem'
                    }}>
                        📊
                    </div>
                    <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>
                        Nenhuma despesa encontrada<br />para o período selecionado.
                    </p>
                </div>
            </Card>
        );
    }

    return (
        <Card title="Despesas por Categoria">
            <div style={{ width: '100%', height: '350px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={data}
                        margin={{ top: 10, right: 30, left: 40, bottom: 0 }}
                        barSize={20}
                    >
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="name"
                            type="category"
                            tick={{ fill: 'var(--color-text-secondary)', fontSize: 13 }}
                            width={100}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-bg-tertiary)', opacity: 0.4 }} />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};
