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
            <div ref={ref} className="h-full glass p-8 rounded-3xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-50" />

                <Calendar className="text-accent-cyan mb-6" size={48} />

                <div className="text-center mb-8">
                    <h3 className="text-4xl md:text-8xl font-black text-white">{peakMonth[1]}</h3>
                    <p className="text-sm md:text-xl font-bold uppercase tracking-[0.3em] text-accent-cyan mt-2">{peakMonth[0]}</p>
                </div>

                {/* Visual Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 md:gap-2 w-full max-w-[280px] md:max-w-sm opacity-60">
                    {days.map((d, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : {}}
                            transition={{ delay: i * 0.02, type: "spring" }}
                            className={`aspect-square rounded-md ${d.intensity > 0.7 ? 'bg-accent-cyan shadow-[0_0_10px_rgba(0,247,255,0.8)]' :
                                d.intensity > 0.4 ? 'bg-accent-cyan/40' : 'bg-white/5'
                                }`}
                        />
                    ))}
                </div>

                <div className="mt-8 text-xs text-white/30 tracking-widest uppercase">
                    Your golden era
                </div>
            </div>
        </Spotlight>
    );
};

export default CalendarCard;
