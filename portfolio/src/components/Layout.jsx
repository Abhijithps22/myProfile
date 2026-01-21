import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-background font-sans text-foreground">
            <Navbar />
            <main className="flex-grow w-full p-6 md:p-12">
                {children}
            </main>
            <footer className="py-8 text-center text-muted-foreground border-t border-border/40">
                <p>© {new Date().getFullYear()}-All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;
