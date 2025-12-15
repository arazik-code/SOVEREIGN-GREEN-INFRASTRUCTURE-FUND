"use client";

import { useState } from "react";
import { AiCopilot } from "@/components/ai-copilot";
import { cn } from "@sgif/ui";
import { Button } from "@sgif/ui";
import { motion } from "framer-motion";
import {
    Brain,
    Cpu,
    Database,
    Sparkles,
    FileText,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    ArrowDownRight,
    Lightbulb,
    Leaf,
    DollarSign,
    Target,
    AlertTriangle,
    CheckCircle2,
    Zap,
    ChevronRight,
    MessageSquare,
    BarChart3,
    PieChart,
    Clock,
    RefreshCw
} from "lucide-react";

interface ContextPrompt {
    id: string;
    label: string;
    prompt: string;
    icon: React.ElementType;
    color: string;
    category: "portfolio" | "carbon" | "forecast" | "documents";
}

const contextPrompts: ContextPrompt[] = [
    { id: "1", label: "Portfolio Summary", prompt: "Give me a summary of current portfolio performance and key metrics", icon: PieChart, color: "cyber-cyan", category: "portfolio" },
    { id: "2", label: "Carbon Forecast", prompt: "What are the projected carbon credits for Q4 2024?", icon: Leaf, color: "sgif-emerald", category: "carbon" },
    { id: "3", label: "Risk Analysis", prompt: "Identify the top 3 risks in our current portfolio", icon: AlertTriangle, color: "sgif-gold", category: "portfolio" },
    { id: "4", label: "ESG Score", prompt: "Summarize our ESG performance across all assets", icon: Target, color: "purple-400", category: "carbon" },
    { id: "5", label: "Q3 Report Analysis", prompt: "Summarize the key findings from the Q3 2024 LP Report", icon: FileText, color: "blue-400", category: "documents" },
    { id: "6", label: "Revenue Projections", prompt: "What are the revenue projections for NEOM Solar Phase I?", icon: DollarSign, color: "pink-400", category: "forecast" },
];

interface InsightCard {
    id: string;
    type: "opportunity" | "risk" | "trend" | "alert";
    title: string;
    value: string;
    change?: number;
    description: string;
}

const executiveInsights: InsightCard[] = [
    { id: "1", type: "trend", title: "NAV Growth", value: "+8.2%", change: 8.2, description: "Quarter-over-quarter growth driven by NEOM Solar performance" },
    { id: "2", type: "opportunity", title: "Carbon Revenue", value: "$4.2M", change: 15.3, description: "Projected additional revenue from carbon credits in FY25" },
    { id: "3", type: "risk", title: "Grid Curtailment", value: "Medium", description: "Saudi regulatory changes may impact 2025 projections" },
    { id: "4", type: "alert", title: "Approval Pending", value: "1 Vote", description: "NEOM Phase II investment requires LP approval by Dec 20" },
];

interface ForecastSummary {
    metric: string;
    current: string;
    forecast: string;
    confidence: number;
}

const forecastSummaries: ForecastSummary[] = [
    { metric: "Q4 Carbon Credits", current: "485K tCO₂", forecast: "620K tCO₂", confidence: 85 },
    { metric: "FY25 Revenue", current: "$42.5M", forecast: "$48.2M", confidence: 78 },
    { metric: "Portfolio TVPI", current: "1.32x", forecast: "1.45x", confidence: 72 },
];

interface RecentDocument {
    id: string;
    name: string;
    type: string;
    date: string;
}

const recentDocuments: RecentDocument[] = [
    { id: "1", name: "Q3 2024 LP Report", type: "Quarterly Report", date: "Oct 15, 2024" },
    { id: "2", name: "ESG Impact Report 2024", type: "ESG Report", date: "Dec 1, 2024" },
    { id: "3", name: "NEOM Solar Due Diligence", type: "Investment Memo", date: "Nov 28, 2024" },
];

const typeConfig = {
    opportunity: { color: "sgif-emerald", icon: Lightbulb },
    risk: { color: "red-500", icon: AlertTriangle },
    trend: { color: "cyber-cyan", icon: TrendingUp },
    alert: { color: "sgif-gold", icon: Zap },
};

