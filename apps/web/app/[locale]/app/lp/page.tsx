"use client";

import { useState } from "react";
import { cn } from "@sgif/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    PieChart,
    FileText,
    Download,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Building2,
    Leaf,
    Clock,
    ChevronRight,
    Filter,
    BarChart3,
    Wallet,
    Target
} from "lucide-react";
import { Button } from "@sgif/ui";

interface PerformanceMetric {
    label: string;
    value: string;
    change: number;
    changeLabel: string;
    icon: React.ElementType;
    color: string;
}

const performanceMetrics: PerformanceMetric[] = [
    { label: "Net Asset Value", value: "$127.4M", change: 8.2, changeLabel: "vs. last quarter", icon: DollarSign, color: "cyber-cyan" },
    { label: "Net IRR", value: "14.2%", change: 1.4, changeLabel: "vs. target", icon: TrendingUp, color: "sgif-emerald" },
    { label: "TVPI", value: "1.32x", change: 0.08, changeLabel: "vs. last quarter", icon: Target, color: "sgif-gold" },
    { label: "DPI", value: "0.45x", change: 0.12, changeLabel: "vs. last quarter", icon: Wallet, color: "purple-400" },
];

interface Distribution {
    id: string;
    date: string;
    type: "capital_return" | "dividend" | "interest";
    amount: number;
    status: "paid" | "pending" | "scheduled";
}

const distributions: Distribution[] = [
    { id: "1", date: "Dec 15, 2024", type: "dividend", amount: 2450000, status: "scheduled" },
    { id: "2", date: "Sep 30, 2024", type: "capital_return", amount: 5200000, status: "paid" },
    { id: "3", date: "Jun 30, 2024", type: "dividend", amount: 1800000, status: "paid" },
    { id: "4", date: "Mar 31, 2024", type: "dividend", amount: 1650000, status: "paid" },
];

interface Document {
    id: string;
    name: string;
    type: string;
    date: string;
    size: string;
}

const documents: Document[] = [
    { id: "1", name: "Q3 2024 LP Report", type: "Quarterly Report", date: "Oct 15, 2024", size: "4.2 MB" },
    { id: "2", name: "Capital Call Notice #8", type: "Capital Call", date: "Sep 1, 2024", size: "156 KB" },
    { id: "3", name: "Annual Audited Financials 2023", type: "Financial Statement", date: "Mar 15, 2024", size: "8.7 MB" },
    { id: "4", name: "ESG Impact Report 2023", type: "ESG Report", date: "Feb 28, 2024", size: "12.3 MB" },
];

interface Investment {
    id: string;
    name: string;
    sector: string;
    invested: number;
    currentValue: number;
    irr: number;
    status: "active" | "realized" | "written-off";
}

const investments: Investment[] = [
    { id: "1", name: "NEOM Solar Phase I", sector: "Renewable Energy", invested: 45000000, currentValue: 58500000, irr: 18.2, status: "active" },
    { id: "2", name: "Dubai Green Hydrogen", sector: "Green Hydrogen", invested: 32000000, currentValue: 38400000, irr: 15.8, status: "active" },
    { id: "3", name: "Qatar Wind Farm", sector: "Wind Energy", invested: 28000000, currentValue: 31920000, irr: 12.4, status: "active" },
    { id: "4", name: "Abu Dhabi Desalination", sector: "Water", invested: 22500000, currentValue: 27000000, irr: 14.1, status: "active" },
];

const distributionTypeConfig = {
    capital_return: { label: "Capital Return", color: "sgif-gold" },
    dividend: { label: "Dividend", color: "sgif-emerald" },
    interest: { label: "Interest", color: "cyber-cyan" },
};

const statusConfig = {
    paid: { label: "Paid", color: "sgif-emerald" },
    pending: { label: "Pending", color: "sgif-gold" },
    scheduled: { label: "Scheduled", color: "cyber-cyan" },
};

