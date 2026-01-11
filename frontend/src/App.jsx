import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle, Terminal } from 'lucide-react';
import LandingPage from './components/LandingPage';
import WrappedSlides from './components/WrappedSlides';
import ParticleBackground from './components/ParticleBackground';
import ThemeToggle from './components/ThemeToggle';
import MusicPlayer from './components/MusicPlayer';

function App() {
    const [view, setView] = useState('landing'); // 'landing', 'loading', 'wrapped', 'error'
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchWrapped = async (username) => {
        setView('loading');
        setError(null);
        try {
            // Simulate network delay for effect
            await new Promise(resolve => setTimeout(resolve, 2000));

            const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
            const response = await axios.get(`${API_URL}/leetcode/wrapped/${username}`);
            setData(response.data);
            setView('wrapped');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.detail || "Could not retrieve your wrapped data. Make sure the username is correct and the server is running.");
            setView('error');
        }
    };

    return (
        <main className="min-h-screen relative transition-colors duration-400" style={{ backgroundColor: 'var(--background)', color: 'var(--color-text-primary)' }}>
            <ThemeToggle />
            <MusicPlayer />
            <ParticleBackground />
            <AnimatePresence mode="wait">
                {view === 'landing' && (
                    <motion.div
                        key="landing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <LandingPage onGenerate={fetchWrapped} />
                    </motion.div>
                )}

                {view === 'loading' && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-screen flex flex-col items-center justify-center"
                        style={{ backgroundColor: 'var(--background)' }}
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-24 h-24 rounded-full border-t-2 border-r-2 border-accent-cyan shadow-[0_0_20px_rgba(0,247,255,0.3)]"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Terminal className="text-accent-cyan animate-pulse" size={32} />
                            </div>
                        </div>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 font-bold tracking-[0.3em] uppercase text-xs"
                            style={{ color: 'var(--color-text-muted)' }}
                        >
                            Compiling your year...
                        </motion.p>
                    </motion.div>
                )}

                {view === 'error' && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="h-screen flex flex-col items-center justify-center p-6 text-center"
                    >
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-8 border border-red-500/20">
                            <AlertCircle className="text-red-500" size={40} />
                        </div>
                        <h2 className="text-3xl font-black mb-4" style={{ color: 'var(--color-text-primary)' }}>Something went wrong</h2>
                        <p className="max-w-md mx-auto mb-12" style={{ color: 'var(--color-text-muted)' }}>
                            {error}
                        </p>
                        <button
                            onClick={() => setView('landing')}
                            className="px-8 py-3 rounded-full font-bold transition-all hover:scale-105"
                            style={{ 
                                backgroundColor: 'var(--accent-cyan)',
                                color: 'white'
                            }}
                        >
                            Try Again
                        </button>
                    </motion.div>
                )}

                {view === 'wrapped' && data && (
                    <motion.div
                        key="wrapped"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <WrappedSlides data={data} />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}

export default App;
