import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../common/components/Sidebar/Sidebar';
import { useAuth } from '../features/auth/hooks/useAuth';

export const AppLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar
                user={user || undefined}
                onLogout={logout}
                isCollapsed={isCollapsed}
                onToggleCollapse={toggleCollapse}
            />
            <main style={{
                flex: 1,
                marginLeft: isCollapsed ? '80px' : '280px',
                padding: '2rem',
                minHeight: '100vh',
                backgroundColor: 'var(--color-bg-primary)',
                width: `calc(100% - ${isCollapsed ? '80px' : '280px'})`,
                transition: 'margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1), width 300ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
