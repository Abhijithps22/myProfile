import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the cursor follower
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX - 16); // Center the 32px cursor
            mouseY.set(e.clientY - 16);
        };

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        // Track global mouse movement
        window.addEventListener("mousemove", moveCursor);

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll("a, button, input, textarea, [role='button']");
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        // Cleanup
        return () => {
            window.removeEventListener("mousemove", moveCursor);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, [mouseX, mouseY]);

    // Re-attach listeners when DOM updates (simple observer for SPA changes if needed, 
    // but for now roughly re-running on route change or globally is okay. 
    // A MutationObserver would be robust but maybe overkill. 
    // We'll stick to a simple useEffect with interval or just global standard delegation if this misses elements.
    // Actually, event delegation for 'mouseover' is better for dynamic content.)

    useEffect(() => {
        const handleMouseOver = (e) => {
            if (e.target.closest("a, button, input, textarea, [role='button']")) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener("mouseover", handleMouseOver);
        return () => window.removeEventListener("mouseover", handleMouseOver);
    }, []);


    return (
        <>
            {/* Main Cursor Follower - Hidden on mobile */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                    scale: isHovered ? 2.5 : 1,
                    backgroundColor: isHovered ? "rgba(255, 255, 255, 0.1)" : "transparent",
                }}
            />
            {/* Inner Dot (follows directly) - Hidden on mobile */}
            <div
                className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                ref={(ref) => {
                    if (ref) {
                        const updateDot = (e) => {
                            ref.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
                        };
                        window.addEventListener("mousemove", updateDot);
                    }
                }}
            />
        </>
    );
};

export default CustomCursor;
