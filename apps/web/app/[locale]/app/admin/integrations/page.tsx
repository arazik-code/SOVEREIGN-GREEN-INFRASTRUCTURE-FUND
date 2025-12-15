"use client";

import { useState } from "react";
import { cn } from "@sgif/ui";
import { Button } from "@sgif/ui";
import { motion } from "framer-motion";
import {
    Plug,
    Plus,
    Search,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Clock,
    Settings,
    ExternalLink,
    RefreshCw,
    Zap,
    Database,
    Cloud,
    Mail,
    Shield,
    FileText,
    BarChart3,
    Globe,
    Key,
    Trash2,
    Edit3,
    MoreVertical,
    ChevronRight,
    Link2
} from "lucide-react";

interface Integration {
    id: string;
    name: string;
    description: string;
    category: "data" | "analytics" | "compliance" | "communication" | "storage" | "identity";
    status: "connected" | "disconnected" | "error" | "pending";
    icon: string;
    lastSync?: string;
    dataPoints?: number;
}

const integrations: Integration[] = [
    { id: "1", name: "Bloomberg Terminal", description: "Real-time market data and analytics", category: "data", status: "connected", icon: "📊", lastSync: "2 min ago", dataPoints: 15420 },
    { id: "2", name: "Refinitiv", description: "Financial data and infrastructure", category: "data", status: "connected", icon: "💹", lastSync: "5 min ago", dataPoints: 8950 },
    { id: "3", name: "S&P Global", description: "Credit ratings and ESG data", category: "analytics", status: "connected", icon: "📈", lastSync: "1 hour ago", dataPoints: 3200 },
    { id: "4", name: "MSCI ESG", description: "ESG ratings and climate data", category: "analytics", status: "connected", icon: "🌱", lastSync: "3 hours ago", dataPoints: 1850 },
    { id: "5", name: "Verra Registry", description: "Carbon credit verification", category: "compliance", status: "connected", icon: "🌍", lastSync: "12 hours ago", dataPoints: 485 },
    { id: "6", name: "Azure AD", description: "Enterprise identity management", category: "identity", status: "connected", icon: "🔐", lastSync: "Just now" },
    { id: "7", name: "DocuSign", description: "Digital document signing", category: "communication", status: "connected", icon: "✍️", lastSync: "1 day ago" },
    { id: "8", name: "AWS S3", description: "Document storage and backup", category: "storage", status: "connected", icon: "☁️", lastSync: "10 min ago" },
    { id: "9", name: "SendGrid", description: "Transactional email service", category: "communication", status: "error", icon: "📧", lastSync: "Failed 2 hours ago" },
    { id: "10", name: "Salesforce", description: "CRM and investor relations", category: "communication", status: "disconnected", icon: "💼" },
];

interface AvailableIntegration {
    id: string;
    name: string;
    description: string;
    category: string;
    icon: string;
    popular: boolean;
}

const availableIntegrations: AvailableIntegration[] = [
    { id: "a1", name: "Power BI", description: "Business intelligence and reporting", category: "analytics", icon: "📊", popular: true },
    { id: "a2", name: "Tableau", description: "Visual analytics platform", category: "analytics", icon: "📈", popular: true },
    { id: "a3", name: "Slack", description: "Team communication", category: "communication", icon: "💬", popular: true },
    { id: "a4", name: "Okta", description: "Identity and access management", category: "identity", icon: "🔒", popular: false },
    { id: "a5", name: "Gold Standard", description: "Carbon credit registry", category: "compliance", icon: "🏅", popular: false },
];

const categoryConfig: Record<string, { color: string; icon: React.ElementType; label: string }> = {
    data: { color: "cyber-cyan", icon: Database, label: "Data" },
    analytics: { color: "sgif-emerald", icon: BarChart3, label: "Analytics" },
    compliance: { color: "purple-400", icon: Shield, label: "Compliance" },
    communication: { color: "sgif-gold", icon: Mail, label: "Communication" },
    storage: { color: "blue-400", icon: Cloud, label: "Storage" },
    identity: { color: "pink-400", icon: Key, label: "Identity" },
};

const statusConfig = {
    connected: { color: "sgif-emerald", label: "Connected", icon: CheckCircle2 },
    disconnected: { color: "gray-500", label: "Disconnected", icon: XCircle },
    error: { color: "red-500", label: "Error", icon: AlertTriangle },
    pending: { color: "sgif-gold", label: "Pending", icon: Clock },
};

