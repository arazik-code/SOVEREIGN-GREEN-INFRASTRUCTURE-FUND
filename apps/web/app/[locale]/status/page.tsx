"use client";

import { useState, useEffect } from "react";
import { cn } from "@sgif/ui";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
    CheckCircle2, 
    AlertTriangle, 
    XCircle, 
    RefreshCw,
    Server,
    Database,
    Shield,
    Globe,
    Zap,
    Clock,
    Activity,
    Hexagon
} from "lucide-react";

interface ServiceStatus {
    name: string;
    status: "operational" | "degraded" | "outage" | "maintenance";
    latency?: number;
    uptime: number;
    lastChecked: string;
    icon: React.ElementType;
}

const services: ServiceStatus[] = [
    { name: "Web Application", status: "operational", latency: 45, uptime: 99.99, lastChecked: "Just now", icon: Globe },
    { name: "API Services", status: "operational", latency: 23, uptime: 99.98, lastChecked: "Just now", icon: Zap },
    { name: "Authentication", status: "operational", latency: 56, uptime: 99.99, lastChecked: "Just now", icon: Shield },
    { name: "Database", status: "operational", latency: 12, uptime: 99.97, lastChecked: "Just now", icon: Database },
    { name: "Document Storage", status: "operational", latency: 89, uptime: 99.95, lastChecked: "Just now", icon: Server },
    { name: "Real-time Updates", status: "operational", latency: 34, uptime: 99.94, lastChecked: "Just now", icon: Activity },
];

interface Incident {
    id: string;
    title: string;
    status: "investigating" | "identified" | "monitoring" | "resolved";
    date: string;
    updates: { time: string; message: string }[];
}

const incidents: Incident[] = [
    {
        id: "1",
        title: "Scheduled Maintenance - Database Optimization",
        status: "resolved",
        date: "Dec 15, 2024",
        updates: [
            { time: "06:00 GST", message: "Maintenance completed successfully. All systems operational." },
            { time: "04:00 GST", message: "Scheduled maintenance started." },
        ]
    },
];

const statusConfig = {
    operational: { color: "sgif-emerald", icon: CheckCircle2, label: "Operational" },
    degraded: { color: "sgif-gold", icon: AlertTriangle, label: "Degraded" },
    outage: { color: "red-500", icon: XCircle, label: "Outage" },
    maintenance: { color: "cyber-cyan", icon: Clock, label: "Maintenance" },
};

const incidentStatusConfig = {
    investigating: { color: "sgif-gold", label: "Investigating" },
    identified: { color: "cyber-cyan", label: "Identified" },
    monitoring: { color: "purple-400", label: "Monitoring" },
    resolved: { color: "sgif-emerald", label: "Resolved" },
};

