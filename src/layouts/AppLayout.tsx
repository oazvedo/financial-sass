import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../common/components/Sidebar/Sidebar';
import { useAuth } from '../features/auth/hooks/useAuth';

export const AppLayout: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar user={user || undefined} onLogout={logout} />
            <main style={{
                flex: 1,
                marginLeft: '280px', // Matches sidebar width
                padding: '2rem',
                minHeight: '100vh',
                backgroundColor: 'var(--color-bg-primary)',
                width: 'calc(100% - 280px)'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
