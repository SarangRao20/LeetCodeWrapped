import { motion } from 'framer-motion';

const AnimatedCard = ({ children, className = "", delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.16, 1, 0.3, 1] // Custom easeOutExpo
            }}
            whileHover={{
                scale: 1.02,
                rotateY: 5,
                rotateX: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
            }}
            className={`glass-morphism p-8 rounded-3xl relative overflow-hidden group ${className}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default AnimatedCard;
