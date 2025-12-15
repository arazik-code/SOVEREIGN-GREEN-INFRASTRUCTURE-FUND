"use client";

import * as React from "react";
import { cn } from "@sgif/ui";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
    title: string;
    value: string;
    trend?: string;
    trendDirection?: "up" | "down" | "neutral";
    className?: string;
    icon?: React.ReactNode;
    glowColor?: "cyan" | "gold" | "emerald" | "purple";
    animate?: boolean;
    delay?: number;
}

const colorConfig = {
    cyan: {
        glow: "hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:border-cyber-cyan/40",
        accent: "from-cyber-cyan",
        bg: "bg-cyber-cyan",
        text: "text-cyber-cyan",
        gradient: "from-cyber-cyan/20 to-transparent"
    },
    gold: {
        glow: "hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:border-sgif-gold/40",
        accent: "from-sgif-gold",
        bg: "bg-sgif-gold",
        text: "text-sgif-gold",
        gradient: "from-sgif-gold/20 to-transparent"
    },
    emerald: {
        glow: "hover:shadow-[0_0_30px_rgba(2,154,118,0.3)] hover:border-sgif-emerald/40",
        accent: "from-sgif-emerald",
        bg: "bg-sgif-emerald",
        text: "text-sgif-emerald",
        gradient: "from-sgif-emerald/20 to-transparent"
    },
    purple: {
        glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-purple-500/40",
        accent: "from-purple-500",
        bg: "bg-purple-500",
        text: "text-purple-400",
        gradient: "from-purple-500/20 to-transparent"
    }
};

export const KpiCard = React.memo(function KpiCard({ 
    title, 
    value, 
    trend, 
    trendDirection = "neutral", 
    className, 
    icon,
    glowColor = "cyan",
    animate = true,
    delay = 0
}: KpiCardProps) {
    const config = colorConfig[glowColor];

    const CardWrapper = animate ? motion.div : 'div';
    const animationProps = animate ? {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.5, delay, ease: "easeOut" },
        whileHover: { scale: 1.02, transition: { duration: 0.2 } }
    } : {};

    return (
        <CardWrapper 
            className={cn(
                "glass-card p-6 relative overflow-hidden group transition-all duration-300",
                config.glow,
                className
            )}
            {...animationProps}
        >
            {/* Animated top accent line */}
            <motion.div 
                className={cn(
                    "absolute top-0 left-0 right-0 h-px bg-gradient-to-r to-transparent",
                    config.accent
                )}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: delay + 0.2 }}
            />
            
            {/* Corner decorations with animation */}
            <div className="absolute top-2 right-2 w-10 h-10">
                <motion.div 
                    className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-white/20 to-transparent"
                    initial={{ scaleX: 0, originX: 1 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.3 }}
                />
                <motion.div 
                    className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-white/20 to-transparent"
                    initial={{ scaleY: 0, originY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ delay: 0.3 }}
                />
                <motion.div 
                    className={cn("absolute top-0 right-0 w-1.5 h-1.5 rounded-full", config.bg)}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>
            <div className="absolute bottom-2 left-2 w-10 h-10">
                <motion.div 
                    className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.3 }}
                />
                <motion.div 
                    className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-t from-white/20 to-transparent"
                    initial={{ scaleY: 0, originY: 1 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ delay: 0.3 }}
                />
            </div>

            <div className="flex flex-row items-center justify-between pb-3">
                <div className="flex items-center gap-2">
                    <motion.div 
                        className={cn("w-1 h-4 rounded-full", config.bg)}
                        animate={{ scaleY: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</span>
                </div>
                <motion.div 
                    className={cn(
                        "p-2.5 rounded-xl bg-gradient-to-br border border-white/10 transition-all duration-300",
                        "group-hover:border-white/20",
                        config.gradient
                    )}
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                >
                    {icon}
                </motion.div>
            </div>
            
            <div className="flex items-baseline gap-2">
                <motion.div 
                    className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent font-mono"
                    initial={animate ? { opacity: 0, scale: 0.5 } : undefined}
                    animate={animate ? { opacity: 1, scale: 1 } : undefined}
                    transition={{ duration: 0.5, delay: delay + 0.3 }}
                >
                    {value}
                </motion.div>
            </div>
            
            {trend && (
                <motion.div 
                    className={cn(
                        "text-xs flex items-center mt-4 font-medium px-2 py-1 rounded-lg w-fit",
                        trendDirection === "up" ? "text-sgif-emerald bg-sgif-emerald/10" :
                        trendDirection === "down" ? "text-red-400 bg-red-500/10" : "text-gray-500 bg-white/5"
                    )}
                    initial={animate ? { opacity: 0, x: -10 } : undefined}
                    animate={animate ? { opacity: 1, x: 0 } : undefined}
                    transition={{ duration: 0.3, delay: delay + 0.4 }}
                >
                    {trendDirection === "up" && <TrendingUp className="h-3.5 w-3.5 mr-1.5" />}
                    {trendDirection === "down" && <TrendingDown className="h-3.5 w-3.5 mr-1.5" />}
                    {trendDirection === "neutral" && <Minus className="h-3.5 w-3.5 mr-1.5" />}
                    {trend}
                </motion.div>
            )}

            {/* Animated background effects */}
            <motion.div 
                className={cn(
                    "absolute -bottom-16 -right-16 w-40 h-40 rounded-full blur-3xl",
                    config.bg
                )}
                animate={{ 
                    opacity: [0.05, 0.15, 0.05],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Data stream effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={cn("absolute w-px h-8", config.bg)}
                        style={{ left: `${30 + i * 20}%`, opacity: 0.3 }}
                        animate={{ top: ["-10%", "110%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                    />
                ))}
            </div>
        </CardWrapper>
    );
});
