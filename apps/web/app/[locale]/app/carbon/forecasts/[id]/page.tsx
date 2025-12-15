"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { cn } from "@sgif/ui";
import { Button } from "@sgif/ui";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Leaf,
    TrendingUp,
    TrendingDown,
    Calendar,
    Download,
    Share2,
    BarChart3,
    LineChart,
    Target,
    AlertCircle,
    CheckCircle2,
    Clock,
    Zap,
    Globe,
    Droplets,
    Wind,
    Sun
} from "lucide-react";
import { Link } from "@/navigation";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend,
} from "recharts";

// Mock forecast data
const forecastData = {
    id: "forecast-001",
    projectName: "NEOM Solar Phase I",
    projectType: "Solar PV",
    lastUpdated: "Dec 10, 2024",
    status: "on-track",
    confidence: 92,
    totalCredits: 1250000,
    creditsGenerated: 485000,
    creditsRemaining: 765000,
    vintageYear: 2024,
    methodology: "ACM0002",
    registry: "Verra VCS",
    baselineEmissions: 2500000,
    projectEmissions: 125000,
    leakage: 25000,
};

const monthlyForecast = [
    { month: "Jan", actual: 42000, forecast: 40000, baseline: 45000 },
    { month: "Feb", actual: 38000, forecast: 38000, baseline: 42000 },
    { month: "Mar", actual: 45000, forecast: 42000, baseline: 48000 },
    { month: "Apr", actual: 52000, forecast: 50000, baseline: 55000 },
    { month: "May", actual: 58000, forecast: 55000, baseline: 60000 },
    { month: "Jun", actual: 65000, forecast: 62000, baseline: 68000 },
    { month: "Jul", actual: 68000, forecast: 65000, baseline: 72000 },
    { month: "Aug", actual: 62000, forecast: 60000, baseline: 65000 },
    { month: "Sep", actual: 55000, forecast: 52000, baseline: 58000 },
    { month: "Oct", actual: null, forecast: 48000, baseline: 52000 },
    { month: "Nov", actual: null, forecast: 44000, baseline: 48000 },
    { month: "Dec", actual: null, forecast: 42000, baseline: 45000 },
];

const yearlyProjection = [
    { year: 2024, credits: 485000, target: 450000 },
    { year: 2025, credits: 520000, target: 500000 },
    { year: 2026, credits: 545000, target: 525000 },
    { year: 2027, credits: 510000, target: 500000 },
    { year: 2028, credits: 480000, target: 475000 },
];

const scenarioAnalysis = [
    { scenario: "Conservative", probability: 15, credits: 1050000, irr: 11.2 },
    { scenario: "Base Case", probability: 60, credits: 1250000, irr: 14.2 },
    { scenario: "Optimistic", probability: 25, credits: 1450000, irr: 17.8 },
];

const riskFactors = [
    { factor: "Weather Variability", impact: "Medium", mitigation: "Historical data analysis, seasonal adjustments" },
    { factor: "Grid Curtailment", impact: "Low", mitigation: "PPA terms, grid upgrade commitments" },
    { factor: "Regulatory Changes", impact: "Low", mitigation: "Policy monitoring, diversified registry" },
    { factor: "Equipment Performance", impact: "Medium", mitigation: "O&M contracts, performance guarantees" },
];

