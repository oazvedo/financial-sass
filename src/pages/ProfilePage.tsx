import React from 'react';
import { ProfileForm } from '../features/profile/components/ProfileForm';

export const ProfilePage: React.FC = () => {
    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Configurações de Perfil</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Gerencie suas informações pessoais</p>
            </div>
            <ProfileForm />
        </div>
    );
};
