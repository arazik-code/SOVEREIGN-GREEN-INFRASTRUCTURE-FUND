"use client";

import * as React from "react";
import { Link, usePathname } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@sgif/ui";
import {
    PieChart,
    Briefcase,
    Leaf,
    DollarSign,
    FileText,
    Settings,
    Users,
    Map as MapIcon,
    Cpu,
    Hexagon,
    Shield,
    BarChart3,
    Landmark,
    Sparkles
} from "lucide-react";

const NAV_SECTIONS = [
    {
        title: "Operations",
        items: [
            { title: "Command Center", href: "/app/dashboard", icon: PieChart, color: "cyber-cyan", badge: null },
            { title: "Projects", href: "/app/projects", icon: Briefcase, color: "sgif-gold", badge: "8" },
            { title: "Carbon", href: "/app/carbon", icon: Leaf, color: "sgif-emerald", badge: null },
            { title: "Financials", href: "/app/financials", icon: DollarSign, color: "sgif-gold", badge: null },
        ]
    },
    {
        title: "Intelligence",
        items: [
            { title: "AI Copilot", href: "/app/ai", icon: Cpu, color: "purple-500", badge: "NEW" },
            { title: "Maps", href: "/app/maps", icon: MapIcon, color: "sgif-emerald", badge: null },
            { title: "Insights", href: "/app/insights", icon: BarChart3, color: "cyber-cyan", badge: null },
            { title: "Reports", href: "/app/reports", icon: FileText, color: "sgif-gold", badge: null },
        ]
    },
    {
        title: "Administration",
        items: [
            { title: "Data Room", href: "/app/data-room", icon: FileText, color: "cyber-cyan", badge: null },
            { title: "Governance", href: "/app/governance", icon: Landmark, color: "sgif-gold", badge: null },
            { title: "Admin", href: "/app/admin", icon: Users, color: "sgif-gold", badge: null },
            { title: "Settings", href: "/app/settings", icon: Settings, color: "gray-400", badge: null },
        ]
    }
];

// Flatten for legacy compatibility
const NAV_ITEMS = NAV_SECTIONS.flatMap(section => section.items);

export const SideNav = React.memo(function SideNav({ collapsed }: { collapsed: boolean }) {
    const pathname = usePathname();

    return (
        <motion.div
            className={cn(
                "h-screen border-r border-white/5 bg-black/60 backdrop-blur-xl hidden md:flex flex-col relative",
                collapsed ? "w-16" : "w-72"
            )}
            initial={false}
            animate={{ width: collapsed ? 64 : 288 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            {/* Decorative lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-cyber-cyan/50 via-transparent to-sgif-gold/50" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-sgif-emerald/50 via-transparent to-cyber-cyan/50" />
            
            {/* Logo area */}
            <div className="p-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <motion.div 
                        className="relative"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <Hexagon className="w-10 h-10 text-cyber-cyan" />
                        <motion.div 
                            className="absolute inset-0 blur-md bg-cyber-cyan/30 rounded-full"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-bold text-cyber-cyan">S</span>
                        </div>
                    </motion.div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <span className="font-bold text-lg bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">SGIF</span>
                                <div className="flex items-center gap-1.5">
                                    <motion.div 
                                        className="w-1.5 h-1.5 rounded-full bg-sgif-emerald"
                                        animate={{ opacity: [1, 0.4, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                    <span className="text-[10px] text-gray-500 font-mono">CONTROL SYSTEM v2.0</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                {collapsed ? (
                    // Collapsed view - just icons
                    <div className="flex flex-col gap-1 px-2">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname?.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "group relative flex items-center justify-center rounded-xl p-3 transition-all duration-200",
                                        isActive 
                                            ? "bg-white/10 text-white" 
                                            : "text-gray-500 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNavCollapsed"
                                            className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/10 to-sgif-gold/10 rounded-xl border border-cyber-cyan/20"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <item.icon className={cn(
                                        "h-5 w-5 relative z-10 transition-colors",
                                        isActive && `text-${item.color}`
                                    )} />
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    // Expanded view - sections with titles
                    <div className="space-y-6">
                        {NAV_SECTIONS.map((section, sectionIndex) => (
                            <div key={section.title} className="px-3">
                                <motion.div 
                                    className="flex items-center gap-2 px-3 mb-2"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: sectionIndex * 0.1 }}
                                >
                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyber-cyan to-sgif-gold" />
                                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{section.title}</span>
                                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                                </motion.div>
                                
                                <div className="flex flex-col gap-1">
                                    {section.items.map((item, index) => {
                                        const isActive = pathname?.startsWith(item.href);
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={cn(
                                                    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200",
                                                    isActive 
                                                        ? "bg-white/5 text-white" 
                                                        : "text-gray-500 hover:text-white hover:bg-white/5"
                                                )}
                                            >
                                                {/* Active indicator */}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="activeNav"
                                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyber-cyan to-sgif-gold rounded-r"
                                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                    />
                                                )}
                                                
                                                <motion.div 
                                                    className={cn(
                                                        "relative p-2 rounded-lg transition-colors",
                                                        isActive ? "bg-white/10" : "group-hover:bg-white/5"
                                                    )}
                                                    whileHover={{ scale: 1.1 }}
                                                    transition={{ type: "spring", stiffness: 400 }}
                                                >
                                                    <item.icon className={cn(
                                                        "h-4 w-4 transition-colors relative z-10",
                                                        isActive && `text-${item.color}`
                                                    )} />
                                                    {isActive && (
                                                        <motion.div 
                                                            className={cn(
                                                                "absolute inset-0 rounded-lg blur-md opacity-50",
                                                                `bg-${item.color}`
                                                            )}
                                                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                        />
                                                    )}
                                                </motion.div>
                                                
                                                <motion.span
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.2, delay: (sectionIndex * 4 + index) * 0.02 }}
                                                    className={cn(
                                                        "text-sm font-medium flex-1",
                                                        isActive && "text-white"
                                                    )}
                                                >
                                                    {item.title}
                                                </motion.span>

                                                {item.badge && (
                                                    <motion.span
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className={cn(
                                                            "px-2 py-0.5 text-[10px] font-bold rounded-full",
                                                            item.badge === "NEW" 
                                                                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                                                : "bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30"
                                                        )}
                                                    >
                                                        {item.badge}
                                                    </motion.span>
                                                )}

                                                {/* Hover glow effect */}
                                                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/5 to-transparent" />
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom status indicator */}
            <AnimatePresence>
                {!collapsed && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="p-4 border-t border-white/5"
                    >
                        <div className="glass-card p-4 rounded-xl relative overflow-hidden">
                            {/* Animated background */}
                            <motion.div 
                                className="absolute inset-0 bg-gradient-to-r from-sgif-emerald/5 to-cyber-cyan/5"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            
                            <div className="relative">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sgif-emerald opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-sgif-emerald"></span>
                                    </span>
                                    <span className="text-xs text-gray-400">System Status</span>
                                    <Shield className="w-3 h-3 text-sgif-emerald ml-auto" />
                                </div>
                                <p className="text-xs text-sgif-emerald font-mono tracking-wider">ALL SYSTEMS OPERATIONAL</p>
                                <div className="flex gap-1 mt-2">
                                    {["API", "DB", "CDN", "AI"].map((service, i) => (
                                        <motion.span 
                                            key={service}
                                            className="px-1.5 py-0.5 text-[8px] bg-sgif-emerald/10 text-sgif-emerald rounded border border-sgif-emerald/20 font-mono"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            {service}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
});
