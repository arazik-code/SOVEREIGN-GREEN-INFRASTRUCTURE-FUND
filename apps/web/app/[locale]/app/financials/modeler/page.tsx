"use client";

import { useState, useCallback } from "react";
import { cn } from "@sgif/ui";
import { Button } from "@sgif/ui";
import { motion } from "framer-motion";
import {
    Calculator,
    TrendingUp,
    DollarSign,
    Percent,
    Calendar,
    Download,
    Save,
    RefreshCw,
    Settings2,
    ChevronDown,
    ChevronUp,
    Info,
    AlertTriangle,
    Zap,
    Target,
    BarChart3,
    LineChart,
    PieChart as PieChartIcon
} from "lucide-react";
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
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

interface ModelInput {
    id: string;
    label: string;
    value: number;
    unit: string;
    min: number;
    max: number;
    step: number;
    category: "capital" | "operations" | "revenue" | "exit";
}

const defaultInputs: ModelInput[] = [
    // Capital
    { id: "equity", label: "Equity Investment", value: 50, unit: "$M", min: 10, max: 200, step: 5, category: "capital" },
    { id: "debt", label: "Debt Financing", value: 50, unit: "$M", min: 0, max: 200, step: 5, category: "capital" },
    { id: "interestRate", label: "Interest Rate", value: 6.5, unit: "%", min: 3, max: 12, step: 0.25, category: "capital" },
    { id: "constructionPeriod", label: "Construction Period", value: 24, unit: "months", min: 6, max: 60, step: 6, category: "capital" },
    // Operations
    { id: "opex", label: "Annual OPEX", value: 4.5, unit: "$M", min: 1, max: 20, step: 0.5, category: "operations" },
    { id: "opexGrowth", label: "OPEX Growth Rate", value: 2.5, unit: "%", min: 0, max: 10, step: 0.5, category: "operations" },
    { id: "operatingLife", label: "Operating Life", value: 25, unit: "years", min: 10, max: 40, step: 5, category: "operations" },
    // Revenue
    { id: "ppaPrice", label: "PPA Price", value: 45, unit: "$/MWh", min: 20, max: 100, step: 5, category: "revenue" },
    { id: "priceEscalation", label: "Price Escalation", value: 2, unit: "%", min: 0, max: 5, step: 0.5, category: "revenue" },
    { id: "capacityFactor", label: "Capacity Factor", value: 28, unit: "%", min: 15, max: 45, step: 1, category: "revenue" },
    { id: "carbonPrice", label: "Carbon Credit Price", value: 35, unit: "$/tCO₂", min: 10, max: 100, step: 5, category: "revenue" },
    // Exit
    { id: "exitMultiple", label: "Exit Multiple", value: 8, unit: "x EBITDA", min: 4, max: 15, step: 0.5, category: "exit" },
    { id: "holdingPeriod", label: "Holding Period", value: 7, unit: "years", min: 3, max: 15, step: 1, category: "exit" },
];

