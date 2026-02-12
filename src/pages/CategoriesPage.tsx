import React from 'react';
import { CategoryList } from '../features/categories/components/CategoryList';

export const CategoriesPage: React.FC = () => {
    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Categorias</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Gerencie as categorias de receitas e despesas</p>
            </div>
            <CategoryList />
        </div>
    );
};
