import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";

import GravityHero from "@/components/GravityHero";

const Home = () => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-16 md:pt-32 pb-12 md:pb-20 relative overflow-hidden bg-background">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-6 md:gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-3 md:space-y-6 text-center md:text-left"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-3 py-1 bg-secondary/10 text-secondary-foreground rounded-full text-xs md:text-sm font-medium mb-1 md:mb-2 ring-1 ring-primary/20"
                    >
                        Full Stack Developer
                    </motion.div>
                    <div className="space-y-1 md:space-y-2 mb-5">
                        <div className="flex items-center justify-center md:justify-start">
                            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                                Hi, I'm Abhijith P S
                            </h1>
                        </div>

                        <div className="flex items-center justify-center md:justify-start">
                            <h1 className="text-xl sm:text-2xl md:text-5xl font-extrabold tracking-tight mt-2">
                                {Array.from("Building Digital ").map((char, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                                <br className="md:hidden" />
                                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-green-400">
                                    {Array.from("Experiences").map((char, index) => (
                                        <motion.span
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 + index * 0.05 }}
                                            className="inline-block"
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </span>
                            </h1>
                        </div>

                        <p className="text-sm md:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto md:mx-0 pt-2 md:pt-4">
                            I craft accessible, pixel-perfect, and performant web applications with modern technologies. Let's turn your vision into reality.
                        </p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start w-full"
                    >
                        <Button onClick={() => window.location.href = "#projects"} size="lg" className="rounded-full group relative overflow-hidden bg-primary text-white hover:bg-primary/90 w-full sm:w-auto">
                            <span className="relative z-10 flex items-center justify-center">View My Work <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /></span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Button>
                        {/* <Button size="lg" variant="outline" className="rounded-full hover:bg-muted/50 transition-colors w-full sm:w-auto">
                            Download Resume <Download className="ml-2 h-4 w-4" />
                        </Button> */}
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative mx-auto w-48 h-48 md:w-96 md:h-96 flex items-center justify-center"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-green-500 rounded-full opacity-20 blur-2xl animate-spin-slow"></div>
                    <GravityHero />
                </motion.div>
            </div>
        </section>
    );
};

export default Home;
