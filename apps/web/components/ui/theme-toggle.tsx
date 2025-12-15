"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@sgif/ui";
import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";

interface ThemeToggleProps {
    variant?: 'icon' | 'full' | 'minimal';
    className?: string;
}

export function ThemeToggle({ variant = 'icon', className }: ThemeToggleProps) {
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className={cn("w-10 h-10 rounded-lg bg-white/5 animate-pulse", className)} />
        );
    }

    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';

    if (variant === 'minimal') {
        return (
            <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={cn(
                    "p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors",
                    className
                )}
            >
                {isDark ? (
                    <Sun className="h-5 w-5" />
                ) : (
                    <Moon className="h-5 w-5" />
                )}
            </button>
        );
    }

    if (variant === 'icon') {
        return (
            <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={cn(
                    "relative p-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all group",
                    className
                )}
            >
                <motion.div
                    initial={false}
                    animate={{ rotate: isDark ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                >
                    {isDark ? (
                        <Moon className="h-5 w-5 text-cyber-cyan" />
                    ) : (
                        <Sun className="h-5 w-5 text-sgif-gold" />
                    )}
                </motion.div>
                
                {/* Glow effect */}
                <div className={cn(
                    "absolute inset-0 rounded-lg blur-lg opacity-0 group-hover:opacity-50 transition-opacity",
                    isDark ? "bg-cyber-cyan" : "bg-sgif-gold"
                )} />
            </button>
        );
    }

    // Full variant with all three options
    return (
        <div className={cn(
            "flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10",
            className
        )}>
            {[
                { value: 'light', icon: Sun, label: 'Light' },
                { value: 'dark', icon: Moon, label: 'Dark' },
                { value: 'system', icon: Monitor, label: 'System' },
            ].map(option => {
                const Icon = option.icon;
                const isActive = theme === option.value;
                
                return (
                    <button
                        key={option.value}
                        onClick={() => setTheme(option.value)}
                        className={cn(
                            "relative flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all",
                            isActive 
                                ? "text-white" 
                                : "text-gray-500 hover:text-gray-300"
                        )}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeTheme"
                                className="absolute inset-0 bg-white/10 rounded-md"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                            />
                        )}
                        <Icon className={cn(
                            "h-4 w-4 relative z-10",
                            isActive && option.value === 'light' && "text-sgif-gold",
                            isActive && option.value === 'dark' && "text-cyber-cyan",
                            isActive && option.value === 'system' && "text-purple-400"
                        )} />
                        <span className="relative z-10">{option.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
