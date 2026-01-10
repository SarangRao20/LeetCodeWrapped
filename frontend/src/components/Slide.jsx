import { motion } from 'framer-motion';

const Slide = ({ children, className = "", bgGradient = "from-background to-[#0a0a0a]" }) => {
    return (
        <section className={`snap-slide relative flex items-center justify-center p-6 overflow-hidden bg-gradient-to-b ${bgGradient} ${className}`}>
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-cyan/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-purple/10 blur-[120px] rounded-full" />
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
