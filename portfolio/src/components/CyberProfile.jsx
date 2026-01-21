import React from 'react';
import { motion } from 'framer-motion';

const CyberProfile = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Outer rotating ring */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-primary/30 border-dashed"
            />

            {/* Inner counter-rotating ring */}
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full border-2 border-primary/20 border-t-transparent border-l-transparent"
            />

            {/* Pulsing core */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-40 h-40 md:w-56 md:h-56 bg-primary/10 rounded-full blur-xl"
            />

            {/* Geometric Hexagon/Shape (CSS simulated) */}
            <div className="relative w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-primary to-purple-600 opacity-20 transform rotate-45" />
            <div className="absolute w-32 h-32 md:w-48 md:h-48 bg-gradient-to-bl from-cyan-400 to-blue-600 opacity-20 transform -rotate-12" />

            {/* Glitchy central element */}
            <motion.div
                animate={{
                    x: [0, -2, 2, -1, 1, 0],
                    y: [0, 1, -1, 2, -2, 0],
                    opacity: [1, 0.8, 1, 0.9, 1]
                }}
                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                className="absolute z-10 text-6xl md:text-8xl font-bold text-primary select-none"
            >
                &lt;/&gt;
            </motion.div>

            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-full"
                    animate={{
                        y: [0, -100, 0],
                        x: [0, (i % 2 === 0 ? 50 : -50), 0],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.5
                    }}
                />
            ))}
        </div>
    );
};

export default CyberProfile;
