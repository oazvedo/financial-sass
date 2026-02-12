import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../Button/Button';
import { Filter } from 'lucide-react';
import { Input } from '../Input/Input';

interface FilterButtonProps {
    categories?: string[];
    onApply?: (filters: { startDate: string; endDate: string; category: string }) => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ categories = [], onApply }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [category, setCategory] = useState('');
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleApply = () => {
        if (onApply) {
            onApply({ startDate, endDate, category });
        }
        setIsOpen(false);
    };

    const handleClear = () => {
        setStartDate('');
        setEndDate('');
        setCategory('');
        if (onApply) {
            onApply({ startDate: '', endDate: '', category: '' });
        }
        setIsOpen(false);
    };

    return (
        <div style={{ position: 'relative' }}>
            <Button
                variant="secondary"
                icon={<Filter size={20} />}
                onClick={() => setIsOpen(!isOpen)}
            >
                Filtrar
            </Button>

            {isOpen && (
                <div
                    ref={popoverRef}
                    style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        marginTop: '0.5rem',
                        backgroundColor: 'var(--color-bg-secondary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-lg)',
                        padding: '1rem',
                        zIndex: 50,
                        width: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}
                >
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Filtros</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <label style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>De</label>
                            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <label style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Até</label>
                            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Categoria</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border)',
                                backgroundColor: 'var(--color-bg-primary)',
                                color: 'var(--color-text-primary)'
                            }}
                        >
                            <option value="">Todas</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <Button variant="ghost" fullWidth onClick={handleClear} style={{ fontSize: '0.875rem' }}>Limpar</Button>
                        <Button fullWidth onClick={handleApply} style={{ fontSize: '0.875rem' }}>Aplicar</Button>
                    </div>
                </div>
            )}
        </div>
    );
};