export default function AiPage() {
    const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsRefreshing(false);
    };

    return (
        <div className="flex flex-col gap-6 min-h-[calc(100vh-6rem)] relative">
            {/* Background effects */}
            <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-200 to-cyber-cyan bg-clip-text text-transparent flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <Brain className="h-7 w-7 md:h-8 md:w-8 text-purple-400" />
                        </div>
                        AI Command Center
                    </h1>
                    <p className="text-gray-500 mt-2 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-sgif-gold" />
                        Quantum-powered infrastructure intelligence
                    </p>
                </div>
                
                {/* Status indicators */}
                <div className="flex items-center gap-3">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-white/10 gap-2"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                    >
                        <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
                        Sync Data
                    </Button>
                    {[
                        { icon: Cpu, label: "Neural Core", status: "Active" },
                        { icon: Database, label: "RAG Index", status: "Synced" },
                    ].map((item, i) => (
                        <div key={i} className="hidden md:flex glass-card px-4 py-2 items-center gap-3">
                            <item.icon className="h-4 w-4 text-cyber-cyan" />
                            <div>
                                <p className="text-xs text-gray-500">{item.label}</p>
                                <p className="text-xs text-sgif-emerald font-mono">{item.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Executive Insights Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {executiveInsights.map((insight, i) => {
                    const config = typeConfig[insight.type];
                    
                    return (
                        <motion.div
                            key={insight.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-card p-4 relative overflow-hidden hover:border-white/20 transition-all cursor-pointer"
                        >
                            <div className={cn(
                                "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent",
                                `via-${config.color}`
                            )} />
                            
                            <div className="flex items-start justify-between mb-2">
                                <span className={cn(
                                    "text-xs px-2 py-0.5 rounded-full border",
                                    `bg-${config.color}/10 text-${config.color} border-${config.color}/20`
                                )}>
                                    <config.icon className="h-3 w-3 inline mr-1" />
                                    {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                                </span>
                                {insight.change !== undefined && (
                                    <span className={cn(
                                        "text-xs flex items-center gap-0.5",
                                        insight.change >= 0 ? "text-sgif-emerald" : "text-red-400"
                                    )}>
                                        {insight.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                        {Math.abs(insight.change)}%
                                    </span>
                                )}
                            </div>
                            
                            <p className="text-xs text-gray-500 mb-1">{insight.title}</p>
                            <p className={cn("text-xl font-bold font-mono", `text-${config.color}`)}>{insight.value}</p>
                            <p className="text-xs text-gray-600 mt-2 line-clamp-2">{insight.description}</p>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6 flex-1">
                {/* Main AI Chat */}
                <div className="lg:col-span-2 flex flex-col h-[600px]">
                    <AiCopilot />
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Context Prompts */}
                    <div className="glass-card p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <MessageSquare className="h-4 w-4 text-purple-400" />
                            <h3 className="text-sm font-semibold text-white">Quick Prompts</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {contextPrompts.slice(0, 6).map((prompt) => (
                                <button
                                    key={prompt.id}
                                    onClick={() => setSelectedPrompt(prompt.prompt)}
                                    className={cn(
                                        "p-3 rounded-lg text-left transition-all text-xs group",
                                        "bg-white/[0.02] border border-white/5 hover:border-white/20",
                                        selectedPrompt === prompt.prompt && "border-cyber-cyan/30 bg-cyber-cyan/5"
                                    )}
                                >
                                    <prompt.icon className={cn("h-4 w-4 mb-2", `text-${prompt.color}`)} />
                                    <p className="text-gray-300 group-hover:text-white transition-colors line-clamp-1">
                                        {prompt.label}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Forecast Summaries */}
                    <div className="glass-card p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-cyber-cyan" />
                                <h3 className="text-sm font-semibold text-white">AI Forecasts</h3>
                            </div>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20">
                                Live
                            </span>
                        </div>
                        <div className="space-y-3">
                            {forecastSummaries.map((forecast, i) => (
                                <div 
                                    key={i}
                                    className="p-3 rounded-lg bg-white/[0.02] border border-white/5"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-gray-400">{forecast.metric}</span>
                                        <span className="text-xs text-gray-600">{forecast.confidence}% conf.</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">{forecast.current}</span>
                                        <span className="text-xs text-gray-600">→</span>
                                        <span className="text-sm font-mono text-cyber-cyan">{forecast.forecast}</span>
                                    </div>
                                    <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                                        <div 
                                            className="h-full rounded-full bg-gradient-to-r from-cyber-cyan to-purple-500"
                                            style={{ width: `${forecast.confidence}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Document Context */}
                    <div className="glass-card p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-sgif-gold" />
                                <h3 className="text-sm font-semibold text-white">Document Context</h3>
                            </div>
                            <Button variant="ghost" size="sm" className="h-6 text-xs text-gray-400 gap-1 p-0">
                                View All <ChevronRight className="h-3 w-3" />
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {recentDocuments.map((doc) => (
                                <div 
                                    key={doc.id}
                                    className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-start gap-2">
                                        <FileText className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors truncate">
                                                {doc.name}
                                            </p>
                                            <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                                                <Clock className="h-3 w-3" />
                                                {doc.date}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-600 mt-3 text-center">
                            AI has context from 156 documents
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
