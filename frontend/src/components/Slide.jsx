import { motion } from 'framer-motion';

const Slide = ({ children, className = "", bgGradient = "" }) => {
    return (
        <section 
            className={`snap-slide relative flex items-center justify-center p-6 overflow-hidden ${className}`}
            style={{
                background: bgGradient || `linear-gradient(to bottom, var(--background), var(--background-secondary))`
            }}
        >
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full" style={{ backgroundColor: 'var(--glow-cyan)' }} />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full" style={{ backgroundColor: 'var(--glow-purple)' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full max-w-4xl relative z-10"
            >
                {children}
            </motion.div>
        </section>
    );
};

export default Slide;