export default function CarbonForecastDetailPage() {
    const params = useParams();
    const [selectedView, setSelectedView] = useState<"monthly" | "yearly">("monthly");

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-card p-3 border border-white/10">
                    <p className="text-sm font-medium text-white mb-2">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                            <div 
                                className="w-2 h-2 rounded-full" 
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-gray-400">{entry.name}:</span>
                            <span className="text-white font-mono">{entry.value?.toLocaleString()} tCO₂</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                    <Link 
                        href="/app/carbon"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Carbon
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-sgif-emerald/10 border border-sgif-emerald/20">
                            <Leaf className="h-6 w-6 text-sgif-emerald" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">{forecastData.projectName}</h1>
                            <p className="text-gray-400">Carbon Credit Forecast</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="border-white/10 gap-2">
                        <Share2 className="h-4 w-4" />
                        Share
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/10 gap-2">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Status Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sgif-emerald to-transparent" />
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Status</p>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-sgif-emerald" />
                            <span className="text-sgif-emerald font-medium">On Track</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Confidence</p>
                        <p className="text-xl font-bold text-white">{forecastData.confidence}%</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Total Forecast</p>
                        <p className="text-xl font-bold text-cyber-cyan font-mono">{forecastData.totalCredits.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Generated YTD</p>
                        <p className="text-xl font-bold text-sgif-gold font-mono">{forecastData.creditsGenerated.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Methodology</p>
                        <p className="text-white">{forecastData.methodology}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Registry</p>
                        <p className="text-white">{forecastData.registry}</p>
                    </div>
                </div>
            </motion.div>

            {/* Forecast Chart */}
            <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">Credit Generation Forecast</h2>
                    <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
                        <button
                            onClick={() => setSelectedView("monthly")}
                            className={cn(
                                "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                                selectedView === "monthly"
                                    ? "bg-white/10 text-white"
                                    : "text-gray-400 hover:text-white"
                            )}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setSelectedView("yearly")}
                            className={cn(
                                "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                                selectedView === "yearly"
                                    ? "bg-white/10 text-white"
                                    : "text-gray-400 hover:text-white"
                            )}
                        >
                            Yearly
                        </button>
                    </div>
                </div>

                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        {selectedView === "monthly" ? (
                            <AreaChart data={monthlyForecast}>
                                <defs>
                                    <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                                <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(v) => `${v/1000}k`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="actual"
                                    stroke="#10B981"
                                    fill="url(#actualGradient)"
                                    strokeWidth={2}
                                    name="Actual"
                                    connectNulls={false}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="forecast"
                                    stroke="#06B6D4"
                                    fill="url(#forecastGradient)"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    name="Forecast"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="baseline"
                                    stroke="#6B7280"
                                    fill="none"
                                    strokeWidth={1}
                                    strokeDasharray="3 3"
                                    name="Baseline"
                                />
                            </AreaChart>
                        ) : (
                            <BarChart data={yearlyProjection}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="year" stroke="#6B7280" fontSize={12} />
                                <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(v) => `${v/1000}k`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar dataKey="credits" fill="#10B981" name="Projected Credits" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="target" fill="#06B6D4" name="Target" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Scenario Analysis & Risk Factors */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Scenario Analysis */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold text-white mb-6">Scenario Analysis</h2>
                    <div className="space-y-4">
                        {scenarioAnalysis.map((scenario, i) => (
                            <div 
                                key={scenario.scenario}
                                className={cn(
                                    "p-4 rounded-lg border transition-all",
                                    scenario.scenario === "Base Case"
                                        ? "bg-sgif-emerald/5 border-sgif-emerald/20"
                                        : "bg-white/[0.02] border-white/5"
                                )}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-medium text-white">{scenario.scenario}</span>
                                    <span className={cn(
                                        "text-sm px-2 py-0.5 rounded-full",
                                        scenario.scenario === "Base Case"
                                            ? "bg-sgif-emerald/10 text-sgif-emerald"
                                            : "bg-white/5 text-gray-400"
                                    )}>
                                        {scenario.probability}% probability
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Total Credits</p>
                                        <p className="font-mono text-white">{scenario.credits.toLocaleString()} tCO₂</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Expected IRR</p>
                                        <p className="font-mono text-cyber-cyan">{scenario.irr}%</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Risk Factors */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold text-white mb-6">Risk Factors</h2>
                    <div className="space-y-3">
                        {riskFactors.map((risk, i) => (
                            <div 
                                key={risk.factor}
                                className="p-4 rounded-lg bg-white/[0.02] border border-white/5"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-white">{risk.factor}</span>
                                    <span className={cn(
                                        "text-xs px-2 py-0.5 rounded-full",
                                        risk.impact === "High" 
                                            ? "bg-red-500/10 text-red-400" 
                                            : risk.impact === "Medium"
                                            ? "bg-sgif-gold/10 text-sgif-gold"
                                            : "bg-sgif-emerald/10 text-sgif-emerald"
                                    )}>
                                        {risk.impact} Impact
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400">{risk.mitigation}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Emission Breakdown */}
            <div className="glass-card p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Emission Reduction Breakdown</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Baseline Emissions</p>
                        <p className="text-2xl font-bold font-mono text-gray-400">{(forecastData.baselineEmissions / 1000000).toFixed(2)}M</p>
                        <p className="text-xs text-gray-600 mt-1">tCO₂e/year</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Project Emissions</p>
                        <p className="text-2xl font-bold font-mono text-sgif-gold">{(forecastData.projectEmissions / 1000).toFixed(0)}K</p>
                        <p className="text-xs text-gray-600 mt-1">tCO₂e/year</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Leakage</p>
                        <p className="text-2xl font-bold font-mono text-red-400">{(forecastData.leakage / 1000).toFixed(0)}K</p>
                        <p className="text-xs text-gray-600 mt-1">tCO₂e/year</p>
                    </div>
                    <div className="p-4 rounded-lg bg-sgif-emerald/5 border border-sgif-emerald/20 text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Net Reduction</p>
                        <p className="text-2xl font-bold font-mono text-sgif-emerald">
                            {((forecastData.baselineEmissions - forecastData.projectEmissions - forecastData.leakage) / 1000000).toFixed(2)}M
                        </p>
                        <p className="text-xs text-gray-600 mt-1">tCO₂e/year</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
