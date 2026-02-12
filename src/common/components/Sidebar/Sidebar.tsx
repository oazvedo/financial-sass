import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    ArrowUpCircle,
    ArrowDownCircle,
    LogOut,
    Menu,
    Wallet,
    Sun,
    Moon,
    Tags,
    Headset,
    User,
    Edit,
    CreditCard,
    ChevronLeft,
    ChevronRight
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
    isCollapsed: boolean;
    onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout, user, isCollapsed, onToggleCollapse }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false);
            }
        };

        if (isProfileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileMenuOpen]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleProfileMenuClick = (path: string) => {
        navigate(path);
        setIsProfileMenuOpen(false);
        setIsOpen(false);
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/home' },
        { icon: ArrowUpCircle, label: 'Receitas', path: '/incomes' },
        { icon: ArrowDownCircle, label: 'Despesas', path: '/expenses' },
        { icon: Tags, label: 'Categorias', path: '/categories' },
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
                    <button className="collapse-toggle" onClick={onToggleCollapse}>
                        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
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

                    <Button
                        variant="ghost"
                        fullWidth={!isCollapsed}
                        onClick={() => window.open('https://support.example.com', '_blank')}
                        icon={<Headset size={20} />}
                        className={clsx('nav-item-button', { 'btn-icon-only': isCollapsed })}
                        style={{
                            justifyContent: isCollapsed ? 'center' : 'flex-start',
                            marginTop: 'auto',
                            color: 'var(--color-text-secondary)',
                            fontWeight: 500
                        }}
                        title={isCollapsed ? "Suporte" : undefined}
                    >
                        <span className={clsx({ hidden: isCollapsed })}>Suporte</span>
                    </Button>
                </nav>

                <div className="sidebar-footer">
                    {user && (
                        <div className="profile-container" ref={profileMenuRef} style={{ position: 'relative' }}>
                            <div
                                className={clsx('user-profile', { justified: isCollapsed })}
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                            >
                                <div className="user-avatar">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className={clsx('user-info', { hidden: isCollapsed })}>
                                    <p className="user-name">{user.name}</p>
                                    <p className="user-email">{user.email}</p>
                                </div>
                            </div>

                            {isProfileMenuOpen && (
                                <div className="profile-menu">
                                    <button onClick={() => handleProfileMenuClick('/profile')} className="profile-menu-item">
                                        <User size={16} />
                                        <span>Ver Perfil</span>
                                    </button>
                                    <button onClick={() => handleProfileMenuClick('/profile/edit')} className="profile-menu-item">
                                        <Edit size={16} />
                                        <span>Editar</span>
                                    </button>
                                    <button onClick={() => handleProfileMenuClick('/subscription')} className="profile-menu-item">
                                        <CreditCard size={16} />
                                        <span>Ver Assinaturas</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexDirection: isCollapsed ? 'column' : 'row' }}>
                        <Button
                            variant="ghost"
                            fullWidth={!isCollapsed}
                            onClick={onLogout}
                            icon={<LogOut size={18} />}
                            className={clsx({ 'btn-icon-only': isCollapsed })}
                            style={{ justifyContent: isCollapsed ? 'center' : 'flex-start', padding: isCollapsed ? '0.5rem' : '0.5rem 1rem' }}
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
                            style={{ justifyContent: isCollapsed ? 'center' : 'flex-start', padding: isCollapsed ? '0.5rem' : '0.5rem 1rem' }}
                            title={isCollapsed ? (theme === 'dark' ? "Modo Claro" : "Modo Escuro") : undefined}
                        >
                            <span className={clsx({ hidden: isCollapsed })}>
                                {theme === 'dark' ? "Claro" : "Escuro"}
                            </span>
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
};
