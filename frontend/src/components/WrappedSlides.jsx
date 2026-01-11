import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';

import Slide from './Slide';
import AnimatedCard from './AnimatedCard';
import CalendarCard from './CalendarCard';
import ContestCard from './ContestCard';
import TopicCard from './TopicCard';
import Spotlight from './Spotlight';

import {
    Trophy, Zap, Activity,
    BarChart3, ChevronDown, ChevronUp,
    Share2, RotateCcw, Flame, Target,
    Award, Download
} from 'lucide-react';

const WrappedSlides = ({ data }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const containerRef = useRef(null);
    const summaryRef = useRef(null);
    const totalSlides = 10; // Updated total slides count

    const scrollToSlide = (index) => {
        if (containerRef.current) {
            const slideHeight = window.innerHeight;
            containerRef.current.scrollTo({
                top: index * slideHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const index = Math.round(containerRef.current.scrollTop / window.innerHeight);
                setCurrentSlide(index);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => container?.removeEventListener('scroll', handleScroll);
    }, []);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `LeetCode Wrapped 2025 - ${data.user}`,
                    text: `I had a ${data.stats.longest_streak} day streak on LeetCode! Check out my 2025 Wrapped.`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            alert("Sharing is not supported on this browser.");
        }
    };

    const downloadSummary = async () => {
        if (summaryRef.current) {
            const canvas = await html2canvas(summaryRef.current, {
                backgroundColor: '#000000',
                scale: 2,
                useCORS: true
            });
            const link = document.createElement('a');
            link.download = `leetcode-wrapped-${data.user}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };

    return (
        <div className="relative h-screen w-full overflow-hidden bg-transparent">
            {/* Navigation Controls */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
                {Array.from({ length: totalSlides }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => scrollToSlide(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-accent-cyan h-8' : 'bg-white/20'
                            }`}
                    />
                ))}
            </div>

            <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 md:flex-row">
                <AnimatePresence>
                    {currentSlide > 0 && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => scrollToSlide(currentSlide - 1)}
                            className="p-4 rounded-full glass transition-colors"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            <ChevronUp size={24} />
                        </motion.button>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {currentSlide < totalSlides - 1 && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => scrollToSlide(currentSlide + 1)}
                            className="p-4 rounded-full transition-transform"
                            style={{
                                backgroundColor: 'var(--accent-cyan)',
                                color: '#ffffff',
                                boxShadow: '0 0 20px var(--glow-cyan)'
                            }}
                        >
                            <ChevronDown size={24} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            <div ref={containerRef} className="snap-container h-full w-full">
                {/* Slide 1: Persona Reveal */}
                <Slide>
                    <div className="text-center px-4">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", damping: 15, delay: 0.2 }}
                            className="w-20 h-20 md:w-24 md:h-24 bg-accent-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 neon-border-cyan border-2"
                        >
                            <Trophy className="text-accent-cyan" size={32} />
                        </motion.div>
                        <motion.p className="tracking-[0.3em] uppercase text-[10px] md:text-sm mb-4 font-bold" style={{ color: 'var(--color-text-secondary)' }}>
                            Your 2025 Identity
                        </motion.p>
                        <motion.h2 className="text-5xl md:text-8xl lg:text-9xl font-black italic tracking-tighter leading-tight px-2" style={{ color: 'var(--color-text-primary)' }}>
                            {data.persona}
                        </motion.h2>
                    </div>
                </Slide>

                {/* Slide 2: Longest Streak */}
                <Slide>
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center w-full px-4">
                        <div className="text-center lg:text-left">
                            <h3 className="text-3xl md:text-5xl font-black mb-4 leading-tight" style={{ color: 'var(--color-text-primary)' }}>
                                The Power of<br /><span style={{ color: 'var(--accent-cyan)' }}>Consistency</span>
                            </h3>
                            <p className="text-sm md:text-lg mb-8 uppercase tracking-widest font-bold" style={{ color: 'var(--color-text-muted)' }}>Unstoppable Momentum</p>
                            <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                                {data.highlights.map((highlight, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.2 }}
                                        key={i}
                                        className="flex items-center gap-3 glass p-3 rounded-xl border-l-2"
                                        style={{ color: 'var(--color-text-primary)', borderColor: 'var(--accent-cyan)' }}
                                    >
                                        <Flame size={18} className="shrink-0" style={{ color: 'var(--accent-cyan)' }} />
                                        <span className="text-sm md:text-lg font-medium">{highlight}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <AnimatedCard className="aspect-square flex flex-col items-center justify-center border-t-4 max-w-sm mx-auto w-full" style={{ borderTopColor: 'var(--accent-cyan)' }}>
                            <span className="text-[10px] md:text-sm uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--color-text-muted)' }}>Longest Streak</span>
                            <div className="text-7xl md:text-8xl font-black" style={{ color: 'var(--accent-cyan)' }}>{data.stats.longest_streak}</div>
                            <span className="text-lg md:text-xl font-medium mt-2" style={{ color: 'var(--color-text-secondary)' }}>Days</span>
                        </AnimatedCard>
                    </div>
                </Slide>

                {/* Slide 3: Burst Behavior */}
                <Slide>
                    <div className="w-full px-4">
                        <div className="text-center mb-10 md:mb-16">
                            <h3 className="text-4xl md:text-6xl font-black mb-4" style={{ color: 'var(--color-text-primary)' }}>
                                <span style={{ color: 'var(--accent-purple)' }}>Burst</span> Mode
                            </h3>
                            <p className="text-sm md:text-lg uppercase tracking-widest font-bold italic" style={{ color: 'var(--color-text-muted)' }}>Intensity defined your year</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            <AnimatedCard delay={0.1} className="text-center py-6 md:py-8">
                                <Zap className="mx-auto mb-4" size={28} style={{ color: 'var(--accent-purple)' }} />
                                <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: 'var(--color-text-primary)' }}>{data.stats.burst_days}</div>
                                <div className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Burst Days</div>
                            </AnimatedCard>
                            <AnimatedCard delay={0.2} className="text-center py-6 md:py-8 border-t-2" style={{ borderTopColor: 'var(--accent-cyan)' }}>
                                <Activity className="mx-auto mb-4" size={28} style={{ color: 'var(--accent-cyan)' }} />
                                <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: 'var(--color-text-primary)' }}>{data.stats.average_solves_per_day.toFixed(1)}</div>
                                <div className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Avg Solves / Day</div>
                            </AnimatedCard>
                            <AnimatedCard delay={0.3} className="text-center py-6 md:py-8 border-t-2" style={{ borderTopColor: 'var(--accent-pink)' }}>
                                <BarChart3 className="mx-auto mb-4" size={28} style={{ color: 'var(--accent-pink)' }} />
                                <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: 'var(--color-text-primary)' }}>{data.stats.solve_variance.toFixed(1)}</div>
                                <div className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Solve Variance</div>
                            </AnimatedCard>
                        </div>
                    </div>
                </Slide>

                {/* Slide 4: Contest Glory (NEW) */}
                <Slide>
                    <div className="w-full h-full flex flex-col justify-center px-4 max-h-[80vh]">
                        <ContestCard stats={data.stats.contest_stats} />
                    </div>
                </Slide>

                {/* Slide 5: Topic Mastery (NEW - merged with Language DNA) */}
                <Slide>
                    <div className="w-full h-full flex flex-col justify-center px-4 max-h-[80vh]">
                        <TopicCard topics={data.stats.topic_stats} languages={data.stats.language_stats} />
                    </div>
                </Slide>

                {/* Slide 6: Discipline Analysis */}
                <Slide>
                    <div className="w-full px-4 text-center">
                        <Target className="mx-auto mb-6" size={48} style={{ color: 'var(--accent-cyan)' }} />
                        <h3 className="text-4xl md:text-6xl font-black mb-8 italic" style={{ color: 'var(--color-text-primary)' }}>
                            Your Solve <span style={{ color: 'var(--accent-cyan)' }}>Rhythm</span>
                        </h3>
                        <div className="max-w-xl mx-auto glass p-8 rounded-3xl border-t-4" style={{ borderTopColor: 'var(--accent-cyan)' }}>
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-left">
                                    <div className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'var(--color-text-muted)' }}>Variability</div>
                                    <div className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{data.stats.solve_variance > 5 ? 'Chaos Solver' : 'Rhythmic Solver'}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'var(--color-text-muted)' }}>Velocity</div>
                                    <div className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{data.stats.average_solves_per_day > 2 ? 'High' : 'Steady'}</div>
                                </div>
                            </div>
                            <p className="text-lg md:text-xl font-light leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                {data.stats.solve_variance > 5
                                    ? "You're unpredictable. When you code, you're a force of nature—dropping solutions in clusters that defy the routine."
                                    : "You are a metronome. Precision and predictability are your weapons. You build progress brick by brick, day by day."}
                            </p>
                        </div>
                    </div>
                </Slide>

                {/* Slide 7: Peak Month (Updated with CalendarCard) */}
                <Slide>
                    <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center w-full px-4 h-full">
                        <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto">
                            <CalendarCard peakMonth={data.stats.peak_month} />
                        </div>
                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <h4 className="text-3xl md:text-5xl font-black mb-6 leading-tight" style={{ color: 'var(--color-text-primary)' }}>
                                Your <span style={{ color: 'var(--accent-cyan)' }}>Peak Zone</span>
                            </h4>
                            <p className="text-lg mb-8 italic font-medium" style={{ color: 'var(--color-text-muted)' }}>
                                That month, you were untouchable. The problems didn't stand a chance.
                            </p>
                            <div className="h-3 w-full rounded-full overflow-hidden relative" style={{ backgroundColor: 'var(--glass-border)' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ duration: 2, ease: "circOut" }}
                                    className="h-full shadow-[0_0_20px_rgba(0,247,255,0.5)]"
                                    style={{ background: 'linear-gradient(to right, var(--accent-cyan), var(--accent-cyan))' }}
                                />
                            </div>
                        </div>
                    </div>
                </Slide>

                {/* Slide 8: Coding Rhythm */}
                <Slide>
                    <div className="text-center w-full px-4">
                        <h3 className="text-4xl md:text-6xl font-black mb-12 md:mb-16 leading-tight" style={{ color: 'var(--color-text-primary)' }}>The <span style={{ color: 'var(--accent-pink)' }}>Heartbeat</span> of your Code</h3>
                        <div className="flex justify-center items-end gap-10 md:gap-32 h-64 mb-16 px-4">
                            <div className="flex flex-col items-center gap-6 w-full max-w-[100px] md:max-w-[120px]">
                                <div className="text-[10px] md:text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Weekday</div>
                                <motion.div
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${(data.stats.weekday_vs_weekend.weekday / (data.stats.weekday_vs_weekend.weekday + data.stats.weekday_vs_weekend.weekend)) * 100}%` }}
                                    transition={{ duration: 1.5, ease: "backOut" }}
                                    className="w-full rounded-2xl min-h-[40px]"
                                    style={{ 
                                        background: 'linear-gradient(to top, var(--accent-cyan), var(--accent-blue))',
                                        boxShadow: '0 0 30px var(--glow-cyan)'
                                    }}
                                />
                                <div className="text-2xl md:text-3xl font-black" style={{ color: 'var(--color-text-primary)' }}>{data.stats.weekday_vs_weekend.weekday}</div>
                            </div>
                            <div className="flex flex-col items-center gap-6 w-full max-w-[100px] md:max-w-[120px]">
                                <div className="text-[10px] md:text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Weekend</div>
                                <motion.div
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${(data.stats.weekday_vs_weekend.weekend / (data.stats.weekday_vs_weekend.weekday + data.stats.weekday_vs_weekend.weekend)) * 100}%` }}
                                    transition={{ duration: 1.5, ease: "backOut", delay: 0.2 }}
                                    className="w-full rounded-2xl min-h-[40px]"
                                    style={{ 
                                        background: 'linear-gradient(to top, var(--accent-purple), var(--accent-pink))',
                                        boxShadow: '0 0 30px var(--glow-purple)'
                                    }}
                                />
                                <div className="text-2xl md:text-3xl font-black" style={{ color: 'var(--color-text-primary)' }}>{data.stats.weekday_vs_weekend.weekend}</div>
                            </div>
                        </div>
                        <p className="text-base md:text-xl font-medium max-w-lg mx-auto italic" style={{ color: 'var(--color-text-secondary)' }}>
                            {data.stats.weekday_vs_weekend.weekday > data.stats.weekday_vs_weekend.weekend
                                ? "You're a professional. Coding is your mission from 9 to 5."
                                : "You’re a weekend warrior. The peace of Saturday is your fuel."}
                        </p>
                    </div>
                </Slide>

                {/* Slide 9: Summary & Share */}
                <Slide>
                    <div ref={summaryRef} className="w-full max-w-2xl mx-auto px-4 text-center py-12 rounded-3xl bg-transparent">
                        <Award className="mx-auto animate-glow rounded-full p-2" size={64} style={{ color: 'var(--accent-pink)' }} />
                        <h2 className="text-4xl md:text-5xl font-black mb-8" style={{ color: 'var(--color-text-primary)' }}>
                            What a Year, <span style={{ color: 'var(--accent-cyan)' }}>{data.user}</span>.
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            <div className="glass p-4 rounded-2xl border-t-2" style={{ borderTopColor: 'var(--accent-cyan)' }}>
                                <div className="text-[10px] uppercase font-bold tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>Total Solves</div>
                                <div className="text-2xl font-black" style={{ color: 'var(--accent-cyan)' }}>{data.stats.total_solves}</div>
                            </div>
                            <div className="glass p-4 rounded-2xl border-t-2" style={{ borderTopColor: 'var(--accent-purple)' }}>
                                <div className="text-[10px] uppercase font-bold tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>Pass Rate</div>
                                <div className="text-2xl font-black" style={{ color: 'var(--accent-purple)' }}>{data.stats.accuracy}%</div>
                            </div>
                            <div className="glass p-4 rounded-2xl border-t-2" style={{ borderTopColor: 'var(--accent-pink)' }}>
                                <div className="text-[10px] uppercase font-bold tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>Attempts</div>
                                <div className="text-2xl font-black" style={{ color: 'var(--accent-pink)' }}>{data.stats.total_attempts}</div>
                            </div>
                            <div className="glass p-4 rounded-2xl border-t-2 border-yellow-500">
                                <div className="text-[10px] uppercase font-bold tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>Active Days</div>
                                <div className="text-2xl font-black text-yellow-500">{data.stats.active_days}</div>
                            </div>
                        </div>

                        <p className="mb-8 text-sm italic" style={{ color: 'var(--color-text-muted)' }}>
                            Share your journey to unlock your <span className="font-bold" style={{ color: 'var(--color-text-primary)' }}>2025</span> badge.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">
                        <motion.button
                            onClick={handleShare}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold tracking-widest uppercase text-sm"
                            style={{
                                backgroundColor: 'var(--color-text-primary)',
                                color: 'var(--background)'
                            }}
                        >
                            <Share2 size={18} />
                            Share Analysis
                        </motion.button>
                        <motion.button
                            onClick={downloadSummary}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(188,19,254,0.4)]"
                            style={{
                                backgroundColor: 'var(--accent-purple)',
                                color: 'white'
                            }}
                        >
                            <Download size={18} />
                            Save Image
                        </motion.button>
                    </div>

                    <motion.button
                        onClick={() => window.location.reload()}
                        whileHover={{ scale: 1.1 }}
                        className="mt-8 flex items-center justify-center transition-colors"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        <RotateCcw size={24} />
                    </motion.button>

                    {/* Footer with GitHub and LinkedIn */}
                    <div className="mt-12 flex items-center justify-center">
                        <div className="glass px-6 py-3 rounded-full flex items-center gap-6 border" style={{ borderColor: 'var(--glass-border)' }}>
                            <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                                Made with <span className="text-red-500 animate-pulse">❤️</span> by Sarang
                            </span>
                            <div className="w-px h-4" style={{ backgroundColor: 'var(--glass-border)' }}></div>
                            <div className="flex items-center gap-4">
                                <a 
                                    href="https://github.com/SarangRao" 
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
                </Slide>
            </div>
        </div >
    );
};

export default WrappedSlides;
