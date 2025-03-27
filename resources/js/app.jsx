import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { useState, useEffect } from 'react';

const AppWrapper = ({ App, props }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const toggleTheme = () => {
        setTheme((prev) => {
            const newTheme = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    useEffect(() => {
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    }, []);

    return (
        <MantineProvider theme={{ colorScheme: theme }} forceColorScheme={theme}>
            <div className="theme-transition">
                <App {...props} />
            </div>
        </MantineProvider>
    );
};

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<AppWrapper App={App} props={props} />);
    },
});
