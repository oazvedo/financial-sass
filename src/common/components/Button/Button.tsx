import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    isLoading?: boolean;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    isLoading = false,
    icon,
    disabled,
    ...props
}) => {
    return (
        <button
            className={clsx(
                'btn',
                `btn-${variant}`,
                `btn-${size}`,
                { 'btn-full': fullWidth },
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <span className="spinner" />}
            {!isLoading && icon && <span className="btn-icon">{icon}</span>}
            {children}
        </button>
    );
};
