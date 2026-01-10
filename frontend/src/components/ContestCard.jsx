import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Spotlight from './Spotlight';
import { Trophy, TrendingUp, Globe } from 'lucide-react';

const ContestCard = ({ stats }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    if (!stats || stats.attendedContestsCount === 0) return null;

    return (
        <Spotlight className="h-full">
            <div ref={ref} className="h-full glass p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Trophy size={120} />
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-yellow-500/20 rounded-lg">
                                <Trophy className="text-yellow-500" size={24} />
                            </div>
                            <h3 className="text-2xl font-bold">Contest Glory</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-white/5 rounded-xl p-4">
                                <div className="text-xs text-white/40 uppercase font-bold tracking-widest mb-1">Rating</div>
                                <div className="text-3xl font-black text-yellow-400">
                                    {Math.round(stats.rating)}
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4">
                                <div className="text-xs text-white/40 uppercase font-bold tracking-widest mb-1">Rank</div>
                                <div className="text-xl font-bold flex items-center gap-1">
                                    <Globe size={14} className="text-white/40" />
                                    {stats.globalRanking.toLocaleString()}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-white/60">Top Percentage</span>
                                <span className="font-bold text-accent-cyan">{stats.topPercentage}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
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
                        <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                            <img src="/placeholder-badge.png" className="w-10 h-10 rounded-full bg-white/10" alt="Badge" />
                            {/* Fallback if no image source provided */}
                            <div>
                                <div className="text-xs text-white/40 uppercase font-bold">Latest Badge</div>
                                <div className="font-bold">{stats.badge.name}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Spotlight>
    );
};

export default ContestCard;