export default function AdminIntegrationsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [showAddModal, setShowAddModal] = useState(false);

    const filteredIntegrations = integrations.filter(int => {
        const matchesSearch = int.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" || int.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const connectedCount = integrations.filter(i => i.status === "connected").length;
    const errorCount = integrations.filter(i => i.status === "error").length;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Integrations</h1>
                    <p className="text-gray-400 mt-1">Connect external services and data sources</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="border-white/10 gap-2">
                        <RefreshCw className="h-4 w-4" />
                        Sync All
                    </Button>
                    <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black gap-2"
                        onClick={() => setShowAddModal(true)}
                    >
                        <Plus className="h-4 w-4" />
                        Add Integration
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Integrations", value: integrations.length.toString(), color: "cyber-cyan", icon: Plug },
                    { label: "Connected", value: connectedCount.toString(), color: "sgif-emerald", icon: CheckCircle2 },
                    { label: "Errors", value: errorCount.toString(), color: errorCount > 0 ? "red-500" : "gray-500", icon: AlertTriangle },
                    { label: "Data Points", value: "29.9K", color: "sgif-gold", icon: Zap },
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

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search integrations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-9 pr-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan/50"
                    />
                </div>
                <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10 overflow-x-auto">
                    <button
                        onClick={() => setSelectedCategory("all")}
                        className={cn(
                            "px-3 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                            selectedCategory === "all"
                                ? "bg-white/10 text-white"
                                : "text-gray-400 hover:text-white"
                        )}
                    >
                        All
                    </button>
                    {Object.entries(categoryConfig).map(([key, config]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedCategory(key)}
                            className={cn(
                                "px-3 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1",
                                selectedCategory === key
                                    ? "bg-white/10 text-white"
                                    : "text-gray-400 hover:text-white"
                            )}
                        >
                            {config.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Integrations Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredIntegrations.map((integration, i) => {
                    const catConfig = categoryConfig[integration.category];
                    const statConfig = statusConfig[integration.status];

                    return (
                        <motion.div
                            key={integration.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                            className={cn(
                                "glass-card p-5 relative overflow-hidden hover:border-white/20 transition-all",
                                integration.status === "error" && "border-red-500/30"
                            )}
                        >
                            <div className={cn(
                                "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent",
                                `via-${statConfig.color}`
                            )} />

                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl">{integration.icon}</div>
                                    <div>
                                        <h3 className="font-semibold text-white">{integration.name}</h3>
                                        <span className={cn(
                                            "text-xs px-2 py-0.5 rounded-full border",
                                            `bg-${catConfig.color}/10 text-${catConfig.color} border-${catConfig.color}/20`
                                        )}>
                                            {catConfig.label}
                                        </span>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4 text-gray-400" />
                                </Button>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-500 mb-4">{integration.description}</p>

                            {/* Status & Sync */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2">
                                    <statConfig.icon className={cn("h-4 w-4", `text-${statConfig.color}`)} />
                                    <span className={cn("text-sm", `text-${statConfig.color}`)}>
                                        {statConfig.label}
                                    </span>
                                </div>
                                {integration.lastSync && (
                                    <span className="text-xs text-gray-600">{integration.lastSync}</span>
                                )}
                            </div>

                            {/* Data Points */}
                            {integration.dataPoints && (
                                <div className="mt-3 flex items-center gap-2">
                                    <Zap className="h-3 w-3 text-sgif-gold" />
                                    <span className="text-xs text-gray-500">
                                        {integration.dataPoints.toLocaleString()} data points synced
                                    </span>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="mt-4 flex items-center gap-2">
                                {integration.status === "connected" ? (
                                    <>
                                        <Button variant="outline" size="sm" className="flex-1 border-white/10 gap-1">
                                            <Settings className="h-3 w-3" />
                                            Configure
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <RefreshCw className="h-4 w-4 text-gray-400" />
                                        </Button>
                                    </>
                                ) : integration.status === "error" ? (
                                    <Button size="sm" className="w-full bg-red-500/20 text-red-400 hover:bg-red-500/30 gap-1">
                                        <AlertTriangle className="h-3 w-3" />
                                        Fix Connection
                                    </Button>
                                ) : (
                                    <Button size="sm" className="w-full bg-cyber-cyan/20 text-cyber-cyan hover:bg-cyber-cyan/30 gap-1">
                                        <Link2 className="h-3 w-3" />
                                        Connect
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Available Integrations */}
            <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-semibold text-white">Available Integrations</h2>
                        <p className="text-sm text-gray-500">Connect additional services to enhance your platform</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400 gap-1">
                        Browse All <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {availableIntegrations.map((integration, i) => (
                        <motion.div
                            key={integration.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-2xl">{integration.icon}</span>
                                {integration.popular && (
                                    <span className="text-xs px-1.5 py-0.5 rounded bg-sgif-gold/10 text-sgif-gold">
                                        Popular
                                    </span>
                                )}
                            </div>
                            <h3 className="font-medium text-white group-hover:text-cyber-cyan transition-colors">
                                {integration.name}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{integration.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* API Access */}
            <div className="glass-card p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <Key className="h-6 w-6 text-purple-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">API Access</h2>
                            <p className="text-sm text-gray-500">Manage API keys for custom integrations</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-400 gap-2">
                        <Key className="h-4 w-4" />
                        Manage Keys
                    </Button>
                </div>
                
                <div className="mt-6 p-4 rounded-lg bg-white/[0.02] border border-white/5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-white font-medium">Production API Key</p>
                            <p className="text-xs text-gray-500 font-mono mt-1">sgif_prod_****************************</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-0.5 rounded bg-sgif-emerald/10 text-sgif-emerald">Active</span>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit3 className="h-4 w-4 text-gray-400" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
