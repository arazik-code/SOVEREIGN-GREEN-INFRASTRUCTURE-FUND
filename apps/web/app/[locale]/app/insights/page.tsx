"use client";

import { useState } from "react";
import { cn } from "@sgif/ui";
import { Button } from "@sgif/ui";
import { motion } from "framer-motion";
import {
    Brain,
    Sparkles,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    CheckCircle2,
    Lightbulb,
    Target,
    BarChart3,
    Globe,
    Newspaper,
    Clock,
    ChevronRight,
    RefreshCw,
    Zap,
    ArrowUpRight,
    ArrowDownRight,
    Leaf,
    DollarSign,
    Building2,
    MessageSquare
} from "lucide-react";

interface Insight {
    id: string;
    type: "opportunity" | "risk" | "trend" | "alert";
    title: string;
    description: string;
    impact: "high" | "medium" | "low";
    source: string;
    timestamp: string;
    actionable: boolean;
    relatedAssets?: string[];
}

const insights: Insight[] = [
    {
        id: "1",
        type: "opportunity",
        title: "Green Hydrogen Market Expansion",
        description: "Gulf region green hydrogen demand projected to increase 340% by 2030. Current portfolio positioning (Dubai Green Hydrogen) aligns well with this trend.",
        impact: "high",
        source: "AI Market Analysis",
        timestamp: "2 hours ago",
        actionable: true,
        relatedAssets: ["Dubai Green Hydrogen"],
    },
    {
        id: "2",
        type: "risk",
        title: "Grid Curtailment Risk - Saudi Arabia",
        description: "Regulatory changes may increase grid curtailment in Saudi Arabia by 15-20% in 2025. Recommend reviewing PPA terms for NEOM Solar.",
        impact: "medium",
        source: "Regulatory Intelligence",
        timestamp: "5 hours ago",
        actionable: true,
        relatedAssets: ["NEOM Solar Phase I"],
    },
    {
        id: "3",
        type: "trend",
        title: "Carbon Credit Prices Strengthening",
        description: "VCS carbon credit prices have increased 12% over the past quarter. Portfolio carbon assets are outperforming benchmark.",
        impact: "medium",
        source: "Market Data",
        timestamp: "1 day ago",
        actionable: false,
        relatedAssets: ["All Carbon Assets"],
    },
    {
        id: "4",
        type: "alert",
        title: "Qatar Wind Farm - Maintenance Due",
        description: "Scheduled maintenance window approaching for Qatar Wind Farm turbines. Expected 3-day production impact.",
        impact: "low",
        source: "Asset Monitoring",
        timestamp: "1 day ago",
        actionable: true,
        relatedAssets: ["Qatar Wind Farm"],
    },
];

interface MarketIntel {
    id: string;
    headline: string;
    summary: string;
    source: string;
    sentiment: "positive" | "negative" | "neutral";
    relevance: number;
    timestamp: string;
}

const marketIntel: MarketIntel[] = [
    {
        id: "1",
        headline: "UAE Announces $50B Clean Energy Investment Plan",
        summary: "New sovereign initiative to accelerate renewable energy deployment, creating significant co-investment opportunities.",
        source: "Reuters",
        sentiment: "positive",
        relevance: 95,
        timestamp: "4 hours ago",
    },
    {
        id: "2",
        headline: "European Carbon Border Tax Takes Effect",
        summary: "CBAM implementation expected to increase demand for verified carbon offsets from GCC region projects.",
        source: "Financial Times",
        sentiment: "positive",
        relevance: 88,
        timestamp: "6 hours ago",
    },
    {
        id: "3",
        headline: "Solar Panel Supply Chain Constraints Easing",
        summary: "Global solar module prices declining as manufacturing capacity expands, benefiting project economics.",
        source: "Bloomberg",
        sentiment: "positive",
        relevance: 82,
        timestamp: "12 hours ago",
    },
    {
        id: "4",
        headline: "Interest Rate Outlook: Fed Signals Cuts in 2025",
        summary: "Expected rate reductions could lower financing costs for infrastructure projects by 50-75 bps.",
        source: "WSJ",
        sentiment: "positive",
        relevance: 78,
        timestamp: "1 day ago",
    },
];

