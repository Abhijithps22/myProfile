import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import ModernIntro from "@/components/ModernIntro";
import CustomCursor from "@/components/CustomCursor";
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { AnimatePresence } from "framer-motion";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Smooth scrolling for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* Custom Cursor rendered globally */}
      <CustomCursor />

      <AnimatePresence mode="wait">
        {showIntro && <ModernIntro onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>
      {!showIntro && (
        <Layout>
          <Home />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </Layout>
      )}
    </ThemeProvider>
  );
}

export default App;
