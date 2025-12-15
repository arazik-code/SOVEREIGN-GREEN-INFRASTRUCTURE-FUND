"use client";

import * as React from "react";
import { TopNav } from "./top-nav";
import { SideNav } from "./side-nav";
import { motion } from "framer-motion";

// Memoized background component to prevent unnecessary re-renders
const CyberBackground = React.memo(function CyberBackground() {
    return (
        <>
            {/* Base grid pattern */}
            <div 
                className="fixed inset-0 pointer-events-none opacity-30"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}
            />
            
            {/* Ambient glow orbs */}
            <motion.div 
                className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
                className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-sgif-gold/5 rounded-full blur-3xl pointer-events-none"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div 
                className="fixed top-1/2 right-0 w-[400px] h-[400px] bg-sgif-emerald/5 rounded-full blur-3xl pointer-events-none"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />
            
            {/* Corner decorations */}
            <div className="fixed top-4 left-4 w-24 h-24 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-cyber-cyan/50 to-transparent" />
                <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-cyber-cyan/50 to-transparent" />
                <motion.div 
                    className="absolute top-0 left-0 w-2 h-2 bg-cyber-cyan rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>
            <div className="fixed top-4 right-4 w-24 h-24 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-sgif-gold/50 to-transparent" />
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-sgif-gold/50 to-transparent" />
                <motion.div 
                    className="absolute top-0 right-0 w-2 h-2 bg-sgif-gold rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
            </div>
            <div className="fixed bottom-4 left-4 w-24 h-24 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-sgif-emerald/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-px h-full bg-gradient-to-t from-sgif-emerald/50 to-transparent" />
                <motion.div 
                    className="absolute bottom-0 left-0 w-2 h-2 bg-sgif-emerald rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
            </div>
        </>
    );
});

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
    
    // Memoize toggle function
    const toggleSidebar = React.useCallback(() => {
        setSidebarCollapsed(prev => !prev);
    }, []);

    return (
        <div className="flex min-h-screen flex-col relative bg-[#0a0a0f]">
            <CyberBackground />
            
            <TopNav onMenuClick={toggleSidebar} />
            <div className="flex flex-1 relative z-10">
                <SideNav collapsed={sidebarCollapsed} />
                <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-4rem)] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                    {children}
                </main>
            </div>
        </div>
    );
}
