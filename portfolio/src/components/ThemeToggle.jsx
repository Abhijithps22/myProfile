import React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { motion } from "framer-motion"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full w-10 h-10 border border-transparent hover:border-border transition-all"
        >
            <div className="relative w-5 h-5">
                <motion.div
                    initial={false}
                    animate={{
                        rotate: theme === "dark" ? 0 : 90,
                        scale: theme === "dark" ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Moon className="h-5 w-5 text-foreground" />
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{
                        rotate: theme === "dark" ? -90 : 0,
                        scale: theme === "dark" ? 0 : 1
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Sun className="h-5 w-5 text-foreground" />
                </motion.div>
            </div>
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
