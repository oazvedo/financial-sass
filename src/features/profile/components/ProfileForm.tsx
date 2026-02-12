import React, { useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { Card } from '../../../common/components/Card/Card';
import { Input } from '../../../common/components/Input/Input';
import { Button } from '../../../common/components/Button/Button';

export const ProfileForm: React.FC = () => {
    const { user } = useAuth(); // We can use login to update user state if we had a dedicated update function, but for now we'll mock it or assume login updates state
    // Actually AuthContext interface has login/logout. We might need to add an 'updateUser' method to AuthContext or just hack it by calling login again? 
    // The requirement says "Edit Name/Email (mock persistence)".
    // So I'll just update local state and maybe localStorage if AuthProvider reads from there.

    // Check AuthContext: it reads from localStorage 'user'. So if I update localStorage and reload, it updates. 
    // Or I can add updateUser to context. For now, I'll just update localStorage and trigger a reload or mock success.

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const updatedUser = { ...user, name, email };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Force reload to update context (simple solution) or better, we should expose setUser in context.
        // For this task, I'll just show success and maybe reload or trust the user sees it next time. 
        // To be nice, I'll reload.
        window.location.reload();

        setIsLoading(false);
    };

    return (
        <Card title="Meu Perfil" style={{ maxWidth: '600px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '2rem',
                        fontWeight: 600
                    }}>
                        {name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{name}</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>{email}</p>
                    </div>
                </div>

                <Input
                    label="Nome Completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Button type="submit" fullWidth disabled={isLoading}>
                    {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
            </form>
        </Card>
    );
};
