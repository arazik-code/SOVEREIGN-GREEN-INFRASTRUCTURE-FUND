"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@sgif/ui";
import { 
    TrendingUp, TrendingDown, Activity, Zap, 
    ArrowUpRight, ArrowDownRight, BarChart3, 
    PieChart, LineChart, Layers
} from "lucide-react";

/**
 * LiveMetric - Real-time animated metric display
 */
interface LiveMetricProps {
    value: number;
    previousValue?: number;
    label: string;
    unit?: string;
    precision?: number;
    color?: "cyan" | "gold" | "emerald" | "purple";
    showTrend?: boolean;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function LiveMetric({
    value,
    previousValue,
    label,
    unit = "",
    precision = 0,
    color = "cyan",
    showTrend = true,
    size = "md",
    className
}: LiveMetricProps) {
    const [displayValue, setDisplayValue] = React.useState(previousValue ?? value);
    const [isAnimating, setIsAnimating] = React.useState(false);
    
    const change = previousValue !== undefined ? value - previousValue : 0;
    const changePercent = previousValue !== undefined && previousValue !== 0 
        ? ((value - previousValue) / previousValue) * 100 
        : 0;

    React.useEffect(() => {
        if (previousValue === undefined) {
            setDisplayValue(value);
            return;
        }

        setIsAnimating(true);
        const duration = 1000;
        const start = performance.now();
        const startValue = displayValue;
        
        const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            
            setDisplayValue(startValue + (value - startValue) * eased);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setIsAnimating(false);
            }
        };
        
        requestAnimationFrame(animate);
    }, [value]);

    const colorConfig = {
        cyan: { text: "text-cyber-cyan", bg: "bg-cyber-cyan", glow: "shadow-[0_0_20px_rgba(0,212,255,0.3)]" },
        gold: { text: "text-sgif-gold", bg: "bg-sgif-gold", glow: "shadow-[0_0_20px_rgba(212,175,55,0.3)]" },
        emerald: { text: "text-sgif-emerald", bg: "bg-sgif-emerald", glow: "shadow-[0_0_20px_rgba(2,154,118,0.3)]" },
        purple: { text: "text-purple-400", bg: "bg-purple-500", glow: "shadow-[0_0_20px_rgba(139,92,246,0.3)]" }
    };

    const sizeConfig = {
        sm: { value: "text-xl", label: "text-[10px]", change: "text-[9px]" },
        md: { value: "text-3xl", label: "text-xs", change: "text-[10px]" },
        lg: { value: "text-5xl", label: "text-sm", change: "text-xs" }
    };

    const config = colorConfig[color];
    const sizes = sizeConfig[size];

    return (
        <div className={cn("relative", className)}>
            <div className={cn("font-mono font-bold", sizes.value, config.text)}>
                <motion.span
                    key={value}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className={cn(isAnimating && "blur-[0.5px]")}
                >
                    {displayValue.toFixed(precision)}{unit}
                </motion.span>
            </div>
            <div className={cn("text-gray-500 uppercase tracking-wider", sizes.label)}>
                {label}
            </div>
            {showTrend && previousValue !== undefined && (
                <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                        "flex items-center gap-1 mt-1",
                        sizes.change,
                        change >= 0 ? "text-sgif-emerald" : "text-red-400"
                    )}
                >
                    {change >= 0 ? (
                        <ArrowUpRight className="w-3 h-3" />
                    ) : (
                        <ArrowDownRight className="w-3 h-3" />
                    )}
                    <span>{change >= 0 ? "+" : ""}{changePercent.toFixed(1)}%</span>
                </motion.div>
            )}
        </div>
    );
}

/**
 * SparklineChart - Mini inline chart
 */
interface SparklineChartProps {
    data: number[];
    color?: "cyan" | "gold" | "emerald" | "purple";
    width?: number;
    height?: number;
    showDot?: boolean;
    animated?: boolean;
    className?: string;
}

