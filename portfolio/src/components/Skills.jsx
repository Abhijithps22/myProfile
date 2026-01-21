import React from "react";
import { motion } from "framer-motion";
import {
    SiReact, SiNextdotjs, SiPostman, SiCss3,
    SiTailwindcss, SiSass, SiHtml5, SiJavascript,
    SiTypescript, SiNodedotjs, SiPrisma, SiPostgresql,
    SiMongodb
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

const skills = [
    { name: "React", icon: SiReact, color: "text-cyan-400" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-foreground" },
    { name: "React Native", icon: TbBrandReactNative, color: "text-cyan-400" },
    { name: "Postman", icon: SiPostman, color: "text-orange-500" },
    { name: "CSS3", icon: SiCss3, color: "text-blue-500" },
    { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-300" },
    { name: "SCSS", icon: SiSass, color: "text-pink-400" },
    { name: "HTML5", icon: SiHtml5, color: "text-orange-600" },
    { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
    { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
    { name: "Prisma", icon: SiPrisma, color: "text-foreground" },
    { name: "SQL", icon: SiPostgresql, color: "text-blue-400" },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 260, damping: 20 }
    }
};

const Skills = () => {
    return (
        <section id="skills" className="py-32 bg-background relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-extrabold tracking-tight mb-4 "
                    >
                        Technologies
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-muted-foreground text-lg"
                    >
                        My Technical Toolkit.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto"
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            variants={itemVariants}
                            className="group relative"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    duration: 2 + (index % 3) + (index % 2) * 0.5, // Deterministic duration between 2-4.5s
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                    delay: (index % 5) * 0.2 // Deterministic delay
                                }}
                                className="h-full"
                            >
                                <div className="h-full flex flex-col items-center justify-center p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                                    {/* Bubble Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

                                    <div className={`text-4xl mb-4 ${skill.color} relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm`}>
                                        <skill.icon />
                                    </div>
                                    <span className="font-medium text-sm text-muted-foreground group-hover:text-foreground transition-colors lowercase relative z-10">
                                        {skill.name}
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
