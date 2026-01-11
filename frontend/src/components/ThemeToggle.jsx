import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="fixed top-6 left-6 z-50 p-3 rounded-full glass border border-white/10 transition-all hover:border-accent-cyan/50"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ duration: 0.3 }}
            >
                {theme === 'dark' ? (
                    <Sun size={20} className="text-accent-cyan" />
                ) : (
                    <Moon size={20} className="text-accent-purple" />
                )}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
