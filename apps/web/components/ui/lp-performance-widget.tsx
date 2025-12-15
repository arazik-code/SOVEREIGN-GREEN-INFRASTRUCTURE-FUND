"use client";

import * as React from "react";
import { cn } from "@sgif/ui";
import { motion } from "framer-motion";
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Percent,
    Calendar,
    PieChart,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    Clock,
    FileText
} from "lucide-react";

export interface LPPerformanceData {
    totalCommitment: string;
    contributedCapital: string;
    unfundedCommitment: string;
    currentNav: string;
    distributions: string;
    totalValue: string;
    tvpi: number;
    dpi: number;
    irr: number;
    irrTrend: 'up' | 'down' | 'stable';
    quarterlyPerformance: Array<{
        quarter: string;
        nav: number;
        distributions: number;
    }>;
    upcomingCapitalCalls?: Array<{
        date: string;
        amount: string;
        status: 'scheduled' | 'pending';
    }>;
}

interface LPPerformanceWidgetProps {
    data: LPPerformanceData;
    investorName?: string;
    className?: string;
}

export function LPPerformanceWidget({ data, investorName, className }: LPPerformanceWidgetProps) {
    return (
        <div className={cn("space-y-6", className)}>
            {/* Header */}
            {investorName && (
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white">{investorName}</h2>
                        <p className="text-sm text-gray-500">Investment Performance Summary</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        As of {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                </div>
            )}

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    label="Total Commitment"
                    value={data.totalCommitment}
                    icon={Wallet}
                    color="cyan"
                />
                <MetricCard
                    label="Current NAV"
                    value={data.currentNav}
                    icon={DollarSign}
                    color="gold"
                    highlight
                />
                <MetricCard
                    label="Total Distributions"
                    value={data.distributions}
                    icon={TrendingUp}
                    color="emerald"
                />
                <MetricCard
                    label="Total Value"
                    value={data.totalValue}
                    icon={PieChart}
                    color="purple"
                />
            </div>

            {/* Performance Ratios */}
            <div className="glass-card p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sgif-gold to-transparent" />
                
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-sgif-gold" />
                    Performance Ratios
                </h3>

                <div className="grid grid-cols-3 gap-6">
                    <RatioCard
                        label="TVPI"
                        value={data.tvpi}
                        suffix="x"
                        description="Total Value to Paid-In"
                        benchmark={1.5}
                    />
                    <RatioCard
                        label="DPI"
                        value={data.dpi}
                        suffix="x"
                        description="Distributions to Paid-In"
                        benchmark={1.0}
                    />
                    <RatioCard
                        label="Net IRR"
                        value={data.irr}
                        suffix="%"
                        description="Internal Rate of Return"
                        benchmark={12}
                        trend={data.irrTrend}
                    />
                </div>
            </div>

            {/* Capital Account Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent" />
                    
                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-cyber-cyan" />
                        Capital Account
                    </h3>

                    <div className="space-y-4">
                        <AccountRow 
                            label="Total Commitment" 
                            value={data.totalCommitment}
                            color="white"
                        />
                        <AccountRow 
                            label="Contributed Capital" 
                            value={data.contributedCapital}
                            color="emerald"
                        />
                        <AccountRow 
                            label="Unfunded Commitment" 
                            value={data.unfundedCommitment}
                            color="gold"
                        />
                        <div className="border-t border-white/5 pt-4 mt-4">
                            <AccountRow 
                                label="Current NAV" 
                                value={data.currentNav}
                                color="cyan"
                                large
                            />
                        </div>
                    </div>
                </div>

                {/* Upcoming Capital Calls */}
                <div className="glass-card p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sgif-gold to-transparent" />
                    
                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-sgif-gold" />
                        Upcoming Capital Calls
                    </h3>

                    {data.upcomingCapitalCalls && data.upcomingCapitalCalls.length > 0 ? (
                        <div className="space-y-3">
                            {data.upcomingCapitalCalls.map((call, index) => (
                                <div 
                                    key={index}
                                    className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-2 h-2 rounded-full",
                                            call.status === 'scheduled' ? "bg-sgif-gold" : "bg-cyber-cyan"
                                        )} />
                                        <div>
                                            <p className="text-sm text-white">{call.date}</p>
                                            <p className="text-xs text-gray-500 capitalize">{call.status}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-mono text-sgif-gold">{call.amount}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <Calendar className="h-10 w-10 mx-auto mb-3 opacity-50" />
                            <p className="text-sm">No upcoming capital calls</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Quarterly Performance */}
            <div className="glass-card p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sgif-emerald to-transparent" />
                
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-sgif-emerald" />
                    Quarterly Performance
                </h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-gray-500 text-xs uppercase tracking-wider">
                                <th className="text-left p-3">Quarter</th>
                                <th className="text-right p-3">NAV</th>
                                <th className="text-right p-3">Distributions</th>
                                <th className="text-right p-3">Total Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.quarterlyPerformance.map((quarter, index) => (
                                <tr 
                                    key={index}
                                    className="border-t border-white/5 hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="p-3 text-white font-medium">{quarter.quarter}</td>
                                    <td className="p-3 text-right font-mono text-gray-300">
                                        ${(quarter.nav / 1000000).toFixed(2)}M
                                    </td>
                                    <td className="p-3 text-right font-mono text-sgif-emerald">
                                        ${(quarter.distributions / 1000000).toFixed(2)}M
                                    </td>
                                    <td className="p-3 text-right font-mono text-sgif-gold">
                                        ${((quarter.nav + quarter.distributions) / 1000000).toFixed(2)}M
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

interface MetricCardProps {
    label: string;
    value: string;
    icon: React.ElementType;
    color: 'cyan' | 'gold' | 'emerald' | 'purple';
    highlight?: boolean;
}

function MetricCard({ label, value, icon: Icon, color, highlight }: MetricCardProps) {
    const colorClasses = {
        cyan: 'text-cyber-cyan bg-cyber-cyan/10 border-cyber-cyan/20',
        gold: 'text-sgif-gold bg-sgif-gold/10 border-sgif-gold/20',
        emerald: 'text-sgif-emerald bg-sgif-emerald/10 border-sgif-emerald/20',
        purple: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    };

    const valueColors = {
        cyan: 'text-cyber-cyan',
        gold: 'text-sgif-gold',
        emerald: 'text-sgif-emerald',
        purple: 'text-purple-400',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "glass-card p-5 relative overflow-hidden group",
                highlight && "border-sgif-gold/20"
            )}
        >
            {highlight && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sgif-gold to-transparent" />
            )}
            
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
                <div className={cn("p-1.5 rounded-lg border", colorClasses[color])}>
                    <Icon className="h-4 w-4" />
                </div>
            </div>
            
            <span className={cn(
                "text-2xl font-bold font-mono",
                valueColors[color]
            )}>
                {value}
            </span>
        </motion.div>
    );
}

interface RatioCardProps {
    label: string;
    value: number;
    suffix: string;
    description: string;
    benchmark: number;
    trend?: 'up' | 'down' | 'stable';
}

function RatioCard({ label, value, suffix, description, benchmark, trend }: RatioCardProps) {
    const isAboveBenchmark = value >= benchmark;
    
    return (
        <div className="text-center p-4 rounded-lg bg-white/[0.02] border border-white/5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{label}</p>
            <div className="flex items-center justify-center gap-2">
                <span className={cn(
                    "text-3xl font-bold font-mono",
                    isAboveBenchmark ? "text-sgif-emerald" : "text-sgif-gold"
                )}>
                    {value.toFixed(2)}{suffix}
                </span>
                {trend && (
                    <span className={cn(
                        "p-1 rounded",
                        trend === 'up' && "bg-sgif-emerald/10",
                        trend === 'down' && "bg-red-500/10",
                        trend === 'stable' && "bg-gray-500/10"
                    )}>
                        {trend === 'up' && <ArrowUpRight className="h-4 w-4 text-sgif-emerald" />}
                        {trend === 'down' && <ArrowDownRight className="h-4 w-4 text-red-400" />}
                        {trend === 'stable' && <Activity className="h-4 w-4 text-gray-400" />}
                    </span>
                )}
            </div>
            <p className="text-xs text-gray-600 mt-2">{description}</p>
            <p className="text-xs text-gray-500 mt-1">
                Benchmark: {benchmark}{suffix}
            </p>
        </div>
    );
}

interface AccountRowProps {
    label: string;
    value: string;
    color: 'white' | 'cyan' | 'gold' | 'emerald';
    large?: boolean;
}

function AccountRow({ label, value, color, large }: AccountRowProps) {
    const colorClasses = {
        white: 'text-white',
        cyan: 'text-cyber-cyan',
        gold: 'text-sgif-gold',
        emerald: 'text-sgif-emerald',
    };

    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{label}</span>
            <span className={cn(
                "font-mono font-bold",
                large ? "text-xl" : "text-sm",
                colorClasses[color]
            )}>
                {value}
            </span>
        </div>
    );
}
