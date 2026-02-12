import React from 'react';
import type { HTMLAttributes } from 'react';
import clsx from 'clsx';
import './Card.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    subtitle?: string;
    footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
    className,
    title,
    subtitle,
    children,
    footer,
    ...props
}) => {
    return (
        <div className={clsx('card', className)} {...props}>
            {(title || subtitle) && (
                <div className="card-header">
                    {title && <h3 className="card-title">{title}</h3>}
                    {subtitle && <p className="card-subtitle">{subtitle}</p>}
                </div>
            )}
            <div className="card-content">{children}</div>
            {footer && <div className="card-footer">{footer}</div>}
        </div>
    );
};
