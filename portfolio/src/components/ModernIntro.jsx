import React, { useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion";

const ModernIntro = ({ onComplete }) => {
    const [scope, animate] = useAnimate();
    const [progress, setProgress] = useState(0);
    const [commandTyped, setCommandTyped] = useState(false);
    const [showProgress, setShowProgress] = useState(false);

    // Animation Sequence
    useEffect(() => {
        const sequence = async () => {
            // 1. Type Command
            await animate("#command-text", { opacity: 1 }, { duration: 0 }); // Ensure visible
            await typeText("npm install portfolio-latest");
            setCommandTyped(true);

            // 2. Wait slightly
            await new Promise(r => setTimeout(r, 400));
            setShowProgress(true);

            // 3. Progress Animation
            await animate(0, 100, {
                duration: 1.5,
                onUpdate: (latest) => setProgress(Math.round(latest)),
                ease: "linear",
            });

            // 4. Success & Exit
            await new Promise(r => setTimeout(r, 400));
            onComplete();
        };

        sequence();
    }, [animate, onComplete]);

    const typeText = async (text) => {
        // Simple manual implementation of typing effect via Framer Motion isn't direct for text content,
        // so we can use a helper or just animate a clip-path. 
        // For accurate character typing, we'll use a standard discrete animation loop here 
        // effectively handled by the `Typewriter` component logic below or simple CSS steps.
        // But since we want to control it in the sequence, let's just cheat nicely with a CSS animation
        // or a simple specific component.
        // Actually, let's keep it simple: The text renders fully but masked, then revealed steps?
        // No, let's just wait. The visual component handles the typing logic.
        // We'll trust the Typewriter component below to handle 'npm install...' 
        // We just emulate the delay here for the sequence controller.
        await new Promise(r => setTimeout(r, 1500)); // Approx typing time
    };


    return (
        <motion.div
            ref={scope}
            className="fixed inset-0 z-50 p-6 flex flex-col items-center justify-center bg-[#0a0a0a] text-green-500 font-mono text-sm md:text-lg overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{
                y: "-100%",
                transition: { duration: 0.5, ease: "easeInOut" }
            }}
        >
            {/* Mac Terminal Window */}
            <div className="w-full max-w-3xl bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden border border-gray-800">
                {/* Window Header */}
                <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-gray-700">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" /> {/* Red */}
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" /> {/* Yellow */}
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" /> {/* Green */}
                    <div className="flex-1 text-center text-xs text-gray-400 font-sans">abhijith — -zsh — 80x24</div>
                </div>

                {/* Terminal Content */}
                <div className="p-6 text-green-500 text-sm md:text-base min-h-[300px] flex flex-col font-mono">
                    {/* Command Line */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-blue-400">➜</span>
                        <span className="text-cyan-400">~</span>
                        <div className="flex relative">
                            <span className="mr-2">&nbsp;</span>
                            <Typewriter text="nppm install abhijith-portfolio" delay={0} />
                        </div>
                    </div>

                    {/* Installation Output */}
                    {commandTyped && (
                        <div className="flex flex-col gap-1 text-gray-300">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <span><span className="text-green-500">✔</span> Package found: abhijith-portfolio@latest</span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <span><span className="text-blue-400">ℹ</span> Resolving dependencies...</span>
                            </motion.div>
                        </div>
                    )}

                    {/* Progress Bar */}
                    {showProgress && (
                        <div className="mt-6 w-full max-w-lg">
                            <div className="flex justify-between text-xs mb-1 text-gray-500">
                                <span>INSTALLING</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-green-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <div className="mt-2 text-xs text-gray-500 font-mono">
                                {progress < 100 ?
                                    `> Extracting module: core-ui-v${Math.floor(progress / 10)}.${progress % 10}...` :
                                    <div className="flex flex-col">
                                        <span>&gt; Installation complete. Launching...</span>
                                        <span className="text-green-500 mt-1">&gt; found 0 vulnerabilities</span>
                                    </div>
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};


// Simple Typewriter Helper
const Typewriter = ({ text }) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 50); // Typing speed

        return () => clearInterval(timer);
    }, [text]);

    return (
        <span>
            {displayText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-green-500 ml-1 align-middle"
            />
        </span>
    );
};

export default ModernIntro;
