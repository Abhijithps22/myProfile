import React from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

const CreativeIntro = ({ onComplete }) => {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            {/* Background Glow */}
            <motion.div
                className="absolute w-96 h-96 bg-primary/20 rounded-full blur-[100px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="relative z-10 flex flex-col items-center">
                {/* Logo Animation */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        duration: 1.5,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                    className="mb-8 relative"
                >
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                    <Code2 className="w-24 h-24 text-primary relative z-10" />
                </motion.div>

                {/* Name Reveal */}
                <div className="overflow-hidden mb-2">
                    <motion.h1
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                        className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400"
                    >
                        Abhijith P S
                    </motion.h1>
                </div>

                {/* Title Reveal */}
                <div className="overflow-hidden">
                    <motion.p
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        className="text-lg md:text-xl text-primary font-medium tracking-wide"
                    >
                        Full Stack Developer
                    </motion.p>
                </div>

                {/* Loading Line */}
                <motion.div
                    className="mt-12 h-1 bg-white/10 rounded-full overflow-hidden w-48"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                        onAnimationComplete={onComplete}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default CreativeIntro;
