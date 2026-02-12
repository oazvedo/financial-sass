import React, { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { useCategories } from '../../categories/hooks/useCategories';
import { type TransactionType } from '../types';
import { Button } from '../../../common/components/Button/Button';
import { Input } from '../../../common/components/Input/Input';

interface TransactionFormProps {
    defaultType?: TransactionType;
    fixedType?: TransactionType;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
    defaultType = 'expense',
    fixedType,
    onSuccess,
    onCancel
}) => {
    const { addTransaction } = useTransactions();
    const { incomeCategories, expenseCategories } = useCategories();
    const [type, setType] = useState<TransactionType>(fixedType || defaultType);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const categories = type === 'income' ? incomeCategories : expenseCategories;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        addTransaction({
            title,
            amount: Number(amount),
            type,
            category,
            date,
        });

        setTitle('');
        setAmount('');
        setCategory('');
        if (onSuccess) onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {!fixedType && (
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <Button
                        type="button"
                        variant={type === 'income' ? 'primary' : 'secondary'}
                        onClick={() => { setType('income'); setCategory(''); }}
                        fullWidth
                        className={type === 'income' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                        style={type === 'income' ? { backgroundColor: 'var(--color-success)' } : {}}
                    >
                        Receita
                    </Button>
                    <Button
                        type="button"
                        variant={type === 'expense' ? 'primary' : 'secondary'}
                        onClick={() => { setType('expense'); setCategory(''); }}
                        fullWidth
                        style={type === 'expense' ? { backgroundColor: 'var(--color-danger)' } : {}}
                    >
                        Despesa
                    </Button>
                </div>
            )}

            <Input
                label="Descrição"
                placeholder="Ex: Compras de supermercado"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <Input
                label="Valor (R$)"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />

            <div className="input-wrapper">
                <label className="input-label">Categoria</label>
                <select
                    className="input-field"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="" disabled>Selecione uma categoria</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <Input
                label="Data"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                {onCancel && (
                    <Button type="button" variant="ghost" onClick={onCancel} fullWidth>
                        Cancelar
                    </Button>
                )}
                <Button type="submit" fullWidth>
                    Salvar
                </Button>
            </div>
        </form>
    );
};
