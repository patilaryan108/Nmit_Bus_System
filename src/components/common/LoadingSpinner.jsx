import React from 'react';
import '../../styles/index.css';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
    const sizeClasses = {
        sm: { width: '24px', height: '24px', borderWidth: '2px' },
        md: { width: '40px', height: '40px', borderWidth: '3px' },
        lg: { width: '56px', height: '56px', borderWidth: '4px' }
    };

    const spinnerStyle = {
        ...sizeClasses[size],
        border: `${sizeClasses[size].borderWidth} solid var(--color-bg-tertiary)`,
        borderTopColor: 'var(--color-primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
    };

    return (
        <div className="flex flex-col items-center justify-center gap-md" style={{ padding: 'var(--spacing-xl)' }}>
            <div style={spinnerStyle}></div>
            {text && <p className="text-muted text-sm">{text}</p>}
        </div>
    );
};

export default LoadingSpinner;
