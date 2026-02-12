import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Using useNavigate instead of direct redirect
import { useAuth } from '../hooks/useAuth';
import { Input } from '../../../common/components/Input/Input';
import { Button } from '../../../common/components/Button/Button';
import { Lock, Mail } from 'lucide-react';

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email);
            // Navigation is handled by the route protection or parent component usually,
            // but for simplicity we can navigate here or let the user state change trigger it.
            // In this mock, we just wait for login to resolve.
            navigate('/');
        } catch {
            setError('Falha no login. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {error && (
                <div style={{ color: 'var(--color-danger)', fontSize: '0.875rem', textAlign: 'center' }}>
                    {error}
                </div>
            )}

            <Input
                type="email"
                label="Email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                icon={<Mail size={18} />}
            />

            <Input
                type="password"
                label="Senha"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                icon={<Lock size={18} />}
            />

            <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                style={{ marginTop: '1rem' }}
            >
                Entrar
            </Button>
        </form>
    );
};