const COLORS = ["#06B6D4", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"];

export default function FinancialModelerPage() {
    const [inputs, setInputs] = useState<ModelInput[]>(defaultInputs);
    const [expandedCategory, setExpandedCategory] = useState<string | null>("capital");
    const [isCalculating, setIsCalculating] = useState(false);

    const getValue = (id: string) => inputs.find(i => i.id === id)?.value || 0;

    const updateInput = (id: string, value: number) => {
        setInputs(prev => prev.map(i => i.id === id ? { ...i, value } : i));
    };

    // Calculate model outputs
    const totalInvestment = getValue("equity") + getValue("debt");
    const leverageRatio = getValue("debt") / (getValue("equity") + getValue("debt")) * 100;
    
    // Simplified IRR calculation (mock)
    const calculateIRR = () => {
        const equity = getValue("equity");
        const ppaPrice = getValue("ppaPrice");
        const capacityFactor = getValue("capacityFactor");
        const carbonPrice = getValue("carbonPrice");
        
        // Simplified mock calculation
        const baseIRR = 12;
        const priceEffect = (ppaPrice - 40) * 0.15;
        const capacityEffect = (capacityFactor - 25) * 0.3;
        const carbonEffect = carbonPrice * 0.05;
        const leverageEffect = leverageRatio * 0.02;
        
        return Math.max(5, Math.min(25, baseIRR + priceEffect + capacityEffect + carbonEffect + leverageEffect));
    };

    const projectIRR = calculateIRR();
    const equityIRR = projectIRR + (leverageRatio * 0.04);
    const npv = getValue("equity") * (projectIRR / 100) * getValue("holdingPeriod") * 0.6;
    const tvpi = 1 + (equityIRR / 100) * getValue("holdingPeriod") * 0.5;
    const dpi = tvpi * 0.65;
    const paybackYears = getValue("equity") / (npv / getValue("holdingPeriod"));

    // Cash flow projection
    const cashFlowData = Array.from({ length: getValue("holdingPeriod") + 1 }).map((_, i) => {
        if (i === 0) return { year: `Y${i}`, cashflow: -getValue("equity"), cumulative: -getValue("equity") };
        
        const baseCashflow = (getValue("ppaPrice") * getValue("capacityFactor") * 87.6 + getValue("carbonPrice") * 500) / 1000;
        const growthFactor = Math.pow(1 + getValue("priceEscalation") / 100, i);
        const cashflow = baseCashflow * growthFactor - getValue("opex") * Math.pow(1 + getValue("opexGrowth") / 100, i);
        
        return {
            year: `Y${i}`,
            cashflow: cashflow,
            cumulative: i === 1 ? -getValue("equity") + cashflow : 0,
        };
    });

    // Recalculate cumulative
    for (let i = 1; i < cashFlowData.length; i++) {
        cashFlowData[i].cumulative = cashFlowData[i - 1].cumulative + cashFlowData[i].cashflow;
    }

    // Capital structure pie
    const capitalStructure = [
        { name: "Equity", value: getValue("equity") },
        { name: "Senior Debt", value: getValue("debt") * 0.7 },
        { name: "Mezzanine", value: getValue("debt") * 0.3 },
    ];

    // Sensitivity data
    const sensitivityData = [
        { parameter: "PPA Price +10%", irr: equityIRR * 1.12, npv: npv * 1.15 },
        { parameter: "PPA Price -10%", irr: equityIRR * 0.88, npv: npv * 0.85 },
        { parameter: "Capacity +5%", irr: equityIRR * 1.08, npv: npv * 1.10 },
        { parameter: "Capacity -5%", irr: equityIRR * 0.92, npv: npv * 0.90 },
        { parameter: "OPEX +15%", irr: equityIRR * 0.94, npv: npv * 0.92 },
    ];

    const categories = {
        capital: { label: "Capital Structure", icon: DollarSign },
        operations: { label: "Operations", icon: Settings2 },
        revenue: { label: "Revenue Assumptions", icon: TrendingUp },
        exit: { label: "Exit Strategy", icon: Target },
    };

    const handleReset = () => {
        setInputs(defaultInputs);
    };

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
                            <span className="text-white font-mono">${entry.value?.toFixed(1)}M</span>
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Financial Modeler</h1>
                    <p className="text-gray-400 mt-1">Interactive scenario analysis and IRR modeling</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="border-white/10 gap-2" onClick={handleReset}>
                        <RefreshCw className="h-4 w-4" />
                        Reset
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/10 gap-2">
                        <Save className="h-4 w-4" />
                        Save
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/10 gap-2">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                    { label: "Project IRR", value: `${projectIRR.toFixed(1)}%`, color: "cyber-cyan", icon: Percent },
                    { label: "Equity IRR", value: `${equityIRR.toFixed(1)}%`, color: "sgif-emerald", icon: TrendingUp },
                    { label: "NPV", value: `$${npv.toFixed(1)}M`, color: "sgif-gold", icon: DollarSign },
                    { label: "TVPI", value: `${tvpi.toFixed(2)}x`, color: "purple-400", icon: Target },
                    { label: "DPI", value: `${dpi.toFixed(2)}x`, color: "pink-400", icon: BarChart3 },
                    { label: "Payback", value: `${paybackYears.toFixed(1)} yrs`, color: "orange-400", icon: Calendar },
                ].map((metric, i) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass-card p-4 relative overflow-hidden"
                    >
                        <div className={cn(
                            "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent",
                            `via-${metric.color}`
                        )} />
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">{metric.label}</p>
                            <metric.icon className={cn("h-4 w-4", `text-${metric.color}`)} />
                        </div>
                        <p className={cn("text-2xl font-bold font-mono", `text-${metric.color}`)}>{metric.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Input Panel */}
                <div className="space-y-4">
                    <div className="glass-card p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Calculator className="h-5 w-5 text-cyber-cyan" />
                            <h2 className="text-lg font-semibold text-white">Model Inputs</h2>
                        </div>
                        
                        {Object.entries(categories).map(([key, { label, icon: Icon }]) => (
                            <div key={key} className="mb-3">
                                <button
                                    onClick={() => setExpandedCategory(expandedCategory === key ? null : key)}
                                    className="w-full flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                                >
                                    <div className="flex items-center gap-2">
                                        <Icon className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm font-medium text-white">{label}</span>
                                    </div>
                                    {expandedCategory === key ? (
                                        <ChevronUp className="h-4 w-4 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4 text-gray-400" />
                                    )}
                                </button>
                                
                                {expandedCategory === key && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-2 space-y-3 px-2"
                                    >
                                        {inputs
                                            .filter(i => i.category === key)
                                            .map(input => (
                                                <div key={input.id}>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <label className="text-xs text-gray-400">{input.label}</label>
                                                        <span className="text-xs font-mono text-white">
                                                            {input.value}{input.unit.startsWith("$") || input.unit.startsWith("%") || input.unit.startsWith("x") ? "" : " "}{input.unit}
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min={input.min}
                                                        max={input.max}
                                                        step={input.step}
                                                        value={input.value}
                                                        onChange={(e) => updateInput(input.id, parseFloat(e.target.value))}
                                                        className="w-full h-1.5 rounded-full bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyber-cyan"
                                                    />
                                                </div>
                                            ))}
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Capital Structure Pie */}
                    <div className="glass-card p-4">
                        <h3 className="text-sm font-medium text-white mb-4">Capital Structure</h3>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={capitalStructure}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={70}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {capitalStructure.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-2 text-center">
                            <p className="text-xs text-gray-500">Leverage: <span className="text-white font-mono">{leverageRatio.toFixed(0)}%</span></p>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Cash Flow Chart */}
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-semibold text-white mb-6">Cash Flow Projection</h3>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={cashFlowData}>
                                    <defs>
                                        <linearGradient id="cashflowGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="year" stroke="#6B7280" fontSize={12} />
                                    <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(v) => `$${v}M`} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="cashflow"
                                        stroke="#10B981"
                                        fill="url(#cashflowGradient)"
                                        strokeWidth={2}
                                        name="Annual Cash Flow"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="cumulative"
                                        stroke="#06B6D4"
                                        fill="none"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        name="Cumulative"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Sensitivity Analysis */}
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-semibold text-white mb-6">Sensitivity Analysis</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b border-white/10">
                                        <th className="pb-3 text-sm font-medium text-gray-400">Scenario</th>
                                        <th className="pb-3 text-sm font-medium text-gray-400 text-right">IRR</th>
                                        <th className="pb-3 text-sm font-medium text-gray-400 text-right">Δ IRR</th>
                                        <th className="pb-3 text-sm font-medium text-gray-400 text-right">NPV</th>
                                        <th className="pb-3 text-sm font-medium text-gray-400 text-right">Δ NPV</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-white/5 bg-white/[0.02]">
                                        <td className="py-3 text-sm text-white font-medium">Base Case</td>
                                        <td className="py-3 text-sm text-right font-mono text-cyber-cyan">{equityIRR.toFixed(1)}%</td>
                                        <td className="py-3 text-sm text-right text-gray-500">—</td>
                                        <td className="py-3 text-sm text-right font-mono text-sgif-gold">${npv.toFixed(1)}M</td>
                                        <td className="py-3 text-sm text-right text-gray-500">—</td>
                                    </tr>
                                    {sensitivityData.map((row, i) => {
                                        const irrDelta = row.irr - equityIRR;
                                        const npvDelta = row.npv - npv;
                                        
                                        return (
                                            <tr key={i} className="border-b border-white/5">
                                                <td className="py-3 text-sm text-gray-300">{row.parameter}</td>
                                                <td className="py-3 text-sm text-right font-mono text-white">{row.irr.toFixed(1)}%</td>
                                                <td className={cn(
                                                    "py-3 text-sm text-right font-mono",
                                                    irrDelta >= 0 ? "text-sgif-emerald" : "text-red-400"
                                                )}>
                                                    {irrDelta >= 0 ? "+" : ""}{irrDelta.toFixed(1)}%
                                                </td>
                                                <td className="py-3 text-sm text-right font-mono text-white">${row.npv.toFixed(1)}M</td>
                                                <td className={cn(
                                                    "py-3 text-sm text-right font-mono",
                                                    npvDelta >= 0 ? "text-sgif-emerald" : "text-red-400"
                                                )}>
                                                    {npvDelta >= 0 ? "+" : ""}{npvDelta.toFixed(1)}M
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
