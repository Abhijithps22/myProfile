import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Calendar, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const projects = [
    {
        title: "Al Jamia Arts and Science College",
        description: "A comprehensive educational platform built with Next.js, featuring dynamic course management, student portals, and an event management system for the college.",
        tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
        link: "https://aljamia.net/",
        github: "#",
        date: "2024"
    },
    {
        title: "Datahex Digital Solutions",
        description: "A high-performance corporate website for a digital agency. Implemented a modern, responsive design to showcase services and portfolio items effectively.",
        tags: ["React.js", "Tailwind CSS", "Framer Motion", "Vite"],
        link: "https://datahex.co/",
        github: "#",
        date: "2023 - 2024"
    },
    {
        title: "Enterprise Admin Dashboards",
        description: "Developed multiple complex admin panels for various clients, focusing on data visualization, role-based access control, and efficient content management workflows.",
        tags: ["React", "Redux", "Material UI", "TanStack Query", "Recharts"],
        link: "#",
        github: "#",
        date: "2023 - Present"
    }
];

const Projects = () => {
    return (
        <section id="projects" className="py-32 bg-secondary/20 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl font-extrabold tracking-tight mb-4">Project Timeline</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A chronological journey through my development work and significant milestones.
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line - Goes through dots */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-primary/50 to-transparent -translate-x-1/2" />

                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`relative flex items-center mb-20 last:mb-0 md:justify-between ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Timeline Dot with Bounce Animation */}
                            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                                    className="w-10 h-10 rounded-full bg-background border-4 border-primary shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center"
                                >
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="w-3 h-3 bg-primary rounded-full"
                                    />
                                </motion.div>
                            </div>

                            {/* Content Card */}
                            <div className={`ml-24 md:ml-0 md:w-[42%] p-8 rounded-2xl border bg-card/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 relative group hover:-translate-y-1`}>

                                <div className="flex items-center gap-2 mb-3 text-sm text-primary font-mono font-medium">
                                    <Calendar size={14} />
                                    <span>{project.date}</span>
                                </div>

                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="text-xs font-normal px-2.5 py-1">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    <Button size="sm" variant="outline" className="flex-1">
                                        <Github className="w-4 h-4 mr-2" /> Code
                                    </Button>
                                    <Button size="sm" className="flex-1">
                                        <ExternalLink className="w-4 h-4 mr-2" /> Live
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
