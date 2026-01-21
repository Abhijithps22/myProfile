import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimate } from "framer-motion";

const HackerText = ({ text, className, delay = 0 }) => {
    const [displayText, setDisplayText] = useState("");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*";

    useEffect(() => {
        let iterations = 0;
        let interval;

        // Start animation after delay
        const startTimeout = setTimeout(() => {
            interval = setInterval(() => {
                setDisplayText(prev =>
                    text
                        .split("")
                        .map((char, index) => {
                            if (index < iterations) {
                                return text[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("")
                );

                if (iterations >= text.length) {
                    clearInterval(interval);
                }

                iterations += 1 / 3; // Speed of decoding
            }, 30);
        }, delay);

        return () => {
            clearTimeout(startTimeout);
            clearInterval(interval);
        };
    }, [text, delay]);

    return <span className={className}>{displayText}</span>;
};

const ModernIntro = ({ onComplete }) => {
    const [scope, animate] = useAnimate();
    const [count, setCount] = useState(0);
    const canvasRef = useRef(null);

    // Binary Rain Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const binary = "01";
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.ceil(columns)).fill(1);

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#0F0"; // Green text
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = binary.charAt(Math.floor(Math.random() * binary.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Animation Sequence
    useEffect(() => {
        // Counter Animation
        const counter = animate(0, 100, {
            duration: 2.5,
            onUpdate: (latest) => setCount(Math.round(latest)),
            ease: "easeInOut",
        });

        // Sequence
        const sequence = async () => {
            await counter;
            await new Promise((resolve) => setTimeout(resolve, 500));
            onComplete();
        };

        sequence();
    }, [animate, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white overflow-hidden"
            initial={{ y: 0 }}
            exit={{
                y: "-100%",
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
        >
            {/* Binary Rain Background (Low Opacity) */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 opacity-20"
            />

            {/* CRT Overlay Effects */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-green-900/10 mix-blend-overlay z-10" />

            <div className="relative z-20 w-full max-w-md px-6 flex flex-col items-center text-center">
                {/* Name - Masked Reveal with Hacker Effect */}
                <div className="mb-4 mix-blend-difference">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl font-bold tracking-tighter"
                    >
                        <HackerText text="ABHIJITH P S" delay={200} />
                    </motion.div>
                </div>

                {/* Role - Masked Reveal with Hacker Effect */}
                <div className="mb-12 mix-blend-difference">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-400 font-light tracking-wide font-mono"
                    >
                        <HackerText text="FULL STACK DEVELOPER" delay={600} />
                    </motion.div>
                </div>

                {/* Minimal Progress Bar */}
                <div className="w-full h-[1px] bg-gray-800 relative overflow-hidden">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                </div>

                {/* Percentage Counter */}
                <div className="mt-4 flex justify-end w-full">
                    <span className="text-6xl md:text-8xl font-black tracking-tighter opacity-80 mix-blend-difference font-mono">
                        {count}%
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default ModernIntro;
