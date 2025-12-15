"use client";

import { useState } from "react";
import { cn } from "@sgif/ui";
import { Button } from "@sgif/ui";
import { motion } from "framer-motion";
import {
    FileText,
    Download,
    Calendar,
    Filter,
    ChevronRight,
    Clock,
    CheckCircle2,
    Eye,
    Share2,
    Printer,
    FileSpreadsheet,
    FileBarChart,
    FilePieChart,
    Building2,
    Leaf,
    TrendingUp,
    DollarSign,
    PieChart,
    BarChart3,
    Globe,
    Shield,
    Plus,
    Search
} from "lucide-react";

interface Report {
    id: string;
    name: string;
    type: "quarterly" | "annual" | "esg" | "capital" | "custom";
    period: string;
    status: "published" | "draft" | "scheduled";
    createdAt: string;
    size: string;
    pages: number;
    recipients: number;
}

const reports: Report[] = [
    { id: "1", name: "Q3 2024 LP Quarterly Report", type: "quarterly", period: "Q3 2024", status: "published", createdAt: "Oct 15, 2024", size: "4.2 MB", pages: 42, recipients: 28 },
    { id: "2", name: "ESG Impact Report 2024", type: "esg", period: "YTD 2024", status: "draft", createdAt: "Dec 1, 2024", size: "8.7 MB", pages: 68, recipients: 0 },
    { id: "3", name: "Capital Account Statement", type: "capital", period: "Q3 2024", status: "published", createdAt: "Oct 10, 2024", size: "1.2 MB", pages: 12, recipients: 28 },
    { id: "4", name: "Annual Report 2023", type: "annual", period: "FY 2023", status: "published", createdAt: "Mar 15, 2024", size: "12.5 MB", pages: 120, recipients: 45 },
    { id: "5", name: "Q4 2024 LP Quarterly Report", type: "quarterly", period: "Q4 2024", status: "scheduled", createdAt: "Jan 15, 2025", size: "-", pages: 0, recipients: 28 },
    { id: "6", name: "Carbon Credit Performance", type: "custom", period: "2024", status: "published", createdAt: "Nov 20, 2024", size: "2.8 MB", pages: 24, recipients: 15 },
];

interface ReportTemplate {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType;
    color: string;
}

const reportTemplates: ReportTemplate[] = [
    { id: "1", name: "LP Quarterly Report", description: "Standard quarterly performance report for LPs", icon: FileBarChart, color: "cyber-cyan" },
    { id: "2", name: "Capital Account Statement", description: "Individual LP capital account details", icon: DollarSign, color: "sgif-gold" },
    { id: "3", name: "ESG Impact Report", description: "Environmental and social impact metrics", icon: Leaf, color: "sgif-emerald" },
    { id: "4", name: "Portfolio Summary", description: "High-level portfolio composition", icon: PieChart, color: "purple-400" },
    { id: "5", name: "Carbon Credit Report", description: "Carbon offset generation and forecasts", icon: Globe, color: "green-400" },
    { id: "6", name: "Governance Summary", description: "Voting history and decisions", icon: Shield, color: "pink-400" },
];

const typeConfig = {
    quarterly: { color: "cyber-cyan", label: "Quarterly", icon: Calendar },
    annual: { color: "sgif-gold", label: "Annual", icon: FileText },
    esg: { color: "sgif-emerald", label: "ESG", icon: Leaf },
    capital: { color: "purple-400", label: "Capital", icon: DollarSign },
    custom: { color: "pink-400", label: "Custom", icon: FileSpreadsheet },
};

const statusConfig = {
    published: { color: "sgif-emerald", label: "Published" },
    draft: { color: "sgif-gold", label: "Draft" },
    scheduled: { color: "cyber-cyan", label: "Scheduled" },
};

