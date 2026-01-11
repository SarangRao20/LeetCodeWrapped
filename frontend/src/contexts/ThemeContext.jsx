import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('leetcode-wrapped-theme');
        return saved || 'dark';
    });

    useEffect(() => {
        localStorage.setItem('leetcode-wrapped-theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        // Force body background update
        document.body.style.backgroundColor = theme === 'dark' ? '#030303' : '#ffffff';
        document.body.style.color = theme === 'dark' ? '#ffffff' : '#0f172a';
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