export function SparklineChart({
    data,
    color = "cyan",
    width = 100,
    height = 30,
    showDot = true,
    animated = true,
    className
}: SparklineChartProps) {
    const colorConfig = {
        cyan: { stroke: "#00d4ff", fill: "rgba(0,212,255,0.1)" },
        gold: { stroke: "#D4AF37", fill: "rgba(212,175,55,0.1)" },
        emerald: { stroke: "#029A76", fill: "rgba(2,154,118,0.1)" },
        purple: { stroke: "#8B5CF6", fill: "rgba(139,92,246,0.1)" }
    };

    const config = colorConfig[color];
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    const points = data.map((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        return `${x},${y}`;
    }).join(" ");

    const areaPoints = `0,${height} ${points} ${width},${height}`;
    const lastPoint = data[data.length - 1];
    const lastY = height - ((lastPoint - min) / range) * height;

    return (
        <svg width={width} height={height} className={cn("overflow-visible", className)}>
            {/* Gradient fill */}
            <defs>
                <linearGradient id={`sparkline-gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={config.stroke} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={config.stroke} stopOpacity={0} />
                </linearGradient>
            </defs>
            
            {/* Area fill */}
            <motion.polygon
                points={areaPoints}
                fill={`url(#sparkline-gradient-${color})`}
                initial={animated ? { opacity: 0 } : undefined}
                animate={animated ? { opacity: 1 } : undefined}
                transition={{ duration: 0.5 }}
            />
            
            {/* Line */}
            <motion.polyline
                points={points}
                fill="none"
                stroke={config.stroke}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
                animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
                transition={{ duration: 1, ease: "easeOut" }}
            />
            
            {/* End dot */}
            {showDot && (
                <motion.circle
                    cx={width}
                    cy={lastY}
                    r={3}
                    fill={config.stroke}
                    initial={animated ? { scale: 0 } : undefined}
                    animate={animated ? { scale: 1 } : undefined}
                    transition={{ delay: 0.8, type: "spring" }}
                />
            )}
            
            {/* Glow effect on dot */}
            {showDot && (
                <motion.circle
                    cx={width}
                    cy={lastY}
                    r={6}
                    fill={config.stroke}
                    opacity={0.3}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}
        </svg>
    );
}

/**
 * MiniBarChart - Compact bar chart visualization
 */
interface MiniBarChartProps {
    data: { label: string; value: number; color?: string }[];
    maxValue?: number;
    showLabels?: boolean;
    height?: number;
    className?: string;
}

export function MiniBarChart({
    data,
    maxValue,
    showLabels = true,
    height = 60,
    className
}: MiniBarChartProps) {
    const max = maxValue ?? Math.max(...data.map(d => d.value));
    
    const defaultColors = ["#00d4ff", "#D4AF37", "#029A76", "#8B5CF6", "#f43f5e"];

    return (
        <div className={cn("flex items-end gap-1", className)} style={{ height }}>
            {data.map((item, index) => {
                const barHeight = (item.value / max) * 100;
                const barColor = item.color || defaultColors[index % defaultColors.length];
                
                return (
                    <div key={item.label} className="flex-1 flex flex-col items-center gap-1">
                        <motion.div
                            className="w-full rounded-t-sm relative overflow-hidden"
                            style={{ 
                                backgroundColor: barColor,
                                boxShadow: `0 0 10px ${barColor}40`
                            }}
                            initial={{ height: 0 }}
                            animate={{ height: `${barHeight}%` }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Shimmer effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent"
                                animate={{ y: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                            />
                        </motion.div>
                        {showLabels && (
                            <span className="text-[9px] text-gray-500 truncate max-w-full">
                                {item.label}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

/**
 * RadialProgress - Circular progress with segments
 */
interface RadialProgressProps {
    segments: { value: number; color: string; label: string }[];
    size?: number;
    strokeWidth?: number;
    className?: string;
}

export function RadialProgress({
    segments,
    size = 120,
    strokeWidth = 8,
    className
}: RadialProgressProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const total = segments.reduce((acc, seg) => acc + seg.value, 0);
    
    let accumulatedOffset = 0;

    return (
        <div className={cn("relative inline-flex items-center justify-center", className)}>
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                
                {/* Segments */}
                {segments.map((segment, index) => {
                    const segmentLength = (segment.value / total) * circumference;
                    const offset = accumulatedOffset;
                    accumulatedOffset += segmentLength;
                    
                    return (
                        <motion.circle
                            key={segment.label}
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            stroke={segment.color}
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${segmentLength} ${circumference}`}
                            strokeDashoffset={-offset}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.2 }}
                            style={{ filter: `drop-shadow(0 0 6px ${segment.color}50)` }}
                        />
                    );
                })}
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold font-mono text-white">{total}%</span>
                <span className="text-[10px] text-gray-500">Total</span>
            </div>
        </div>
    );
}

/**
 * DataFlowIndicator - Animated data flow visualization
 */
export function DataFlowIndicator({
    active = true,
    direction = "right",
    color = "cyan",
    className
}: {
    active?: boolean;
    direction?: "left" | "right" | "up" | "down";
    color?: "cyan" | "gold" | "emerald";
    className?: string;
}) {
    const colorMap = {
        cyan: "#00d4ff",
        gold: "#D4AF37",
        emerald: "#029A76"
    };

    const isHorizontal = direction === "left" || direction === "right";
    
    return (
        <div className={cn(
            "relative overflow-hidden",
            isHorizontal ? "h-1 w-20" : "w-1 h-20",
            className
        )}>
            <div 
                className="absolute inset-0 rounded-full" 
                style={{ backgroundColor: `${colorMap[color]}20` }}
            />
            
            {active && (
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        width: isHorizontal ? 20 : "100%",
                        height: isHorizontal ? "100%" : 20,
                        background: `linear-gradient(${
                            isHorizontal ? "90deg" : "180deg"
                        }, transparent, ${colorMap[color]}, transparent)`,
                        boxShadow: `0 0 10px ${colorMap[color]}`
                    }}
                    animate={{
                        [isHorizontal ? "x" : "y"]: direction === "right" || direction === "down" 
                            ? ["-100%", "200%"] 
                            : ["200%", "-100%"]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
            )}
        </div>
    );
}

/**
 * HeatmapCell - Individual cell for data heatmaps
 */
export function HeatmapGrid({
    data,
    rows,
    cols,
    colorScale = ["#1a1a2e", "#029A76", "#D4AF37", "#f43f5e"],
    className
}: {
    data: number[][];
    rows: string[];
    cols: string[];
    colorScale?: string[];
    className?: string;
}) {
    const maxValue = Math.max(...data.flat());
    const minValue = Math.min(...data.flat());
    const range = maxValue - minValue || 1;

    const getColor = (value: number) => {
        const normalizedValue = (value - minValue) / range;
        const index = Math.min(Math.floor(normalizedValue * (colorScale.length - 1)), colorScale.length - 2);
        const t = (normalizedValue * (colorScale.length - 1)) - index;
        
        // Simple interpolation between colors
        return colorScale[Math.round(normalizedValue * (colorScale.length - 1))];
    };

    return (
        <div className={cn("inline-block", className)}>
            {/* Column headers */}
            <div className="flex gap-1 mb-1 ml-12">
                {cols.map(col => (
                    <div key={col} className="w-8 text-[8px] text-gray-500 text-center truncate">
                        {col}
                    </div>
                ))}
            </div>
            
            {/* Grid */}
            {data.map((row, rowIndex) => (
                <div key={rows[rowIndex]} className="flex items-center gap-1 mb-1">
                    <div className="w-10 text-[8px] text-gray-500 text-right pr-2 truncate">
                        {rows[rowIndex]}
                    </div>
                    {row.map((value, colIndex) => (
                        <motion.div
                            key={`${rowIndex}-${colIndex}`}
                            className="w-8 h-8 rounded-sm flex items-center justify-center text-[8px] font-mono"
                            style={{ 
                                backgroundColor: getColor(value),
                                color: value > (maxValue - minValue) / 2 ? "white" : "gray"
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: (rowIndex * cols.length + colIndex) * 0.02 }}
                            whileHover={{ scale: 1.1, zIndex: 10 }}
                        >
                            {value}
                        </motion.div>
                    ))}
                </div>
            ))}
        </div>
    );
}

/**
 * MetricComparison - Side by side metric comparison
 */
export function MetricComparison({
    leftLabel,
    leftValue,
    rightLabel,
    rightValue,
    unit = "",
    className
}: {
    leftLabel: string;
    leftValue: number;
    rightLabel: string;
    rightValue: number;
    unit?: string;
    className?: string;
}) {
    const total = leftValue + rightValue;
    const leftPercent = (leftValue / total) * 100;
    const rightPercent = (rightValue / total) * 100;

    return (
        <div className={cn("space-y-2", className)}>
            <div className="flex justify-between text-xs text-gray-500">
                <span>{leftLabel}</span>
                <span>{rightLabel}</span>
            </div>
            
            <div className="flex justify-between text-sm font-mono">
                <span className="text-cyber-cyan">{leftValue}{unit}</span>
                <span className="text-sgif-gold">{rightValue}{unit}</span>
            </div>
            
            <div className="h-2 bg-white/10 rounded-full overflow-hidden flex">
                <motion.div
                    className="bg-gradient-to-r from-cyber-cyan to-cyber-cyan/50 rounded-l-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${leftPercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <motion.div
                    className="bg-gradient-to-r from-sgif-gold/50 to-sgif-gold rounded-r-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${rightPercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                />
            </div>
            
            <div className="flex justify-between text-[10px] text-gray-600">
                <span>{leftPercent.toFixed(1)}%</span>
                <span>{rightPercent.toFixed(1)}%</span>
            </div>
        </div>
    );
}
