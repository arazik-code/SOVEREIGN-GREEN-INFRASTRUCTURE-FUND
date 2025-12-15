"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
    CartesianGrid, Tooltip, ReferenceLine, ComposedChart,
    Bar, Line
} from "recharts";
import { cn } from "@sgif/ui";
import { TrendingUp, TrendingDown, Activity, Zap, Target, DollarSign } from "lucide-react";

const data = [
    { name: 'Jan', value: 400, projected: 380, target: 420, volume: 120 },
    { name: 'Feb', value: 300, projected: 350, target: 420, volume: 95 },
    { name: 'Mar', value: 500, projected: 480, target: 450, volume: 180 },
    { name: 'Apr', value: 280, projected: 320, target: 450, volume: 85 },
    { name: 'May', value: 590, projected: 550, target: 500, volume: 210 },
    { name: 'Jun', value: 350, projected: 400, target: 500, volume: 130 },
    { name: 'Jul', value: 600, projected: 580, target: 550, volume: 195 },
    { name: 'Aug', value: 680, projected: 650, target: 580, volume: 240 },
];

interface FinancialChartProps {
    showVolume?: boolean;
    showTarget?: boolean;
    interactive?: boolean;
    className?: string;
}

export function FinancialChart({ 
    showVolume = false, 
    showTarget = true,
    interactive = true,
    className 
}: FinancialChartProps) {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const [chartType, setChartType] = React.useState<'area' | 'composed'>('area');

    // Calculate stats
    const latestValue = data[data.length - 1].value;
    const previousValue = data[data.length - 2].value;
    const change = ((latestValue - previousValue) / previousValue) * 100;
    const isPositive = change >= 0;

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-4 border border-white/10 backdrop-blur-xl min-w-[200px]"
                >
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-500 font-mono">{label} 2024</span>
                        <Activity className="w-3 h-3 text-cyber-cyan" />
                    </div>
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center justify-between py-1">
                            <div className="flex items-center gap-2">
                                <div 
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: entry.color }}
                                />
                                <span className="text-xs text-gray-400 capitalize">
                                    {entry.dataKey}
                                </span>
                            </div>
                            <span className="text-sm font-mono font-semibold" style={{ color: entry.color }}>
                                ${entry.value}M
                            </span>
                        </div>
                    ))}
                    {showVolume && payload.find((p: any) => p.dataKey === 'volume') && (
                        <div className="mt-2 pt-2 border-t border-white/10">
                            <span className="text-[10px] text-gray-600">Trading Volume</span>
                        </div>
                    )}
                </motion.div>
            );
        }
        return null;
    };

    return (
        <div className={cn("relative", className)}>
            {/* Chart header with stats */}
            {interactive && (
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-sgif-gold" />
                            <div>
                                <div className="text-2xl font-bold font-mono text-white">
                                    ${latestValue}M
                                </div>
                                <div className={cn(
                                    "text-xs flex items-center gap-1",
                                    isPositive ? "text-sgif-emerald" : "text-red-400"
                                )}>
                                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                    {isPositive ? "+" : ""}{change.toFixed(1)}% from last month
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Chart type toggle */}
                    <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
                        {(['area', 'composed'] as const).map((type) => (
                            <button
                                key={type}
                                onClick={() => setChartType(type)}
                                className={cn(
                                    "px-3 py-1 text-xs rounded-md transition-all capitalize",
                                    chartType === type 
                                        ? "bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30"
                                        : "text-gray-500 hover:text-white"
                                )}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Legend */}
            <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-sgif-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                    <span className="text-xs text-gray-400">Actual</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-sgif-emerald" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #029A76, #029A76 4px, transparent 4px, transparent 8px)' }} />
                    <span className="text-xs text-gray-400">Projected</span>
                </div>
                {showTarget && (
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-0.5 bg-purple-500" />
                        <span className="text-xs text-gray-400">Target</span>
                    </div>
                )}
            </div>

            <div className="h-[280px] w-full relative">
                {/* Futuristic grid overlay */}
                <div 
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(212, 175, 55, 0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }}
                />
                
                {/* Animated scan line */}
                <motion.div
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent pointer-events-none"
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                
                <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'area' ? (
                        <AreaChart 
                            data={data}
                            onMouseMove={(e: any) => {
                                if (e?.activeTooltipIndex !== undefined) {
                                    setActiveIndex(e.activeTooltipIndex);
                                }
                            }}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            <defs>
                                {/* Primary gradient - Gold */}
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.6} />
                                    <stop offset="50%" stopColor="#D4AF37" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                                </linearGradient>
                                {/* Secondary gradient - Emerald */}
                                <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#029A76" stopOpacity={0.4} />
                                    <stop offset="50%" stopColor="#029A76" stopOpacity={0.1} />
                                    <stop offset="100%" stopColor="#029A76" stopOpacity={0} />
                                </linearGradient>
                                {/* Glow filter */}
                                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                    <feMerge>
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            <CartesianGrid 
                                strokeDasharray="3 3" 
                                opacity={0.1} 
                                vertical={false} 
                                stroke="rgba(255,255,255,0.05)"
                            />
                            <XAxis 
                                dataKey="name" 
                                stroke="#4b5563" 
                                fontSize={11} 
                                tickLine={false} 
                                axisLine={false}
                                tick={{ fill: '#6b7280' }}
                            />
                            <YAxis 
                                stroke="#4b5563" 
                                fontSize={11} 
                                tickLine={false} 
                                axisLine={false} 
                                tickFormatter={(value) => `$${value}M`}
                                tick={{ fill: '#6b7280' }}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={false} />
                            
                            {showTarget && (
                                <Area 
                                    type="monotone" 
                                    dataKey="target" 
                                    stroke="#8B5CF6" 
                                    strokeWidth={1}
                                    strokeDasharray="8 4"
                                    fillOpacity={0} 
                                    fill="transparent"
                                />
                            )}
                            <Area 
                                type="monotone" 
                                dataKey="projected" 
                                stroke="#029A76" 
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                fillOpacity={1} 
                                fill="url(#colorProjected)" 
                            />
                            <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#D4AF37" 
                                strokeWidth={2.5}
                                fillOpacity={1} 
                                fill="url(#colorValue)"
                                filter="url(#glow)"
                                activeDot={{
                                    r: 6,
                                    fill: "#D4AF37",
                                    stroke: "#000",
                                    strokeWidth: 2,
                                    filter: "url(#glow)"
                                }}
                            />
                        </AreaChart>
                    ) : (
                        <ComposedChart data={data}>
                            <defs>
                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="#D4AF37" stopOpacity={0.3} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid 
                                strokeDasharray="3 3" 
                                opacity={0.1} 
                                vertical={false}
                            />
                            <XAxis 
                                dataKey="name" 
                                fontSize={11} 
                                tickLine={false} 
                                axisLine={false}
                                tick={{ fill: '#6b7280' }}
                            />
                            <YAxis 
                                yAxisId="left"
                                fontSize={11} 
                                tickLine={false} 
                                axisLine={false} 
                                tickFormatter={(value) => `$${value}M`}
                                tick={{ fill: '#6b7280' }}
                            />
                            <YAxis 
                                yAxisId="right"
                                orientation="right"
                                fontSize={11} 
                                tickLine={false} 
                                axisLine={false}
                                tick={{ fill: '#6b7280' }}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={false} />
                            
                            <Bar 
                                yAxisId="right"
                                dataKey="volume" 
                                fill="url(#barGradient)"
                                radius={[4, 4, 0, 0]}
                                opacity={0.5}
                            />
                            <Line 
                                yAxisId="left"
                                type="monotone" 
                                dataKey="projected" 
                                stroke="#029A76" 
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                dot={false}
                            />
                            <Line 
                                yAxisId="left"
                                type="monotone" 
                                dataKey="value" 
                                stroke="#D4AF37" 
                                strokeWidth={3}
                                dot={{ fill: "#D4AF37", r: 4 }}
                                activeDot={{ r: 6, fill: "#D4AF37" }}
                            />
                        </ComposedChart>
                    )}
                </ResponsiveContainer>
            </div>

            {/* Quick stats footer */}
            <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-white/5">
                {[
                    { label: "High", value: "$680M", color: "text-sgif-emerald" },
                    { label: "Low", value: "$280M", color: "text-red-400" },
                    { label: "Avg", value: "$463M", color: "text-sgif-gold" },
                    { label: "Vol", value: "156K", color: "text-cyber-cyan" },
                ].map((stat) => (
                    <div key={stat.label} className="text-center">
                        <div className={cn("text-sm font-mono font-semibold", stat.color)}>
                            {stat.value}
                        </div>
                        <div className="text-[10px] text-gray-600 uppercase">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
