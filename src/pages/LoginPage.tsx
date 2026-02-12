import React from 'react';
import { LoginForm } from '../features/auth/components/LoginForm';
import { Card } from '../common/components/Card/Card';
import { Wallet } from 'lucide-react';

export const LoginPage: React.FC = () => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-bg-primary)',
            padding: '1rem'
        }}>
            <Card
                style={{ width: '100%', maxWidth: '400px' }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: 'var(--color-primary)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                        color: 'white'
                    }}>
                        <Wallet size={24} />
                    </div>
                    <h1 style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: 'var(--color-text-primary)',
                        marginBottom: '0.5rem'
                    }}>
                        Bem-vindo de volta
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        Entre para gerenciar suas finanças
                    </p>
                </div>

                <LoginForm />
            </Card>
        </div>
    );
};
