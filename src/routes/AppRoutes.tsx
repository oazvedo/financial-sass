import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { AppLayout } from '../layouts/AppLayout';
import { HomePage } from '../pages/HomePage';
import { IncomesPage } from '../pages/IncomesPage';
import { ExpensesPage } from '../pages/ExpensesPage';
import { CategoriesPage } from '../pages/CategoriesPage';
import { ProfilePage } from '../pages/ProfilePage';
import { useAuth } from '../features/auth/hooks/useAuth';

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--color-bg-primary)',
                color: 'var(--color-text-primary)'
            }}>
                Carregando...
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: React.ReactElement }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return null;

    return isAuthenticated ? <Navigate to="/" /> : children;
};

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={
                <PublicRoute>
                    <LoginPage />
                </PublicRoute>
            } />

            <Route path="/" element={
                <PrivateRoute>
                    <AppLayout />
                </PrivateRoute>
            }>
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="home" element={<HomePage />} />
                <Route path="incomes" element={<IncomesPage />} />
                <Route path="expenses" element={<ExpensesPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="profile" element={<ProfilePage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
