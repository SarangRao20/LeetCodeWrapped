import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, Pause } from 'lucide-react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        // Create audio element
        const audio = new Audio();

        audio.src = '/background-music.mp3';
        audio.loop = true;
        audio.volume = volume;
        audio.autoplay = true;
        audioRef.current = audio;

        // Aggressive autoplay attempts
        const playAudio = () => {
            audio.play()
                .then(() => {
                    setIsPlaying(true);
                    console.log('Music started');
                })
                .catch(() => {
                    // Auto-play on any user click
                    const playOnClick = () => {
                        audio.play().then(() => setIsPlaying(true));
                        document.removeEventListener('click', playOnClick);
                    };
                    document.addEventListener('click', playOnClick);
                });
        };

        // Immediate attempt
        playAudio();
        const timer = setTimeout(playAudio, 100);

        return () => {
            clearTimeout(timer);
            audio.pause();
            audio.src = '';
        };
    }, [volume]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(e => console.log('Audio play failed:', e));
            }
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-3 glass px-4 py-2 rounded-full"
                        style={{ borderColor: 'var(--glass-border)' }}
                    >
                        {/* Volume Slider */}
                        <button
                            onClick={toggleMute}
                            className="transition-colors"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => {
                                setVolume(parseFloat(e.target.value));
                                setIsMuted(false);
                            }}
                            className="w-20 h-1 rounded-full appearance-none cursor-pointer
                                [&::-webkit-slider-thumb]:appearance-none
                                [&::-webkit-slider-thumb]:w-3
                                [&::-webkit-slider-thumb]:h-3
                                [&::-webkit-slider-thumb]:rounded-full
                                [&::-webkit-slider-thumb]:cursor-pointer"
                            style={{
                                backgroundColor: 'var(--glass-border)',
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
                className="p-3 rounded-full glass transition-all"
                style={{
                    borderColor: isPlaying ? 'var(--accent-cyan)' : 'var(--glass-border)',
                    backgroundColor: isPlaying ? 'var(--glow-cyan)' : 'transparent',
                    boxShadow: isPlaying ? '0 0 20px var(--glow-cyan)' : 'none'
                }}
            >
                {isPlaying ? (
                    <Pause size={20} style={{ color: 'var(--accent-cyan)' }} />
                ) : (
                    <Music size={20} style={{ color: 'var(--color-text-secondary)' }} />
                )}
            </motion.button>
        </div>
    );
};

export default MusicPlayer;
