import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const codeLines = [
    "<!DOCTYPE html>",
    "<html lang='en'>",
    "  <head>",
    "    <title>Abhijith's Portfolio</title>",
    "  </head>",
    "  <body>",
    "    <h1>Hello, World!</h1>",
    "    <div id='root'>Loading...</div>",
    "  </body>",
    "</html>"
];

const CodeIntro = ({ onComplete }) => {
    const [displayedLines, setDisplayedLines] = useState([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    useEffect(() => {
        if (currentLineIndex >= codeLines.length) {
            setTimeout(onComplete, 1000); // Wait a bit before finishing
            return;
        }

        const currentLine = codeLines[currentLineIndex];

        if (currentCharIndex < currentLine.length) {
            const timeout = setTimeout(() => {
                setDisplayedLines(prev => {
                    const newLines = [...prev];
                    if (newLines[currentLineIndex] === undefined) {
                        newLines[currentLineIndex] = "";
                    }
                    newLines[currentLineIndex] += currentLine[currentCharIndex];
                    return newLines;
                });
                setCurrentCharIndex(prev => prev + 1);
            }, 30 + Math.random() * 30); // Random typing speed

            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setCurrentLineIndex(prev => prev + 1);
                setCurrentCharIndex(0);
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [currentLineIndex, currentCharIndex, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 bg-[#1e1e1e] z-[100] flex items-center justify-center font-mono text-sm sm:text-base"
        >
            <div className="w-full max-w-3xl h-[80vh] bg-[#2d2d2d] rounded-lg shadow-2xl overflow-hidden flex flex-col border border-[#3e3e3e]">
                {/* Editor Header */}
                <div className="bg-[#3c3c3c] px-4 py-2 flex items-center gap-2 border-b border-[#1e1e1e]">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="ml-4 px-3 py-1 bg-[#1e1e1e] rounded-t-md text-gray-300 text-xs">
                        index.html
                    </div>
                </div>

                {/* Editor Content */}
                <div className="flex-1 p-6 overflow-hidden text-gray-300 relative">
                    {codeLines.map((line, idx) => (
                        <div key={idx} className="flex min-h-[1.5em]">
                            <span className="text-gray-600 mr-4 select-none w-6 text-right">{idx + 1}</span>
                            <span className="whitespace-pre font-mono" style={{
                                color: line.includes("<") ? "#569cd6" : "#d4d4d4"
                            }}>
                                {/* Simple syntax highlighting logic simulation */}
                                {displayedLines[idx] || ""}
                                {idx === currentLineIndex && (
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.8 }}
                                        className="inline-block w-2.5 h-5 bg-blue-400 align-middle ml-1"
                                    />
                                )}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default CodeIntro;
