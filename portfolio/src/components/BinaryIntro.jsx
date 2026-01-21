import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const bootSequence = [
    { text: "PORTFOLIO LOADING...", color: "text-green-500", delay: 50 },
    { text: "LOADING BIOS v2.4...", color: "text-green-500", delay: 50 },
    { text: "CHECKING MEMORY... 32GB OK", color: "text-green-500", delay: 50 },
    { text: "MOUNTING VOLUME /dev/portfolio...", color: "text-yellow-500", delay: 100 },
    { text: "ACCESSING SECURE DATA...", color: "text-red-500", delay: 150 },
    { text: "DECRYPTING IDENTITY...", color: "text-red-500", delay: 200 },
    { text: "--------------------------------", color: "text-gray-500", delay: 50 },
    { text: "010010100100010001000100010100010", color: "text-red-500", delay: 50 },
    { text: "IDENTITY CONFIRMED:", color: "text-blue-400", delay: 50 },
    { text: "> NAME: ABHIJITH PS", color: "text-cyan-400 font-bold text-lg", delay: 400 },
    { text: "> ROLE: SOFTWARE ENGINEER", color: "text-cyan-400 font-bold text-lg", delay: 400 },
    { text: "> STACK: REACT / REACT NATIVE / NEXT JS", color: "text-cyan-400 font-bold text-lg", delay: 400 },
    { text: "> STATUS: ONLINE & READY", color: "text-green-400 font-bold", delay: 400 },
    { text: "--------------------------------", color: "text-gray-500", delay: 50 },
    { text: "LOADING UI ASSETS...", color: "text-green-500", delay: 50 },
    { text: "COMPILING SHADERS...", color: "text-green-500", delay: 50 },
    { text: "EXECUTING MAIN PROCESS...", color: "text-green-500", delay: 50 },
    { text: "PORTFOLIO READY", color: "text-green-500", delay: 50 },
];

const BinaryIntro = ({ onComplete }) => {
    const [logs, setLogs] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        let isCancelled = false;

        const runSequence = async () => {
            for (const log of bootSequence) {
                if (isCancelled) break;

                setLogs(prev => [...prev, { ...log, id: Date.now() + Math.random() }]);

                if (containerRef.current) {
                    containerRef.current.scrollTop = containerRef.current.scrollHeight;
                }

                // Wait for specific delay defined in the step
                await new Promise(r => setTimeout(r, log.delay));
            }

            // Keep the final screen visible for ~3 seconds as requested
            if (!isCancelled) {
                await new Promise(r => setTimeout(r, 1000));
                onComplete();
            }
        };

        runSequence();

        return () => {
            isCancelled = true;
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 bg-gray-950 z-[100] overflow-hidden font-mono text-sm md:text-base p-6 md:p-12 flex flex-col justify-end"
        >
            <div
                ref={containerRef}
                className="w-full max-w-4xl mx-auto flex flex-col gap-1 overflow-hidden pb-8"
                style={{
                    textShadow: "0 0 5px rgba(0, 255, 0, 0.4)",
                }}
            >
                {logs.map((log) => (
                    <div key={log.id} className={`${log.color} tracking-wider flex items-center`}>
                        <span className="mr-3 text-gray-700 select-none">[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span>
                        {log.text}
                    </div>
                ))}
                <div className="animate-pulse w-3 h-5 bg-green-500 mt-1" />
            </div>

            {/* Visual Effects */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-green-900/10 mix-blend-overlay" />
        </motion.div>
    );
};

export default BinaryIntro;
