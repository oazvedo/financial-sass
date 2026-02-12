import React, { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, ...props }, ref) => {
        return (
            <div className="input-wrapper">
                {label && <label className="input-label">{label}</label>}
                <div className="input-container">
                    {icon && <span className="input-icon">{icon}</span>}
                    <input
                        ref={ref}
                        className={clsx(
                            'input-field',
                            { 'has-error': !!error },
                            { 'has-icon': !!icon },
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && <span className="input-error">{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';
