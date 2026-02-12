import React, { useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import { Card } from '../../../common/components/Card/Card';
import { Button } from '../../../common/components/Button/Button';
import { Input } from '../../../common/components/Input/Input';
import { Trash2, Plus } from 'lucide-react';
import type { TransactionType } from '../../transactions/types';
import { ConfirmationModal } from '../../../common/components/Modal/ConfirmationModal';

export const CategoryList: React.FC = () => {
    const { incomeCategories, expenseCategories, addCategory, removeCategory } = useCategories();
    const [newIncome, setNewIncome] = useState('');
    const [newExpense, setNewExpense] = useState('');
    const [deleteTarget, setDeleteTarget] = useState<{ type: TransactionType; category: string } | null>(null);

    const handleAdd = (type: TransactionType) => {
        if (type === 'income' && newIncome.trim()) {
            addCategory('income', newIncome.trim());
            setNewIncome('');
        } else if (type === 'expense' && newExpense.trim()) {
            addCategory('expense', newExpense.trim());
            setNewExpense('');
        }
    };

    const handleDeleteClick = (type: TransactionType, category: string) => {
        setDeleteTarget({ type, category });
    };

    const handleConfirmDelete = () => {
        if (deleteTarget) {
            removeCategory(deleteTarget.type, deleteTarget.category);
            setDeleteTarget(null);
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Income Categories */}
            <Card title="Categorias de Receita" style={{ borderColor: 'var(--color-success)' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Input
                        placeholder="Nova categoria..."
                        value={newIncome}
                        onChange={(e) => setNewIncome(e.target.value)}
                    />
                    <Button onClick={() => handleAdd('income')} icon={<Plus size={18} />} style={{ backgroundColor: 'var(--color-success)' }} />
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {incomeCategories.map(cat => (
                        <li key={cat} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.5rem',
                            backgroundColor: 'var(--color-bg-primary)',
                            borderRadius: 'var(--radius-sm)'
                        }}>
                            <span>{cat}</span>
                            <button
                                onClick={() => handleDeleteClick('income', cat)}
                                style={{ color: 'var(--color-text-muted)', cursor: 'pointer', display: 'flex' }}
                                title="Remover"
                            >
                                <Trash2 size={16} />
                            </button>
                        </li>
                    ))}
                </ul>
            </Card>

            {/* Expense Categories */}
            <Card title="Categorias de Despesa" style={{ borderColor: 'var(--color-danger)' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Input
                        placeholder="Nova categoria..."
                        value={newExpense}
                        onChange={(e) => setNewExpense(e.target.value)}
                    />
                    <Button onClick={() => handleAdd('expense')} variant="danger" icon={<Plus size={18} />} />
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {expenseCategories.map(cat => (
                        <li key={cat} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.5rem',
                            backgroundColor: 'var(--color-bg-primary)',
                            borderRadius: 'var(--radius-sm)'
                        }}>
                            <span>{cat}</span>
                            <button
                                onClick={() => handleDeleteClick('expense', cat)}
                                style={{ color: 'var(--color-text-muted)', cursor: 'pointer', display: 'flex' }}
                                title="Remover"
                            >
                                <Trash2 size={16} />
                            </button>
                        </li>
                    ))}
                </ul>
            </Card>

            <ConfirmationModal
                isOpen={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleConfirmDelete}
                title="Excluir Categoria"
                message={`Tem certeza que deseja excluir a categoria "${deleteTarget?.category}"?`}
                confirmLabel="Excluir"
                variant="danger"
            />
        </div>
    );
};
