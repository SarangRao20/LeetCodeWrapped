import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Spotlight from './Spotlight';
import { Trophy, TrendingUp, Globe } from 'lucide-react';

const ContestCard = ({ stats }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    if (!stats || stats.attendedContestsCount === 0) {
        return (
            <Spotlight className="h-full">
                <div ref={ref} className="h-full glass p-8 rounded-3xl border relative overflow-hidden flex flex-col items-center justify-center text-center" style={{ borderColor: 'var(--glass-border)' }}>
                    <Trophy className="mb-6" size={80} style={{ color: 'var(--color-text-muted)' }} />
                    <h3 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Future Champion</h3>
                    <p className="max-w-sm text-sm md:text-base" style={{ color: 'var(--color-text-secondary)' }}>
                        The arena awaits. Join a contest in 2025 to earn your rank and prove your mettle.
                    </p>
                    <div className="mt-8 px-6 py-2 rounded-full border text-sm uppercase tracking-widest" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', color: 'var(--color-text-muted)' }}>
                        Unranked
                    </div>
                </div>
            </Spotlight>
        );
    }

    return (
        <Spotlight className="h-full">
            <div ref={ref} className="h-full glass p-8 rounded-3xl border relative overflow-hidden group" style={{ borderColor: 'var(--glass-border)' }}>
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity" style={{ color: 'var(--color-text-muted)' }}>
                    <Trophy size={120} />
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-yellow-500/20 rounded-lg">
                                <Trophy className="text-yellow-500" size={24} />
                            </div>
                            <h3 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Contest Glory</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--glass-bg)' }}>
                                <div className="text-xs uppercase font-bold tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>Rating</div>
                                <div className="text-3xl font-black text-yellow-400">
                                    {Math.round(stats.rating)}
                                </div>
                            </div>
                            <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--glass-bg)' }}>
                                <div className="text-xs uppercase font-bold tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>Rank</div>
                                <div className="text-xl font-bold flex items-center gap-1" style={{ color: 'var(--color-text-primary)' }}>
                                    <Globe size={14} style={{ color: 'var(--color-text-muted)' }} />
                                    {stats.globalRanking.toLocaleString()}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span style={{ color: 'var(--color-text-secondary)' }}>Top Percentage</span>
                                <span className="font-bold" style={{ color: 'var(--accent-cyan)' }}>{stats.topPercentage}%</span>
                            </div>
                            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--glass-border)' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: `${100 - stats.topPercentage}%` } : {}}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                    className="h-full bg-gradient-to-r from-yellow-500 to-amber-300"
                                />
                            </div>
                        </div>
                    </div>

                    {stats.badge && (
                        <div className="mt-6 pt-6 border-t flex items-center gap-3" style={{ borderTopColor: 'var(--glass-border)' }}>
                            <img src="/placeholder-badge.png" className="w-10 h-10 rounded-full bg-white/10" alt="Badge" />
                            {/* Fallback if no image source provided */}
                            <div>
                                <div className="text-xs uppercase font-bold" style={{ color: 'var(--color-text-muted)' }}>Latest Badge</div>
                                <div className="font-bold" style={{ color: 'var(--color-text-primary)' }}>{stats.badge.name}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Spotlight>
    );
};

export default ContestCard;