export default function ReportsPage() {
    const [selectedType, setSelectedType] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [showTemplates, setShowTemplates] = useState(false);

    const filteredReports = reports.filter(r => {
        const matchesType = selectedType === "all" || r.type === selectedType;
        const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Reports</h1>
                    <p className="text-gray-400 mt-1">Institutional reports and export tools</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-white/10 gap-2"
                        onClick={() => setShowTemplates(!showTemplates)}
                    >
                        <FileSpreadsheet className="h-4 w-4" />
                        Templates
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black gap-2">
                        <Plus className="h-4 w-4" />
                        Generate Report
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Published Reports", value: reports.filter(r => r.status === "published").length.toString(), color: "sgif-emerald", icon: CheckCircle2 },
                    { label: "Drafts", value: reports.filter(r => r.status === "draft").length.toString(), color: "sgif-gold", icon: FileText },
                    { label: "Scheduled", value: reports.filter(r => r.status === "scheduled").length.toString(), color: "cyber-cyan", icon: Clock },
                    { label: "Total Recipients", value: "45", color: "purple-400", icon: Share2 },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass-card p-5 relative overflow-hidden"
                    >
                        <div className={cn(
                            "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent",
                            `via-${stat.color}`
                        )} />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                                <p className={cn("text-3xl font-bold", `text-${stat.color}`)}>{stat.value}</p>
                            </div>
                            <stat.icon className={cn("h-6 w-6", `text-${stat.color}`)} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Templates Section */}
            {showTemplates && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="glass-card p-6"
                >
                    <h2 className="text-lg font-semibold text-white mb-4">Report Templates</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {reportTemplates.map((template, i) => (
                            <motion.div
                                key={template.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all cursor-pointer group"
                            >
                                <div className="flex items-start gap-3">
                                    <div className={cn(
                                        "p-2 rounded-lg border",
                                        `bg-${template.color}/10 border-${template.color}/20`
                                    )}>
                                        <template.icon className={cn("h-5 w-5", `text-${template.color}`)} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-white group-hover:text-cyber-cyan transition-colors">
                                            {template.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search reports..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-9 pr-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan/50"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
                        {["all", "quarterly", "annual", "esg", "capital"].map(type => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={cn(
                                    "px-3 py-1.5 rounded-md text-sm font-medium transition-all capitalize",
                                    selectedType === type
                                        ? "bg-white/10 text-white"
                                        : "text-gray-400 hover:text-white"
                                )}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reports Table */}
            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-white/10 bg-white/[0.02]">
                                <th className="p-4 text-sm font-medium text-gray-400">Report Name</th>
                                <th className="p-4 text-sm font-medium text-gray-400">Type</th>
                                <th className="p-4 text-sm font-medium text-gray-400">Period</th>
                                <th className="p-4 text-sm font-medium text-gray-400">Status</th>
                                <th className="p-4 text-sm font-medium text-gray-400">Details</th>
                                <th className="p-4 text-sm font-medium text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReports.map((report, i) => {
                                const typeConf = typeConfig[report.type];
                                const statusConf = statusConfig[report.status];

                                return (
                                    <motion.tr
                                        key={report.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.03 }}
                                        className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "p-2 rounded-lg border",
                                                    `bg-${typeConf.color}/10 border-${typeConf.color}/20`
                                                )}>
                                                    <typeConf.icon className={cn("h-4 w-4", `text-${typeConf.color}`)} />
                                                </div>
                                                <span className="font-medium text-white">{report.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={cn(
                                                "text-xs px-2 py-0.5 rounded-full border",
                                                `bg-${typeConf.color}/10 text-${typeConf.color} border-${typeConf.color}/20`
                                            )}>
                                                {typeConf.label}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-400">{report.period}</td>
                                        <td className="p-4">
                                            <span className={cn(
                                                "text-xs px-2 py-0.5 rounded-full",
                                                `bg-${statusConf.color}/10 text-${statusConf.color}`
                                            )}>
                                                {statusConf.label}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-500">
                                            {report.status !== "scheduled" ? (
                                                <span>{report.pages} pages • {report.size}</span>
                                            ) : (
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {report.createdAt}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <Eye className="h-4 w-4 text-gray-400" />
                                                </Button>
                                                {report.status === "published" && (
                                                    <>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                            <Download className="h-4 w-4 text-gray-400" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                            <Share2 className="h-4 w-4 text-gray-400" />
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Export Options */}
            <div className="glass-card p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Quick Export</h2>
                <p className="text-sm text-gray-400 mb-6">Generate on-demand reports with customizable parameters</p>
                
                <div className="grid md:grid-cols-3 gap-4">
                    {[
                        { label: "Portfolio Summary", format: "PDF", icon: FilePieChart, description: "Current portfolio composition and performance" },
                        { label: "Transaction History", format: "Excel", icon: FileSpreadsheet, description: "Complete transaction log with details" },
                        { label: "ESG Metrics", format: "PDF", icon: Leaf, description: "Environmental and social impact data" },
                    ].map((export_, i) => (
                        <div
                            key={export_.label}
                            className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="p-2 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20">
                                    <export_.icon className="h-5 w-5 text-cyber-cyan" />
                                </div>
                                <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400">
                                    {export_.format}
                                </span>
                            </div>
                            <h3 className="font-medium text-white mb-1 group-hover:text-cyber-cyan transition-colors">
                                {export_.label}
                            </h3>
                            <p className="text-sm text-gray-500">{export_.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
