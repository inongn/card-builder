import React, { useRef, useEffect } from 'react';
import 'mdui/components/navigation-drawer.js';
import 'mdui/components/button-icon.js';

export const DebugViewer = ({ data, open, onClose }) => {
    const drawerRef = useRef(null);

    // Sync open state with the web component
    useEffect(() => {
        if (drawerRef.current) {
            drawerRef.current.open = open;
        }
    }, [open]);

    // Handle the 'close' event from the web component (e.g. from backdrop click)
    useEffect(() => {
        const drawer = drawerRef.current;
        if (!drawer) return;

        const handleClose = () => {
            if (onClose) onClose();
        };

        drawer.addEventListener('close', handleClose);
        return () => drawer.removeEventListener('close', handleClose);
    }, [onClose]);

    // Stringify once
    const jsonStr = React.useMemo(() => {
        try {
            return JSON.stringify(data, null, 2);
        } catch (e) {
            return "Error stringifying data: " + e.message;
        }
    }, [data]);

    return (
        <mdui-navigation-drawer
            ref={drawerRef}
            placement="right"
            style={{ width: '500px', maxWidth: '90vw', padding: '1rem', height: '100vh', zIndex: 10000 }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Character Debug Data</h3>
                <mdui-button-icon icon="close" onClick={onClose}></mdui-button-icon>
            </div>
            <div style={{
                height: 'calc(100% - 80px)',
                overflow: 'auto',
                background: 'var(--mdui-color-surface-container-high)',
                padding: '1.5rem',
                fontFamily: 'monospace',
                borderRadius: '12px',
                fontSize: '11px',
                border: '1px solid var(--mdui-color-outline-variant)'
            }}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: 'var(--mdui-color-on-surface-variant)' }}>
                    {jsonStr}
                </pre>
            </div>
        </mdui-navigation-drawer>
    );
};
