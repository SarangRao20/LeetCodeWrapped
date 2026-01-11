import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Spotlight from './Spotlight';
import { Calendar } from 'lucide-react';

const CalendarCard = ({ peakMonth }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Generate a mock calendar grid for visual effect
    const days = Array.from({ length: 35 }, (_, i) => ({
        day: i + 1,
        intensity: Math.random() // Simulation of contribution
    }));

    return (
        <Spotlight className="h-full">
            <div ref={ref} className="h-full glass p-8 rounded-3xl border flex flex-col items-center justify-center relative overflow-hidden" style={{ borderColor: 'var(--glass-border)' }}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent opacity-50" style={{ backgroundColor: 'var(--accent-cyan)' }} />

                <Calendar className="mb-6" size={48} style={{ color: 'var(--accent-cyan)' }} />

                <div className="text-center mb-8">
                    <h3 className="text-4xl md:text-8xl font-black" style={{ color: 'var(--color-text-primary)' }}>{peakMonth[1]}</h3>
                    <p className="text-sm md:text-xl font-bold uppercase tracking-[0.3em] mt-2" style={{ color: 'var(--accent-cyan)' }}>{peakMonth[0]}</p>
                </div>

                {/* Visual Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 md:gap-2 w-full max-w-[280px] md:max-w-sm opacity-60">
                    {days.map((d, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : {}}
                            transition={{ delay: i * 0.02, type: "spring" }}
                            style={{
                                backgroundColor: d.intensity > 0.7 ? 'var(--accent-cyan)' : 
                                    d.intensity > 0.4 ? 'var(--accent-cyan)' : 'var(--glass-bg)',
                                opacity: d.intensity > 0.7 ? 1 : d.intensity > 0.4 ? 0.4 : 0.2,
                                boxShadow: d.intensity > 0.7 ? '0 0 10px var(--glow-cyan)' : 'none'
                            }}
                            className="aspect-square rounded-md"
                        />
                    ))}
                </div>

                <div className="mt-8 text-xs tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>
                    Your golden era
                </div>
            </div>
        </Spotlight>
    );
};

export default CalendarCard;
