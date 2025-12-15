"use client";

import * as React from "react";
import { cn } from "@sgif/ui";
import { motion } from "framer-motion";
import { 
    Activity, 
    CheckCircle2, 
    AlertTriangle, 
    XCircle, 
    Loader2,
    Server,
    Database,
    Cloud,
    Shield,
    Wifi,
    RefreshCw
} from "lucide-react";

export type SystemStatus = 'operational' | 'degraded' | 'partial_outage' | 'major_outage' | 'maintenance' | 'loading';

interface SystemStatusBadgeProps {
    status?: SystemStatus;
    label?: string;
    showPulse?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const statusConfig: Record<SystemStatus, {
    icon: React.ElementType;
    color: string;
    bgColor: string;
    borderColor: string;
    label: string;
    animate: boolean;
}> = {
    operational: {
        icon: CheckCircle2,
        color: 'text-sgif-emerald',
        bgColor: 'bg-sgif-emerald/10',
        borderColor: 'border-sgif-emerald/30',
        label: 'All Systems Operational',
        animate: true,
    },
    degraded: {
        icon: AlertTriangle,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-400/10',
        borderColor: 'border-yellow-400/30',
        label: 'Degraded Performance',
        animate: true,
    },
    partial_outage: {
        icon: AlertTriangle,
        color: 'text-orange-400',
        bgColor: 'bg-orange-400/10',
        borderColor: 'border-orange-400/30',
        label: 'Partial System Outage',
        animate: true,
    },
    major_outage: {
        icon: XCircle,
        color: 'text-red-400',
        bgColor: 'bg-red-400/10',
        borderColor: 'border-red-400/30',
        label: 'Major Outage',
        animate: true,
    },
    maintenance: {
        icon: RefreshCw,
        color: 'text-blue-400',
        bgColor: 'bg-blue-400/10',
        borderColor: 'border-blue-400/30',
        label: 'Scheduled Maintenance',
        animate: false,
    },
    loading: {
        icon: Loader2,
        color: 'text-gray-400',
        bgColor: 'bg-gray-400/10',
        borderColor: 'border-gray-400/30',
        label: 'Checking Status...',
        animate: false,
    },
};

export function SystemStatusBadge({ 
    status = 'operational', 
    label,
    showPulse = true,
    size = 'md',
    className 
}: SystemStatusBadgeProps) {
    const config = statusConfig[status];
    const Icon = config.icon;

    const sizeClasses = {
        sm: 'px-2 py-1 text-xs gap-1.5',
        md: 'px-3 py-1.5 text-xs gap-2',
        lg: 'px-4 py-2 text-sm gap-2',
    };

    const iconSizes = {
        sm: 'h-3 w-3',
        md: 'h-3.5 w-3.5',
        lg: 'h-4 w-4',
    };

    const dotSizes = {
        sm: 'h-1.5 w-1.5',
        md: 'h-2 w-2',
        lg: 'h-2.5 w-2.5',
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
                "inline-flex items-center rounded-lg border font-medium",
                config.bgColor,
                config.borderColor,
                sizeClasses[size],
                className
            )}
        >
            {showPulse && config.animate && (
                <span className="relative flex">
                    <span className={cn(
                        "absolute inline-flex rounded-full opacity-75 animate-ping",
                        dotSizes[size],
                        status === 'operational' && "bg-sgif-emerald",
                        status === 'degraded' && "bg-yellow-400",
                        status === 'partial_outage' && "bg-orange-400",
                        status === 'major_outage' && "bg-red-400",
                    )} />
                    <span className={cn(
                        "relative inline-flex rounded-full",
                        dotSizes[size],
                        status === 'operational' && "bg-sgif-emerald",
                        status === 'degraded' && "bg-yellow-400",
                        status === 'partial_outage' && "bg-orange-400",
                        status === 'major_outage' && "bg-red-400",
                    )} />
                </span>
            )}
            
            {(!showPulse || !config.animate) && (
                <Icon className={cn(
                    iconSizes[size],
                    config.color,
                    status === 'loading' && "animate-spin",
                    status === 'maintenance' && "animate-spin-slow"
                )} />
            )}
            
            <span className={cn("font-mono", config.color)}>
                {label || config.label}
            </span>
        </motion.div>
    );
}

interface ServiceStatus {
    name: string;
    status: SystemStatus;
    latency?: number;
    icon: React.ElementType;
}

interface SystemStatusPanelProps {
    className?: string;
}

export function SystemStatusPanel({ className }: SystemStatusPanelProps) {
    const [services, setServices] = React.useState<ServiceStatus[]>([
        { name: 'API Gateway', status: 'operational', latency: 45, icon: Server },
        { name: 'Database Cluster', status: 'operational', latency: 12, icon: Database },
        { name: 'Cloud Storage', status: 'operational', latency: 28, icon: Cloud },
        { name: 'Authentication', status: 'operational', latency: 67, icon: Shield },
        { name: 'Network', status: 'operational', latency: 8, icon: Wifi },
    ]);

    const overallStatus = React.useMemo(() => {
        if (services.some(s => s.status === 'major_outage')) return 'major_outage';
        if (services.some(s => s.status === 'partial_outage')) return 'partial_outage';
        if (services.some(s => s.status === 'degraded')) return 'degraded';
        if (services.some(s => s.status === 'maintenance')) return 'maintenance';
        return 'operational';
    }, [services]);

    return (
        <div className={cn("glass-card p-6 relative overflow-hidden", className)}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sgif-emerald to-transparent" />
            
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-sgif-emerald/10 border border-sgif-emerald/20">
                        <Activity className="h-5 w-5 text-sgif-emerald" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">System Health</h3>
                        <p className="text-xs text-gray-500">Real-time infrastructure monitoring</p>
                    </div>
                </div>
                <SystemStatusBadge status={overallStatus} size="md" />
            </div>

            <div className="space-y-3">
                {services.map((service, index) => (
                    <motion.div
                        key={service.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-md bg-white/5">
                                <service.icon className="h-4 w-4 text-gray-400" />
                            </div>
                            <span className="text-sm text-gray-300">{service.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {service.latency && (
                                <span className="text-xs text-gray-500 font-mono">
                                    {service.latency}ms
                                </span>
                            )}
                            <StatusDot status={service.status} />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-gray-500">Last updated: just now</span>
                <button className="text-xs text-cyber-cyan hover:text-cyber-cyan/80 transition-colors flex items-center gap-1">
                    <RefreshCw className="h-3 w-3" />
                    Refresh
                </button>
            </div>
        </div>
    );
}

function StatusDot({ status }: { status: SystemStatus }) {
    const colors: Record<SystemStatus, string> = {
        operational: 'bg-sgif-emerald',
        degraded: 'bg-yellow-400',
        partial_outage: 'bg-orange-400',
        major_outage: 'bg-red-400',
        maintenance: 'bg-blue-400',
        loading: 'bg-gray-400',
    };

    return (
        <span className="relative flex h-3 w-3">
            {status === 'operational' && (
                <span className={cn(
                    "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
                    colors[status]
                )} />
            )}
            <span className={cn(
                "relative inline-flex rounded-full h-3 w-3",
                colors[status]
            )} />
        </span>
    );
}
