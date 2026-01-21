import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const About = () => {
    return (
        <section id="about" className="py-32 bg-secondary/30 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold tracking-tight mb-4"
                    >
                        About Me
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-muted-foreground"
                    >
                        A passionate developer with a knack for creating intuitive and dynamic user experiences.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-semibold">Who I Am</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            I am a dedicated software engineer with a strong foundation in frontend and backend development. My journey in tech started with a curiosity for how things work on the web, which quickly turned into a passion for building robust applications.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            When I'm not coding, you can find me exploring new technologies, contributing to open source, or enjoying a good cup of coffee while reading about the latest tech trends.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {[
                            { number: "2+", label: "Years Experience" },
                            { number: "20+", label: "Projects Completed" },
                        ].map((stat, index) => (
                            <div key={index} className="p-[1px] rounded-xl bg-gradient-to-r from-purple-500 to-green-500 hover:shadow-lg transition-all hover:-translate-y-1 group relative overflow-hidden">
                                <Card className="text-center border-none shadow-sm bg-card/90 backdrop-blur-sm h-full rounded-xl">
                                    {/* Decorative Curve */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-[100px] transition-all duration-300 group-hover:scale-110" />

                                    <CardContent className="pt-8 relative z-10">
                                        <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                                        <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
