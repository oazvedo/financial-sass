import { useState, useEffect } from 'react';

const DEFAULT_INCOME_CATEGORIES = ['Salário', 'Freelance', 'Investimentos', 'Outros'];
const DEFAULT_EXPENSE_CATEGORIES = ['Alimentação', 'Moradia', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Outros'];

export const useCategories = () => {
    const [incomeCategories, setIncomeCategories] = useState<string[]>(() => {
        const saved = localStorage.getItem('incomeCategories');
        return saved ? JSON.parse(saved) : DEFAULT_INCOME_CATEGORIES;
    });

    const [expenseCategories, setExpenseCategories] = useState<string[]>(() => {
        const saved = localStorage.getItem('expenseCategories');
        return saved ? JSON.parse(saved) : DEFAULT_EXPENSE_CATEGORIES;
    });

    useEffect(() => {
        localStorage.setItem('incomeCategories', JSON.stringify(incomeCategories));
    }, [incomeCategories]);

    useEffect(() => {
        localStorage.setItem('expenseCategories', JSON.stringify(expenseCategories));
    }, [expenseCategories]);

    const addCategory = (type: 'income' | 'expense', category: string) => {
        if (type === 'income') {
            if (!incomeCategories.includes(category)) {
                setIncomeCategories([...incomeCategories, category]);
            }
        } else {
            if (!expenseCategories.includes(category)) {
                setExpenseCategories([...expenseCategories, category]);
            }
        }
    };

    const removeCategory = (type: 'income' | 'expense', category: string) => {
        if (type === 'income') {
            setIncomeCategories(incomeCategories.filter(c => c !== category));
        } else {
            setExpenseCategories(expenseCategories.filter(c => c !== category));
        }
    };

    return {
        incomeCategories,
        expenseCategories,
        addCategory,
        removeCategory
    };
};
