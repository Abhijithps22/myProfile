import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MatrixIntro = ({ onComplete }) => {
    const canvasRef = useRef(null);
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const columns = Math.floor(width / 20);
        const drops = new Array(columns).fill(1);

        // Binary chars
        const chars = "01";

        let animationId;
        let iterations = 0;

        const draw = () => {
            // Semi-transparent black to create fade effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#0F0'; // Green text
            ctx.font = '15px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                ctx.fillText(text, i * 20, drops[i] * 20);

                // Reset drop to top randomly or if off screen
                if (drops[i] * 20 > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            iterations++;
            // Stop matrix effect after ~2.5 seconds to show title
            if (iterations < 150) {
                animationId = requestAnimationFrame(draw);
            } else {
                setShowText(true);
                setTimeout(onComplete, 2000); // Wait 2s after text appears then finish
            }
        };

        animationId = requestAnimationFrame(draw);

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            <AnimatePresence>
                {showText && (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
                        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                        exit={{ scale: 1.5, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="relative z-10"
                    >
                        <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] glitch-text">
                            PORTFOLIO
                        </h1>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
        .glitch-text {
          text-shadow: 2px 0 #fff, -2px 0 #0f0;
          animation: glitch 0.5s infinite linear alternate-reverse;
        }
        @keyframes glitch {
          0% { text-shadow: 2px 0 rgba(255,0,0,0.5), -2px 0 rgba(0,0,255,0.5); transform: skewX(0deg); }
          25% { text-shadow: -2px 0 rgba(255,0,0,0.5), 2px 0 rgba(0,0,255,0.5); transform: skewX(2deg); }
          50% { text-shadow: 2px 0 rgba(255,0,0,0.5), -2px 0 rgba(0,0,255,0.5); transform: skewX(-2deg); }
          75% { text-shadow: -2px 0 rgba(255,0,0,0.5), 2px 0 rgba(0,0,255,0.5); transform: skewX(1deg); }
          100% { text-shadow: 2px 0 rgba(255,0,0,0.5), -2px 0 rgba(0,0,255,0.5); transform: skewX(0deg); }
        }
      `}</style>
        </motion.div>
    );
};

export default MatrixIntro;
