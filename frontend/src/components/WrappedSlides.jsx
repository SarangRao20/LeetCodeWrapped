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
                    title: `LeetCode Wrapped 2024 - ${data.user}`,
                    text: `I had a ${data.stats.longest_streak} day streak on LeetCode! Check out my 2024 Wrapped.`,
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
                            className="p-4 rounded-full glass hover:bg-white/10 text-white/60 transition-colors"
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
                            className="p-4 rounded-full bg-accent-cyan text-black hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,247,255,0.4)]"
                        >
                            <ChevronDown size={24} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            <div ref={containerRef} className="snap-container h-full w-full">
                {/* Slide 1: Persona Reveal */}
                <Slide bgGradient="from-[#030303] via-[#050505] to-[#0a0a0a]">
                    <div className="text-center px-4">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", damping: 15, delay: 0.2 }}
                            className="w-20 h-20 md:w-24 md:h-24 bg-accent-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 neon-border-cyan border-2"
                        >
                            <Trophy className="text-accent-cyan" size={32} />
                        </motion.div>
                        <motion.p className="text-white/60 tracking-[0.3em] uppercase text-[10px] md:text-sm mb-4 font-bold">
                            Your 2024 Identity
                        </motion.p>
                        <motion.h2 className="text-5xl md:text-8xl lg:text-9xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-accent-cyan via-white to-accent-purple leading-tight px-2">
                            {data.persona}
                        </motion.h2>
                    </div>
                </Slide>

                {/* Slide 2: Longest Streak */}
                <Slide bgGradient="from-[#0a0a0a] via-[#020202] to-[#080808]">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center w-full px-4">
                        <div className="text-center lg:text-left">
                            <h3 className="text-3xl md:text-5xl font-black mb-4 leading-tight">The Power of<br /><span className="text-accent-cyan">Consistency</span></h3>
                            <p className="text-white/40 text-sm md:text-lg mb-8 uppercase tracking-widest font-bold">Unstoppable Momentum</p>
                            <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                                {data.highlights.map((highlight, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.2 }}
                                        key={i}
                                        className="flex items-center gap-3 text-white/80 glass p-3 rounded-xl border-l-2 border-accent-cyan"
                                    >
                                        <Flame size={18} className="text-accent-cyan shrink-0" />
                                        <span className="text-sm md:text-lg font-medium">{highlight}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <AnimatedCard className="aspect-square flex flex-col items-center justify-center border-t-accent-cyan/30 border-t-4 max-w-sm mx-auto w-full">
                            <span className="text-white/40 text-[10px] md:text-sm uppercase tracking-[0.2em] mb-4">Longest Streak</span>
                            <div className="text-7xl md:text-8xl font-black text-accent-cyan">{data.stats.longest_streak}</div>
                            <span className="text-white/60 text-lg md:text-xl font-medium mt-2">Days</span>
                        </AnimatedCard>
                    </div>
                </Slide>

                {/* Slide 3: Burst Behavior */}
                <Slide bgGradient="from-[#080808] via-[#000000] to-[#0a0a0a]">
                    <div className="w-full px-4">
                        <div className="text-center mb-10 md:mb-16">
                            <h3 className="text-4xl md:text-6xl font-black mb-4"><span className="text-accent-purple">Burst</span> Mode</h3>
                            <p className="text-white/40 text-sm md:text-lg uppercase tracking-widest font-bold italic">Intensity defined your year</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            <AnimatedCard delay={0.1} className="text-center py-6 md:py-8">
                                <Zap className="mx-auto mb-4 text-accent-purple" size={28} />
                                <div className="text-3xl md:text-4xl font-black mb-1">{data.stats.burst_days}</div>
                                <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Burst Days</div>
                            </AnimatedCard>
                            <AnimatedCard delay={0.2} className="text-center py-6 md:py-8 border-t-accent-cyan/20 border-t-2">
                                <Activity className="mx-auto mb-4 text-accent-cyan" size={28} />
                                <div className="text-3xl md:text-4xl font-black mb-1">{data.stats.average_solves_per_day.toFixed(1)}</div>
                                <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Avg Solves / Day</div>
                            </AnimatedCard>
                            <AnimatedCard delay={0.3} className="text-center py-6 md:py-8 border-t-accent-pink/20 border-t-2">
                                <BarChart3 className="mx-auto mb-4 text-accent-pink" size={28} />
                                <div className="text-3xl md:text-4xl font-black mb-1">{data.stats.solve_variance.toFixed(1)}</div>
                                <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Solve Variance</div>
                            </AnimatedCard>
                        </div>
                    </div>
                </Slide>

                {/* Slide 4: Contest Glory (NEW) */}
                <Slide bgGradient="from-[#0a0a0a] via-[#111] to-[#0a0a0a]">
                    <div className="w-full h-full flex flex-col justify-center px-4 max-h-[80vh]">
                        <ContestCard stats={data.stats.contest_stats} />
                    </div>
                </Slide>

                {/* Slide 5: Topic Mastery (NEW - merged with Language DNA) */}
                <Slide bgGradient="from-[#050505] via-[#0a0a0a] to-[#000000]">
                    <div className="w-full h-full flex flex-col justify-center px-4 max-h-[80vh]">
                        <TopicCard topics={data.stats.topic_stats} languages={data.stats.language_stats} />
                    </div>
                </Slide>

                {/* Slide 6: Discipline Analysis */}
                <Slide bgGradient="from-[#0a0a0a] via-[#111] to-[#0a0a0a]">
                    <div className="w-full px-4 text-center">
                        <Target className="mx-auto text-accent-cyan mb-6" size={48} />
                        <h3 className="text-4xl md:text-6xl font-black mb-8 italic">Your Solve <span className="text-accent-cyan">Rhythm</span></h3>
                        <div className="max-w-xl mx-auto glass p-8 rounded-3xl border-t-4 border-accent-cyan">
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-left">
                                    <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Variability</div>
                                    <div className="text-2xl font-bold">{data.stats.solve_variance > 5 ? 'Chaos Solver' : 'Rhythmic Solver'}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Velocity</div>
                                    <div className="text-2xl font-bold">{data.stats.average_solves_per_day > 2 ? 'High' : 'Steady'}</div>
                                </div>
                            </div>
                            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
                                {data.stats.solve_variance > 5
                                    ? "You're unpredictable. When you code, you're a force of nature—dropping solutions in clusters that defy the routine."
                                    : "You are a metronome. Precision and predictability are your weapons. You build progress brick by brick, day by day."}
                            </p>
                        </div>
                    </div>
                </Slide>

                {/* Slide 7: Peak Month (Updated with CalendarCard) */}
                <Slide bgGradient="from-[#0a0a0a] via-[#040404] to-[#030303]">
                    <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center w-full px-4 h-full">
                        <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto">
                            <CalendarCard peakMonth={data.stats.peak_month} />
                        </div>
                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <h4 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Your <span className="text-accent-cyan">Peak Zone</span></h4>
                            <p className="text-white/40 text-lg mb-8 italic font-medium">
                                That month, you were untouchable. The problems didn't stand a chance.
                            </p>
                            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden relative">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ duration: 2, ease: "circOut" }}
                                    className="h-full bg-gradient-to-r from-accent-cyan/40 to-accent-cyan shadow-[0_0_20px_rgba(0,247,255,0.5)]"
                                />
                            </div>
                        </div>
                    </div>
                </Slide>

                {/* Slide 8: Coding Rhythm */}
                <Slide bgGradient="from-[#030303] to-black">
                    <div className="text-center w-full px-4">
                        <h3 className="text-4xl md:text-6xl font-black mb-12 md:mb-16 leading-tight">The <span className="text-accent-pink">Heartbeat</span> of your Code</h3>
                        <div className="flex justify-center items-end gap-10 md:gap-32 h-64 mb-16 px-4">
                            <div className="flex flex-col items-center gap-6 w-full max-w-[100px] md:max-w-[120px]">
                                <div className="text-white/40 text-[10px] md:text-sm font-bold uppercase tracking-widest">Weekday</div>
                                <motion.div
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${(data.stats.weekday_vs_weekend.weekday / (data.stats.weekday_vs_weekend.weekday + data.stats.weekday_vs_weekend.weekend)) * 100}%` }}
                                    transition={{ duration: 1.5, ease: "backOut" }}
                                    className="w-full bg-gradient-to-t from-accent-cyan to-accent-blue rounded-2xl shadow-[0_0_30px_rgba(0,71,255,0.3)] min-h-[40px]"
                                />
                                <div className="text-2xl md:text-3xl font-black">{data.stats.weekday_vs_weekend.weekday}</div>
                            </div>
                            <div className="flex flex-col items-center gap-6 w-full max-w-[100px] md:max-w-[120px]">
                                <div className="text-white/40 text-[10px] md:text-sm font-bold uppercase tracking-widest">Weekend</div>
                                <motion.div
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${(data.stats.weekday_vs_weekend.weekend / (data.stats.weekday_vs_weekend.weekday + data.stats.weekday_vs_weekend.weekend)) * 100}%` }}
                                    transition={{ duration: 1.5, ease: "backOut", delay: 0.2 }}
                                    className="w-full bg-gradient-to-t from-accent-purple to-accent-pink rounded-2xl shadow-[0_0_30px_rgba(255,0,224,0.3)] min-h-[40px]"
                                />
                                <div className="text-2xl md:text-3xl font-black">{data.stats.weekday_vs_weekend.weekend}</div>
                            </div>
                        </div>
                        <p className="text-white/50 text-base md:text-xl font-medium max-w-lg mx-auto italic">
                            {data.stats.weekday_vs_weekend.weekday > data.stats.weekday_vs_weekend.weekend
                                ? "You're a professional. Coding is your mission from 9 to 5."
                                : "You’re a weekend warrior. The peace of Saturday is your fuel."}
                        </p>
                    </div>
                </Slide>

                {/* Slide 9: Summary & Share */}
                <Slide bgGradient="from-black to-[#050505]">
                    <div ref={summaryRef} className="w-full max-w-2xl mx-auto px-4 text-center py-12 rounded-3xl bg-transparent">
                        <Award className="mx-auto text-accent-pink mb-6 animate-glow rounded-full p-2" size={64} />
                        <h2 className="text-4xl md:text-5xl font-black mb-8">What a Year, <span className="text-accent-cyan">{data.user}</span>.</h2>

                        <div className="grid grid-cols-2 gap-4 mb-12">
                            <div className="glass p-4 rounded-2xl border-t-2 border-accent-cyan/30">
                                <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">Total Impact</div>
                                <div className="text-2xl font-black text-accent-cyan">{data.stats.peak_month[1] + 100}+</div>
                            </div>
                            <div className="glass p-4 rounded-2xl border-t-2 border-accent-purple/30">
                                <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">Consistency</div>
                                <div className="text-2xl font-black text-accent-purple">{(data.stats.longest_streak / 365 * 100).toFixed(1)}%</div>
                            </div>
                        </div>

                        <p className="mb-12 text-white/40 text-sm italic">
                            Share your journey to unlock your 2025 badge.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 justify-center mt-[-40px]">
                        <motion.button
                            onClick={handleShare}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center gap-2 bg-white text-black px-10 py-4 rounded-full font-bold tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        >
                            <Share2 size={18} />
                            Share Analysis
                        </motion.button>
                        <motion.button
                            onClick={downloadSummary}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center gap-2 bg-accent-purple text-white px-10 py-4 rounded-full font-bold tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(188,19,254,0.4)]"
                        >
                            <Download size={18} />
                            Save Image
                        </motion.button>
                    </div>

                    <motion.button
                        onClick={() => window.location.reload()}
                        whileHover={{ scale: 1.1 }}
                        className="mt-12 flex items-center justify-center text-white/30 hover:text-white transition-colors"
                    >
                        <RotateCcw size={24} />
                    </motion.button>
                </Slide>
            </div>
        </div>
    );
};

export default WrappedSlides;
