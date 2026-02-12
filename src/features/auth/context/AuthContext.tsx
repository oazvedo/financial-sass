import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const FAKE_USER: User = {
    id: '1',
    name: 'André Developer',
    email: 'andre@example.com',
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const storedUser = localStorage.getItem('financial-sass-user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error('Failed to parse user from local storage', error);
            return null;
        }
    });

    const [isLoading, setIsLoading] = useState(false);

    // We don't need the useEffect to load anymore since we do it lazily.
    // But we might want to simulate a check if needed. For now, lazy is ample.

    const login = async (email: string) => {
        setIsLoading(true);
        // Simulate API call
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                const newUser = { ...FAKE_USER, email };
                setUser(newUser);
                localStorage.setItem('financial-sass-user', JSON.stringify(newUser));
                setIsLoading(false);
                resolve();
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('financial-sass-user');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