export default function LPDashboardPage() {
    const [selectedPeriod, setSelectedPeriod] = useState<"ytd" | "1y" | "3y" | "inception">("ytd");

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">LP Dashboard</h1>
                    <p className="text-gray-400 mt-1">Your investment overview and performance metrics</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
                        {(["ytd", "1y", "3y", "inception"] as const).map(period => (
                            <button
                                key={period}
                                onClick={() => setSelectedPeriod(period)}
                                className={cn(
                                    "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                                    selectedPeriod === period
                                        ? "bg-white/10 text-white"
                                        : "text-gray-400 hover:text-white"
                                )}
                            >
                                {period.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <Button variant="outline" size="sm" className="border-white/10 gap-2">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {performanceMetrics.map((metric, i) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass-card p-6 relative overflow-hidden group hover:border-white/20 transition-all"
                    >
                        <div className={cn(
                            "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity",
                            `via-${metric.color}`
                        )} />
                        
                        <div className="flex items-start justify-between mb-4">
                            <div className={cn(
                                "p-2 rounded-lg border",
                                `bg-${metric.color}/10 border-${metric.color}/20`
                            )}>
                                <metric.icon className={cn("h-5 w-5", `text-${metric.color}`)} />
                            </div>
                            <div className={cn(
                                "flex items-center gap-1 text-sm",
                                metric.change >= 0 ? "text-sgif-emerald" : "text-red-400"
                            )}>
                                {metric.change >= 0 ? (
                                    <ArrowUpRight className="h-4 w-4" />
                                ) : (
                                    <ArrowDownRight className="h-4 w-4" />
                                )}
                                {Math.abs(metric.change)}%
                            </div>
                        </div>
                        
                        <p className="text-sm text-gray-500 mb-1">{metric.label}</p>
                        <p className={cn("text-3xl font-bold font-mono", `text-${metric.color}`)}>
                            {metric.value}
                        </p>
                        <p className="text-xs text-gray-600 mt-2">{metric.changeLabel}</p>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Portfolio Composition */}
                <div className="lg:col-span-2 glass-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-white">Portfolio Investments</h2>
                        <Button variant="ghost" size="sm" className="text-gray-400 gap-1">
                            View All <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                    
                    <div className="space-y-3">
                        {investments.map((investment, i) => {
                            const gain = ((investment.currentValue - investment.invested) / investment.invested) * 100;
                            
                            return (
                                <motion.div
                                    key={investment.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 rounded-lg bg-sgif-emerald/10 border border-sgif-emerald/20">
                                                <Leaf className="h-5 w-5 text-sgif-emerald" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{investment.name}</p>
                                                <p className="text-sm text-gray-500">{investment.sector}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-mono text-white">{formatCurrency(investment.currentValue)}</p>
                                            <div className="flex items-center gap-2 justify-end">
                                                <span className={cn(
                                                    "text-sm",
                                                    gain >= 0 ? "text-sgif-emerald" : "text-red-400"
                                                )}>
                                                    {gain >= 0 ? "+" : ""}{gain.toFixed(1)}%
                                                </span>
                                                <span className="text-xs text-gray-600">|</span>
                                                <span className="text-sm text-cyber-cyan">{investment.irr}% IRR</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Progress bar */}
                                    <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
                                        <div 
                                            className="h-full rounded-full bg-gradient-to-r from-sgif-emerald to-cyber-cyan"
                                            style={{ width: `${(investment.currentValue / investment.invested) * 50}%` }}
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Upcoming Distributions */}
                    <div className="glass-card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white">Distributions</h2>
                            <Calendar className="h-5 w-5 text-gray-500" />
                        </div>
                        
                        <div className="space-y-3">
                            {distributions.slice(0, 4).map(dist => {
                                const typeConfig = distributionTypeConfig[dist.type];
                                const status = statusConfig[dist.status];
                                
                                return (
                                    <div 
                                        key={dist.id}
                                        className="p-3 rounded-lg bg-white/[0.02] border border-white/5"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className={cn(
                                                "text-xs px-2 py-0.5 rounded-full border",
                                                `bg-${typeConfig.color}/10 text-${typeConfig.color} border-${typeConfig.color}/20`
                                            )}>
                                                {typeConfig.label}
                                            </span>
                                            <span className={cn(
                                                "text-xs",
                                                `text-${status.color}`
                                            )}>
                                                {status.label}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-400">{dist.date}</span>
                                            <span className="font-mono text-white">{formatCurrency(dist.amount)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-white/5">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Total Distributed (YTD)</span>
                                <span className="font-mono text-sgif-gold">$11.1M</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Documents */}
                    <div className="glass-card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white">Documents</h2>
                            <FileText className="h-5 w-5 text-gray-500" />
                        </div>
                        
                        <div className="space-y-2">
                            {documents.slice(0, 4).map(doc => (
                                <div 
                                    key={doc.id}
                                    className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate group-hover:text-cyber-cyan transition-colors">
                                                {doc.name}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {doc.type} • {doc.date}
                                            </p>
                                        </div>
                                        <Download className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors flex-shrink-0 ml-2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <Button variant="ghost" size="sm" className="w-full mt-4 text-gray-400 gap-1">
                            View All Documents <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Capital Account Summary */}
            <div className="glass-card p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Capital Account Summary</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[
                        { label: "Commitment", value: "$100.0M", color: "white" },
                        { label: "Called Capital", value: "$82.5M", color: "cyber-cyan" },
                        { label: "Uncalled", value: "$17.5M", color: "gray-400" },
                        { label: "Distributions", value: "$37.1M", color: "sgif-gold" },
                        { label: "Net Funded", value: "$45.4M", color: "sgif-emerald" },
                        { label: "Remaining Value", value: "$90.3M", color: "purple-400" },
                    ].map((item, i) => (
                        <div key={i} className="p-4 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{item.label}</p>
                            <p className={cn("text-xl font-bold font-mono", `text-${item.color}`)}>{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
