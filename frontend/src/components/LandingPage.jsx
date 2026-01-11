import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Terminal, Zap } from 'lucide-react';

const LandingPage = ({ onGenerate }) => {
    const [username, setUsername] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            onGenerate(username);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
            {/* Background Glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 blur-[120px] rounded-full animate-pulse-slow" style={{ backgroundColor: 'var(--glow-cyan)' }} />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 blur-[120px] rounded-full animate-pulse-slow" style={{ backgroundColor: 'var(--glow-purple)' }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center z-10"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6" style={{ borderColor: 'var(--glass-border)' }}>
                    <Terminal size={16} style={{ color: 'var(--accent-cyan)' }} />
                    <span className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--color-text-secondary)' }}>2025 Recap Edition</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
                    <span className="bg-clip-text text-transparent" style={{ 
                        backgroundImage: 'linear-gradient(to bottom, var(--color-text-primary), var(--color-text-secondary))'
                    }}>LEETCODE</span><br />
                    <span className="neon-text-cyan" style={{ color: 'var(--accent-cyan)' }}>WRAPPED</span>
                </h1>

                <p className="text-lg md:text-xl max-w-lg mx-auto mb-12 font-medium" style={{ color: 'var(--color-text-muted)' }}>
                    Discover your coding identity. Relive your most intense solving moments.
                </p>

                <form onSubmit={handleSubmit} className="relative max-w-md mx-auto group">
                    <div className="absolute -inset-0.5 rounded-2xl blur opacity-30 group-focus-within:opacity-100 transition duration-500" 
                        style={{ 
                            background: `linear-gradient(to right, var(--accent-cyan), var(--accent-purple))` 
                        }} 
                    />

                    <div className="relative flex items-center rounded-2xl overflow-hidden glass" style={{ borderColor: 'var(--glass-border)' }}>
                        <Search className="ml-4" size={20} style={{ color: 'var(--color-text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Enter LeetCode Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 p-5 font-medium focus:outline-none"
                            style={{ 
                                color: 'var(--color-text-primary)',
                            }}
                        />
                        <button
                            type="submit"
                            disabled={!username.trim()}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="font-bold px-8 py-5 transition-all disabled:opacity-50"
                            style={{
                                backgroundColor: 'var(--accent-cyan)',
                                color: 'white'
                            }}
                        >
                            <Zap size={20} className={isHovered ? 'animate-bounce' : ''} />
                        </button>
                    </div>
                </form>

                <div className="mt-12 flex gap-8 justify-center" style={{ opacity: 0.4 }}>
                    <div className="text-sm font-bold tracking-widest uppercase italic" style={{ color: 'var(--color-text-primary)' }}>Analyze</div>
                    <div className="text-sm font-bold tracking-widest uppercase italic" style={{ color: 'var(--color-text-primary)' }}>Visualize</div>
                    <div className="text-sm font-bold tracking-widest uppercase italic" style={{ color: 'var(--color-text-primary)' }}>Flex</div>
                </div>
            </motion.div>

            <div className="absolute bottom-8 left-0 w-full flex items-center justify-center z-20">
                <div className="glass px-6 py-3 rounded-full flex items-center gap-6 border" style={{ borderColor: 'var(--glass-border)' }}>
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                        Made with <span className="text-red-500 animate-pulse">❤️</span> by Sarang
                    </span>
                    <div className="w-px h-4" style={{ backgroundColor: 'var(--glass-border)' }}></div>
                    <div className="flex items-center gap-4">
                        <a 
                            href="https://github.com/SarangRao20" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-2 text-sm font-medium transition-all hover:scale-110"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            GitHub
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/sarang-rao-262bbb324/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-2 text-sm font-medium transition-all hover:scale-110"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
