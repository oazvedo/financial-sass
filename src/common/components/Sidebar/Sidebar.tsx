import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    ArrowUpCircle,
    ArrowDownCircle,
    LogOut,
    Menu,
    Wallet,

    Sun,
    Moon,
    Tags
} from 'lucide-react';
import clsx from 'clsx';
import './Sidebar.css';
import { Button } from '../Button/Button';

interface SidebarProps {
    onLogout?: () => void;
    user?: {
        name: string;
        email: string;
    };
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout, user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const toggleSidebar = () => setIsOpen(!isOpen);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/home' },
        { icon: ArrowUpCircle, label: 'Receitas', path: '/incomes' },
        { icon: ArrowDownCircle, label: 'Despesas', path: '/expenses' },
        { icon: Tags, label: 'Categorias', path: '/categories' },
        // { icon: Settings, label: 'Configurações', path: '/settings' },
    ];

    return (
        <>
            <button
                className="mobile-toggle"
                onClick={toggleSidebar}
                aria-label="Toggle Menu"
            >
                <Menu size={24} />
            </button>

            {isOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={clsx('sidebar', { open: isOpen, collapsed: isCollapsed })}>
                <div className="sidebar-header">
                    <NavLink to="/home" className="sidebar-brand">
                        <Wallet size={32} />
                        <span className={clsx('sidebar-logo', { hidden: isCollapsed })}>FinSaaS</span>
                    </NavLink>
                    <button className="collapse-toggle" onClick={toggleCollapse}>
                        {isCollapsed ? <Menu size={20} /> : <Menu size={20} />}
                    </button>
                    {/* Note: I'm using Menu icon for collapse toggle for now, ideal would be Chevron */}
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => clsx('nav-item', { active: isActive })}
                            onClick={() => setIsOpen(false)}
                            title={isCollapsed ? item.label : undefined}
                        >
                            <item.icon className="nav-icon" />
                            <span className={clsx({ hidden: isCollapsed })}>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    {user && (
                        <NavLink to="/profile" className={clsx('user-profile', { justified: isCollapsed })} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="user-avatar">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className={clsx('user-info', { hidden: isCollapsed })}>
                                <p className="user-name">{user.name}</p>
                                <p className="user-email">{user.email}</p>
                            </div>
                        </NavLink>
                    )}
                    <Button
                        variant="ghost"
                        fullWidth={!isCollapsed}
                        onClick={onLogout}
                        icon={<LogOut size={18} />}
                        className={clsx({ 'btn-icon-only': isCollapsed })}
                        style={{ marginTop: '0.5rem', justifyContent: isCollapsed ? 'center' : 'flex-start' }}
                        title={isCollapsed ? "Sair" : undefined}
                    >
                        <span className={clsx({ hidden: isCollapsed })}>Sair</span>
                    </Button>
                    <Button
                        variant="ghost"
                        fullWidth={!isCollapsed}
                        onClick={toggleTheme}
                        icon={theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        className={clsx({ 'btn-icon-only': isCollapsed })}
                        style={{ marginTop: '0.5rem', justifyContent: isCollapsed ? 'center' : 'flex-start' }}
                        title={isCollapsed ? (theme === 'dark' ? "Modo Claro" : "Modo Escuro") : undefined}
                    >
                        <span className={clsx({ hidden: isCollapsed })}>
                            {theme === 'dark' ? "Modo Claro" : "Modo Escuro"}
                        </span>
                    </Button>
                </div>
            </aside>
        </>
    );
};
