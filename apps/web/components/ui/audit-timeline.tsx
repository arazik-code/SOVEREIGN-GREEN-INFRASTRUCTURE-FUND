"use client";

import * as React from "react";
import { cn } from "@sgif/ui";
import { motion } from "framer-motion";
import {
    Clock,
    CheckCircle2,
    User,
    FileText,
    DollarSign,
    Shield,
    Settings,
    AlertTriangle,
    ArrowRight,
    MoreHorizontal,
    Eye
} from "lucide-react";

export type AuditEventType = 
    | 'created' 
    | 'updated' 
    | 'approved' 
    | 'rejected' 
    | 'signed' 
    | 'viewed' 
    | 'downloaded' 
    | 'deleted'
    | 'submitted'
    | 'verified'
    | 'transferred'
    | 'escalated';

export interface AuditEvent {
    id: string;
    type: AuditEventType;
    action: string;
    actor: {
        name: string;
        role: string;
        avatar?: string;
    };
    target?: string;
    timestamp: Date;
    metadata?: Record<string, string | number>;
    ipAddress?: string;
    location?: string;
    hash?: string;
}

interface AuditTimelineProps {
    events: AuditEvent[];
    title?: string;
    showHash?: boolean;
    className?: string;
}

const eventConfig: Record<AuditEventType, { icon: React.ElementType; color: string; bgColor: string }> = {
    created: { icon: FileText, color: 'text-blue-400', bgColor: 'bg-blue-400/10' },
    updated: { icon: Settings, color: 'text-cyan-400', bgColor: 'bg-cyan-400/10' },
    approved: { icon: CheckCircle2, color: 'text-sgif-emerald', bgColor: 'bg-sgif-emerald/10' },
    rejected: { icon: AlertTriangle, color: 'text-red-400', bgColor: 'bg-red-400/10' },
    signed: { icon: Shield, color: 'text-sgif-gold', bgColor: 'bg-sgif-gold/10' },
    viewed: { icon: Eye, color: 'text-gray-400', bgColor: 'bg-gray-400/10' },
    downloaded: { icon: ArrowRight, color: 'text-purple-400', bgColor: 'bg-purple-400/10' },
    deleted: { icon: AlertTriangle, color: 'text-red-500', bgColor: 'bg-red-500/10' },
    submitted: { icon: FileText, color: 'text-blue-400', bgColor: 'bg-blue-400/10' },
    verified: { icon: CheckCircle2, color: 'text-sgif-emerald', bgColor: 'bg-sgif-emerald/10' },
    transferred: { icon: DollarSign, color: 'text-sgif-gold', bgColor: 'bg-sgif-gold/10' },
    escalated: { icon: AlertTriangle, color: 'text-orange-400', bgColor: 'bg-orange-400/10' },
};

export function AuditTimeline({ events, title, showHash = true, className }: AuditTimelineProps) {
    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }).format(date);
    };

    return (
        <div className={cn("glass-card p-6 relative overflow-hidden", className)}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent" />
            
            {title && (
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20">
                            <Clock className="h-5 w-5 text-cyber-cyan" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">{title}</h3>
                            <p className="text-xs text-gray-500">Immutable record of all actions</p>
                        </div>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">
                        {events.length} events
                    </span>
                </div>
            )}

            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-cyan/50 via-sgif-gold/30 to-transparent" />

                <div className="space-y-4">
                    {events.map((event, index) => (
                        <AuditEventItem 
                            key={event.id} 
                            event={event} 
                            index={index}
                            showHash={showHash}
                            formatTime={formatTime}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

interface AuditEventItemProps {
    event: AuditEvent;
    index: number;
    showHash: boolean;
    formatTime: (date: Date) => string;
}

function AuditEventItem({ event, index, showHash, formatTime }: AuditEventItemProps) {
    const [expanded, setExpanded] = React.useState(false);
    const config = eventConfig[event.type];
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative pl-12"
        >
            {/* Timeline dot */}
            <div className={cn(
                "absolute left-3 top-2 w-4 h-4 rounded-full border-2 border-background flex items-center justify-center",
                config.bgColor
            )}>
                <div className={cn("w-2 h-2 rounded-full", config.color.replace('text-', 'bg-'))} />
            </div>

            {/* Event card */}
            <div 
                className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <div className={cn("p-1 rounded", config.bgColor)}>
                                <Icon className={cn("h-3 w-3", config.color)} />
                            </div>
                            <span className="text-sm text-white font-medium">
                                {event.action}
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1.5">
                                {event.actor.avatar ? (
                                    <img 
                                        src={event.actor.avatar} 
                                        alt={event.actor.name}
                                        className="w-4 h-4 rounded-full"
                                    />
                                ) : (
                                    <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center">
                                        <User className="w-2.5 h-2.5 text-gray-400" />
                                    </div>
                                )}
                                <span className="text-xs text-gray-400">{event.actor.name}</span>
                            </div>
                            <span className="text-xs text-gray-600">•</span>
                            <span className="text-xs text-gray-500">{event.actor.role}</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-gray-500 font-mono">
                            {formatTime(event.timestamp)}
                        </span>
                        <MoreHorizontal className="h-4 w-4 text-gray-600" />
                    </div>
                </div>

                {/* Expanded details */}
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 pt-4 border-t border-white/5"
                    >
                        <div className="grid grid-cols-2 gap-4 text-xs">
                            {event.target && (
                                <div>
                                    <span className="text-gray-500 block mb-1">Target</span>
                                    <span className="text-gray-300 font-mono">{event.target}</span>
                                </div>
                            )}
                            {event.ipAddress && (
                                <div>
                                    <span className="text-gray-500 block mb-1">IP Address</span>
                                    <span className="text-gray-300 font-mono">{event.ipAddress}</span>
                                </div>
                            )}
                            {event.location && (
                                <div>
                                    <span className="text-gray-500 block mb-1">Location</span>
                                    <span className="text-gray-300">{event.location}</span>
                                </div>
                            )}
                            {showHash && event.hash && (
                                <div className="col-span-2">
                                    <span className="text-gray-500 block mb-1">Verification Hash</span>
                                    <span className="text-gray-400 font-mono text-[10px] break-all">
                                        {event.hash}
                                    </span>
                                </div>
                            )}
                        </div>

                        {event.metadata && Object.keys(event.metadata).length > 0 && (
                            <div className="mt-3 pt-3 border-t border-white/5">
                                <span className="text-gray-500 text-xs block mb-2">Metadata</span>
                                <div className="flex flex-wrap gap-2">
                                    {Object.entries(event.metadata).map(([key, value]) => (
                                        <span 
                                            key={key}
                                            className="text-[10px] px-2 py-1 rounded bg-white/5 text-gray-400 font-mono"
                                        >
                                            {key}: {value}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
