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
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-[#030303]">
            {/* Background Glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-cyan/20 blur-[120px] rounded-full animate-pulse-slow" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-purple/20 blur-[120px] rounded-full animate-pulse-slow" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center z-10"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 glass mb-6">
                    <Terminal size={16} className="text-accent-cyan" />
                    <span className="text-xs font-medium tracking-widest uppercase text-white/60">2024 Recap Edition</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 leading-none">
                    LEETCODE<br /><span className="neon-text-cyan">WRAPPED</span>
                </h1>

                <p className="text-white/40 text-lg md:text-xl max-w-lg mx-auto mb-12 font-medium">
                    Discover your coding identity. Relive your most intense solving moments.
                </p>

                <form onSubmit={handleSubmit} className="relative max-w-md mx-auto group">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-2xl blur opacity-30 group-focus-within:opacity-100 transition duration-500`} />

                    <div className="relative flex items-center bg-black/50 border border-white/10 rounded-2xl overflow-hidden glass">
                        <Search className="ml-4 text-white/30" size={20} />
                        <input
                            type="text"
                            placeholder="Enter LeetCode Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 text-white p-5 placeholder:text-white/20 font-medium"
                        />
                        <button
                            type="submit"
                            disabled={!username.trim()}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="bg-white text-black font-bold px-8 py-5 hover:bg-accent-cyan transition-colors disabled:opacity-50 disabled:hover:bg-white"
                        >
                            <Zap size={20} className={isHovered ? 'animate-bounce' : ''} />
                        </button>
                    </div>
                </form>

                <div className="mt-12 flex gap-8 justify-center opacity-40">
                    <div className="text-sm font-bold tracking-widest uppercase italic">Analyze</div>
                    <div className="text-sm font-bold tracking-widest uppercase italic">Visualize</div>
                    <div className="text-sm font-bold tracking-widest uppercase italic">Flex</div>
                </div>
            </motion.div>
        </div>
    );
};

export default LandingPage;