interface Forecast {
    metric: string;
    current: string;
    forecast: string;
    change: number;
    confidence: number;
}

const forecasts: Forecast[] = [
    { metric: "Portfolio NAV", current: "$127.4M", forecast: "$142.5M", change: 11.8, confidence: 85 },
    { metric: "Carbon Credits Generated", current: "485K tCO₂", forecast: "620K tCO₂", change: 27.8, confidence: 78 },
    { metric: "Weighted IRR", current: "14.2%", forecast: "15.1%", change: 0.9, confidence: 72 },
    { metric: "Distribution Yield", current: "4.5%", forecast: "5.2%", change: 0.7, confidence: 80 },
];

const typeConfig = {
    opportunity: { color: "sgif-emerald", icon: Lightbulb, label: "Opportunity" },
    risk: { color: "red-500", icon: AlertTriangle, label: "Risk" },
    trend: { color: "cyber-cyan", icon: TrendingUp, label: "Trend" },
    alert: { color: "sgif-gold", icon: Zap, label: "Alert" },
};

const impactConfig = {
    high: { color: "red-500", label: "High Impact" },
    medium: { color: "sgif-gold", label: "Medium Impact" },
    low: { color: "sgif-emerald", label: "Low Impact" },
};

export default function InsightsPage() {
    const [selectedCategory, setSelectedCategory] = useState<"all" | "opportunity" | "risk" | "trend" | "alert">("all");
    const [isRefreshing, setIsRefreshing] = useState(false);

    const filteredInsights = insights.filter(i => 
        selectedCategory === "all" || i.type === selectedCategory
    );

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsRefreshing(false);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Brain className="h-8 w-8 text-cyber-cyan" />
                        AI Insights
                    </h1>
                    <p className="text-gray-400 mt-1">Market intelligence and predictive analytics</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-white/10 gap-2"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                    >
                        <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
                        Refresh
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-cyber-cyan to-purple-500 text-white gap-2">
                        <Sparkles className="h-4 w-4" />
                        Ask AI
                    </Button>
                </div>
            </div>

            {/* AI Forecasts */}
            <div className="glass-card p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent" />
                
                <div className="flex items-center gap-2 mb-6">
                    <Target className="h-5 w-5 text-cyber-cyan" />
                    <h2 className="text-lg font-semibold text-white">12-Month Forecasts</h2>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20 ml-auto">
                        AI-Powered
                    </span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {forecasts.map((forecast, i) => (
                        <motion.div
                            key={forecast.metric}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="p-4 rounded-lg bg-white/[0.02] border border-white/5"
                        >
                            <p className="text-sm text-gray-500 mb-3">{forecast.metric}</p>
                            <div className="flex items-end justify-between mb-2">
                                <div>
                                    <p className="text-xs text-gray-600">Current</p>
                                    <p className="text-lg font-mono text-white">{forecast.current}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-600">Forecast</p>
                                    <p className="text-lg font-mono text-cyber-cyan">{forecast.forecast}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className={cn(
                                    "flex items-center gap-1 text-sm",
                                    forecast.change >= 0 ? "text-sgif-emerald" : "text-red-400"
                                )}>
                                    {forecast.change >= 0 ? (
                                        <ArrowUpRight className="h-3 w-3" />
                                    ) : (
                                        <ArrowDownRight className="h-3 w-3" />
                                    )}
                                    {forecast.change >= 0 ? "+" : ""}{forecast.change}%
                                </span>
                                <span className="text-xs text-gray-600">
                                    {forecast.confidence}% confidence
                                </span>
                            </div>
                            {/* Confidence bar */}
                            <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                                <div 
                                    className="h-full rounded-full bg-gradient-to-r from-cyber-cyan to-purple-500"
                                    style={{ width: `${forecast.confidence}%` }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Insights */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Filter */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
                            {(["all", "opportunity", "risk", "trend", "alert"] as const).map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-md text-sm font-medium transition-all capitalize",
                                        selectedCategory === cat
                                            ? "bg-white/10 text-white"
                                            : "text-gray-400 hover:text-white"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Insights List */}
                    <div className="space-y-4">
                        {filteredInsights.map((insight, i) => {
                            const typeConf = typeConfig[insight.type];
                            const impactConf = impactConfig[insight.impact];

                            return (
                                <motion.div
                                    key={insight.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="glass-card p-5 relative overflow-hidden hover:border-white/20 transition-all cursor-pointer"
                                >
                                    <div className={cn(
                                        "absolute left-0 top-0 bottom-0 w-1",
                                        `bg-${typeConf.color}`
                                    )} />

                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "p-1.5 rounded-lg border",
                                                `bg-${typeConf.color}/10 border-${typeConf.color}/20`
                                            )}>
                                                <typeConf.icon className={cn("h-4 w-4", `text-${typeConf.color}`)} />
                                            </div>
                                            <span className={cn(
                                                "text-xs px-2 py-0.5 rounded-full",
                                                `bg-${typeConf.color}/10 text-${typeConf.color}`
                                            )}>
                                                {typeConf.label}
                                            </span>
                                            <span className={cn(
                                                "text-xs px-2 py-0.5 rounded-full border",
                                                `bg-${impactConf.color}/10 text-${impactConf.color} border-${impactConf.color}/20`
                                            )}>
                                                {impactConf.label}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-600">{insight.timestamp}</span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-white mb-2">{insight.title}</h3>
                                    <p className="text-sm text-gray-400 mb-4">{insight.description}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {insight.relatedAssets?.map(asset => (
                                                <span 
                                                    key={asset}
                                                    className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400"
                                                >
                                                    {asset}
                                                </span>
                                            ))}
                                        </div>
                                        {insight.actionable && (
                                            <Button variant="ghost" size="sm" className="text-cyber-cyan gap-1">
                                                Take Action <ChevronRight className="h-3 w-3" />
                                            </Button>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Market Intelligence */}
                <div className="space-y-6">
                    <div className="glass-card p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Newspaper className="h-5 w-5 text-sgif-gold" />
                            <h2 className="text-lg font-semibold text-white">Market Intelligence</h2>
                        </div>

                        <div className="space-y-4">
                            {marketIntel.map((news, i) => (
                                <motion.div
                                    key={news.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <span className={cn(
                                            "text-xs px-1.5 py-0.5 rounded",
                                            news.sentiment === "positive" 
                                                ? "bg-sgif-emerald/10 text-sgif-emerald"
                                                : news.sentiment === "negative"
                                                ? "bg-red-500/10 text-red-400"
                                                : "bg-gray-500/10 text-gray-400"
                                        )}>
                                            {news.sentiment === "positive" ? "↑" : news.sentiment === "negative" ? "↓" : "→"} {news.relevance}%
                                        </span>
                                        <span className="text-xs text-gray-600">{news.timestamp}</span>
                                    </div>
                                    <h4 className="text-sm font-medium text-white mb-1 line-clamp-2">
                                        {news.headline}
                                    </h4>
                                    <p className="text-xs text-gray-500 line-clamp-2">{news.summary}</p>
                                    <p className="text-xs text-gray-600 mt-2">{news.source}</p>
                                </motion.div>
                            ))}
                        </div>

                        <Button variant="ghost" size="sm" className="w-full mt-4 text-gray-400">
                            View All News
                        </Button>
                    </div>

                    {/* AI Chat Preview */}
                    <div className="glass-card p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                        
                        <div className="flex items-center gap-2 mb-4">
                            <MessageSquare className="h-5 w-5 text-purple-400" />
                            <h2 className="text-lg font-semibold text-white">AI Assistant</h2>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                <p className="text-sm text-gray-300">
                                    "What's the projected IRR impact if carbon credit prices increase 20%?"
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                                <p className="text-sm text-gray-400">
                                    Based on current portfolio composition, a 20% increase in carbon prices would add approximately 1.2-1.5% to portfolio IRR...
                                </p>
                            </div>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-purple-500 to-cyber-cyan text-white gap-2">
                            <Sparkles className="h-4 w-4" />
                            Continue Conversation
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