export default function StatusPage() {
    const [refreshing, setRefreshing] = useState(false);
    const [lastRefresh, setLastRefresh] = useState(new Date());

    const handleRefresh = async () => {
        setRefreshing(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLastRefresh(new Date());
        setRefreshing(false);
    };

    const allOperational = services.every(s => s.status === "operational");
    const overallStatus = allOperational ? "operational" : "degraded";

    return (
        <div className="min-h-screen bg-background py-24 px-4">
            {/* Background effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sgif-emerald/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyber-cyan/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto relative">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyber-cyan/20 to-sgif-emerald/20 border border-white/10 mb-6">
                        <Hexagon className="w-8 h-8 text-cyber-cyan" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
                        System Status
                    </h1>
                    <p className="text-gray-400">
                        Real-time status of all SGIF platform services
                    </p>
                </div>

                {/* Overall Status */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                        "glass-card p-6 mb-8 relative overflow-hidden",
                        allOperational ? "border-sgif-emerald/30" : "border-sgif-gold/30"
                    )}
                >
                    <div className={cn(
                        "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent",
                        allOperational ? "via-sgif-emerald" : "via-sgif-gold"
                    )} />
                    
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "p-3 rounded-xl border",
                                allOperational 
                                    ? "bg-sgif-emerald/10 border-sgif-emerald/20" 
                                    : "bg-sgif-gold/10 border-sgif-gold/20"
                            )}>
                                {allOperational ? (
                                    <CheckCircle2 className="h-8 w-8 text-sgif-emerald" />
                                ) : (
                                    <AlertTriangle className="h-8 w-8 text-sgif-gold" />
                                )}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    {allOperational ? "All Systems Operational" : "Some Systems Degraded"}
                                </h2>
                                <p className="text-sm text-gray-400">
                                    Last checked: {lastRefresh.toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleRefresh}
                            disabled={refreshing}
                            className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50"
                        >
                            <RefreshCw className={cn("h-5 w-5 text-gray-400", refreshing && "animate-spin")} />
                        </button>
                    </div>
                </motion.div>

                {/* Services Grid */}
                <div className="glass-card p-6 mb-8">
                    <h3 className="text-lg font-semibold text-white mb-6">Services</h3>
                    <div className="space-y-4">
                        {services.map((service, i) => {
                            const config = statusConfig[service.status];
                            const StatusIcon = config.icon;
                            
                            return (
                                <motion.div
                                    key={service.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                            <service.icon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{service.name}</p>
                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                {service.latency && (
                                                    <span>{service.latency}ms latency</span>
                                                )}
                                                <span>•</span>
                                                <span>{service.uptime}% uptime</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <StatusIcon className={cn("h-4 w-4", `text-${config.color}`)} />
                                        <span className={cn("text-sm", `text-${config.color}`)}>
                                            {config.label}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Uptime Chart */}
                <div className="glass-card p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">90-Day Uptime</h3>
                        <span className="text-sm text-sgif-emerald">99.97% average</span>
                    </div>
                    <div className="flex gap-0.5">
                        {Array.from({ length: 90 }).map((_, i) => {
                            // Simulate uptime data - mostly green with rare yellow/red
                            const random = Math.random();
                            let color = "bg-sgif-emerald";
                            if (random > 0.98) color = "bg-red-500";
                            else if (random > 0.95) color = "bg-sgif-gold";
                            
                            return (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex-1 h-8 rounded-sm transition-opacity hover:opacity-80",
                                        color
                                    )}
                                    title={`Day ${90 - i}`}
                                />
                            );
                        })}
                    </div>
                    <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                        <span>90 days ago</span>
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-sm bg-sgif-emerald" /> Operational
                            </span>
                            <span className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-sm bg-sgif-gold" /> Degraded
                            </span>
                            <span className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-sm bg-red-500" /> Outage
                            </span>
                        </div>
                        <span>Today</span>
                    </div>
                </div>

                {/* Recent Incidents */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Recent Incidents</h3>
                    
                    {incidents.length === 0 ? (
                        <div className="text-center py-8">
                            <CheckCircle2 className="h-12 w-12 text-sgif-emerald/50 mx-auto mb-3" />
                            <p className="text-gray-400">No incidents in the last 30 days</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {incidents.map(incident => {
                                const config = incidentStatusConfig[incident.status];
                                
                                return (
                                    <div key={incident.id} className="border-l-2 border-white/10 pl-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h4 className="font-medium text-white">{incident.title}</h4>
                                                <p className="text-sm text-gray-500">{incident.date}</p>
                                            </div>
                                            <span className={cn(
                                                "text-xs px-2 py-1 rounded-full border",
                                                `bg-${config.color}/10 text-${config.color} border-${config.color}/20`
                                            )}>
                                                {config.label}
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            {incident.updates.map((update, i) => (
                                                <div key={i} className="flex gap-3 text-sm">
                                                    <span className="text-gray-600 font-mono text-xs">{update.time}</span>
                                                    <span className="text-gray-400">{update.message}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Subscribe */}
                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-sm mb-4">
                        Get notified about system status updates
                    </p>
                    <Link 
                        href="/contact"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all text-sm"
                    >
                        Subscribe to Updates
                    </Link>
                </div>
            </div>
        </div>
    );
}
