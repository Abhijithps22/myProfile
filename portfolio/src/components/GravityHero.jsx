import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import {
    SiReact, SiNextdotjs, SiTailwindcss, SiTypescript, SiNodedotjs, SiPython, SiFramer, SiPostgresql
} from "react-icons/si";

const GravityHero = () => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]); // Parallax on scroll

    // Mouse Interaction
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set(clientX / innerWidth - 0.5);
        mouseY.set(clientY / innerHeight - 0.5);
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-full relative flex items-center justify-center pointer-events-auto"
            onMouseMove={handleMouseMove}
        >
            {/* Center Core - Circular Design as requested */}
            <motion.div
                style={{ y }}
                className="relative z-10 w-0 h-0 md:w-80 md:h-80 bg-[#0a0a0a] rounded-full shadow-2xl flex items-center justify-center group"
            >
                {/* Outer Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/20 to-green-500/20 blur-2xl -z-10 group-hover:blur-3xl transition-all duration-500" />

                {/* Dashed Rotating Border */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-10px] rounded-full border border-dashed border-gray-700/50"
                />

                {/* Inner Counter-Rotating Border */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-20px] rounded-full border border-dotted border-gray-800"
                />

                {/* Core Content */}
                <div className="relative z-20 flex flex-col items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-green-400 filter drop-shadow-lg"
                    >
                        &lt;/&gt;
                    </motion.div>
                </div>
            </motion.div>

            {/* Floating Icons */}
            <FloatingIcon icon={SiReact} color="text-cyan-400" x={-160} y={-120} delay={0} mouseX={mouseX} mouseY={mouseY} />
            <FloatingIcon icon={SiNextdotjs} color="text-foreground" x={180} y={-100} delay={1} mouseX={mouseX} mouseY={mouseY} />
            <FloatingIcon icon={SiTypescript} color="text-blue-500" x={-140} y={140} delay={2} mouseX={mouseX} mouseY={mouseY} />
            <FloatingIcon icon={SiTailwindcss} color="text-cyan-300" x={160} y={120} delay={1.5} mouseX={mouseX} mouseY={mouseY} />
            <FloatingIcon icon={SiNodedotjs} color="text-green-500" x={0} y={-200} delay={0.5} mouseX={mouseX} mouseY={mouseY} />
            <FloatingIcon icon={SiFramer} color="text-pink-500" x={0} y={200} delay={2.5} mouseX={mouseX} mouseY={mouseY} />

            {/* Background Particles */}
            {[...Array(20)].map((_, i) => (
                <Particle key={i} index={i} mouseX={mouseX} mouseY={mouseY} />
            ))}
        </div>
    );
};

const FloatingIcon = ({ icon: Icon, color, x, y, delay, mouseX, mouseY }) => {
    // Inverse movement to mouse for parallax depth
    const moveX = useTransform(mouseX, [-0.5, 0.5], [x + 30, x - 30]);
    const moveY = useTransform(mouseY, [-0.5, 0.5], [y + 30, y - 30]);

    // Smooth spring movement
    const smoothX = useSpring(moveX, { stiffness: 60, damping: 20 });
    const smoothY = useSpring(moveY, { stiffness: 60, damping: 20 });

    return (
        <motion.div
            style={{ x: smoothX, y: smoothY }}
            animate={{
                y: [y - 15, y + 15, y - 15],
                rotate: [0, 10, -10, 0]
            }}
            transition={{
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
                rotate: { duration: 8, repeat: Infinity, ease: "easeInOut", delay }
            }}
            className={`absolute text-4xl ${color} bg-background/30 backdrop-blur-md p-4 rounded-full border border-white/10 shadow-xl`}
        >
            <Icon />
        </motion.div>
    );
};

const Particle = ({ index, mouseX, mouseY }) => {
    const randomX = (Math.random() - 0.5) * 800;
    const randomY = (Math.random() - 0.5) * 800;
    const moveX = useTransform(mouseX, [-0.5, 0.5], [randomX + 60, randomX - 60]);
    const moveY = useTransform(mouseY, [-0.5, 0.5], [randomY + 60, randomY - 60]);

    return (
        <motion.div
            style={{ x: moveX, y: moveY }}
            className="absolute col-span-1 w-1.5 h-1.5 bg-primary/20 rounded-full blur-[1px]"
            animate={{ opacity: [0.1, 0.6, 0.1], scale: [1, 1.5, 1] }}
            transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, delay: Math.random() * 2 }}
        />
    )
}

export default GravityHero;
