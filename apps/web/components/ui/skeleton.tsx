"use client";

import * as React from "react";
import { cn } from "@sgif/ui";
import { motion } from "framer-motion";

interface SkeletonProps {
    className?: string;
    style?: React.CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
    return (
        <div 
            className={cn(
                "animate-pulse bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%] animate-shimmer rounded",
                className
            )} 
            style={style}
        />
    );
}

export function SkeletonCard({ className }: SkeletonProps) {
    return (
        <div className={cn("glass-card p-6 space-y-4", className)}>
            <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-3 w-20" />
        </div>
    );
}

export function SkeletonTable({ rows = 5, columns = 4, className }: SkeletonProps & { rows?: number; columns?: number }) {
    return (
        <div className={cn("glass-card overflow-hidden", className)}>
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex gap-4">
                {Array.from({ length: columns }).map((_, i) => (
                    <Skeleton key={i} className="h-4 flex-1" />
                ))}
            </div>
            
            {/* Rows */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div 
                    key={rowIndex} 
                    className="p-4 border-b border-white/5 flex gap-4 items-center"
                >
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <Skeleton 
                            key={colIndex} 
                            className={cn(
                                "h-4 flex-1",
                                colIndex === 0 && "flex-[2]"
                            )} 
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export function SkeletonChart({ className }: SkeletonProps) {
    return (
        <div className={cn("glass-card p-6", className)}>
            <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-5 w-40" />
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-16 rounded-lg" />
                    <Skeleton className="h-8 w-16 rounded-lg" />
                </div>
            </div>
            <div className="h-64 flex items-end gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton 
                        key={i} 
                        className="flex-1 rounded-t"
                        style={{ height: `${30 + Math.random() * 70}%` }}
                    />
                ))}
            </div>
        </div>
    );
}

export function SkeletonKpiGrid({ count = 4, className }: SkeletonProps & { count?: number }) {
    return (
        <div className={cn("grid gap-4", `grid-cols-${Math.min(count, 4)}`, className)}>
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}

export function SkeletonDashboard({ className }: SkeletonProps) {
    return (
        <div className={cn("space-y-6", className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex gap-3">
                    <Skeleton className="h-10 w-24 rounded-lg" />
                    <Skeleton className="h-10 w-32 rounded-lg" />
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>

            {/* Main content */}
            <div className="grid grid-cols-7 gap-4">
                <div className="col-span-4">
                    <SkeletonChart />
                </div>
                <div className="col-span-3">
                    <SkeletonTable rows={4} columns={2} />
                </div>
            </div>
        </div>
    );
}

export function SkeletonPage({ className }: SkeletonProps) {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn("min-h-[60vh] flex items-center justify-center", className)}
        >
            <div className="text-center">
                <div className="relative inline-block">
                    <div className="w-16 h-16 border-4 border-cyber-cyan/20 border-t-cyber-cyan rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 bg-cyber-cyan rounded-full animate-pulse" />
                    </div>
                </div>
                <p className="text-gray-500 mt-4 text-sm">Loading...</p>
            </div>
        </motion.div>
    );
}

/**
 * Institutional-grade loading state with SGIF branding
 */
export function InstitutionalLoader({ message = "Initializing secure session..." }: { message?: string }) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
                {/* Animated rings */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                    <motion.div
                        className="absolute inset-0 border-2 border-cyber-cyan/30 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute inset-2 border-2 border-sgif-gold/30 rounded-full"
                        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                        className="absolute inset-4 border-2 border-sgif-emerald/30 rounded-full"
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                    />
                    
                    {/* Center spinner */}
                    <div className="absolute inset-6 flex items-center justify-center">
                        <motion.div
                            className="w-full h-full border-2 border-transparent border-t-cyber-cyan rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-400 text-sm font-mono"
                >
                    {message}
                </motion.p>

                {/* Progress dots */}
                <div className="flex items-center justify-center gap-1 mt-4">
                    {[0, 1, 2].map(i => (
                        <motion.div
                            key={i}
                            className="w-1.5 h-1.5 bg-cyber-cyan rounded-full"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
