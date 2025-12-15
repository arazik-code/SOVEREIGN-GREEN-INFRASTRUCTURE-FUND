"use client";

import * as React from "react";
import { cn } from "@sgif/ui";
import { motion } from "framer-motion";
import { 
    InboxIcon, 
    FileIcon, 
    LineChartIcon, 
    UsersIcon,
    FolderIcon,
    SearchIcon,
    AlertCircleIcon,
    DatabaseIcon,
    MapIcon,
    BrainCircuitIcon,
    ShieldCheckIcon,
    SettingsIcon
} from "lucide-react";

type EmptyStateType = 
    | "default"
    | "documents"
    | "charts"
    | "users"
    | "projects"
    | "search"
    | "error"
    | "data"
    | "maps"
    | "ai"
    | "permissions"
    | "settings";

interface EmptyStateProps {
    type?: EmptyStateType;
    title?: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}

const iconMap: Record<EmptyStateType, React.ReactNode> = {
    default: <InboxIcon className="w-12 h-12" />,
    documents: <FileIcon className="w-12 h-12" />,
    charts: <LineChartIcon className="w-12 h-12" />,
    users: <UsersIcon className="w-12 h-12" />,
    projects: <FolderIcon className="w-12 h-12" />,
    search: <SearchIcon className="w-12 h-12" />,
    error: <AlertCircleIcon className="w-12 h-12" />,
    data: <DatabaseIcon className="w-12 h-12" />,
    maps: <MapIcon className="w-12 h-12" />,
    ai: <BrainCircuitIcon className="w-12 h-12" />,
    permissions: <ShieldCheckIcon className="w-12 h-12" />,
    settings: <SettingsIcon className="w-12 h-12" />,
};

const defaultMessages: Record<EmptyStateType, { title: string; description: string }> = {
    default: {
        title: "No data available",
        description: "There's nothing to display at the moment."
    },
    documents: {
        title: "No documents found",
        description: "Upload your first document to get started."
    },
    charts: {
        title: "No chart data",
        description: "Add data points to visualize your metrics."
    },
    users: {
        title: "No users found",
        description: "Invite team members to collaborate."
    },
    projects: {
        title: "No projects yet",
        description: "Create your first project to begin tracking."
    },
    search: {
        title: "No results found",
        description: "Try adjusting your search or filters."
    },
    error: {
        title: "Something went wrong",
        description: "An error occurred while loading data."
    },
    data: {
        title: "No data to display",
        description: "Connect a data source or import data."
    },
    maps: {
        title: "No locations available",
        description: "Add project locations to see them on the map."
    },
    ai: {
        title: "No insights yet",
        description: "Start a conversation to get AI-powered analysis."
    },
    permissions: {
        title: "Access restricted",
        description: "You don't have permission to view this content."
    },
    settings: {
        title: "No settings configured",
        description: "Configure your preferences to get started."
    },
};

export function EmptyState({ 
    type = "default", 
    title, 
    description, 
    action,
    className 
}: EmptyStateProps) {
    const defaultContent = defaultMessages[type];
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "flex flex-col items-center justify-center py-16 px-4 text-center",
                className
            )}
        >
            {/* Glowing icon container */}
            <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="relative mb-6"
            >
                {/* Glow effect */}
                <div className="absolute inset-0 blur-xl opacity-20 bg-gradient-to-br from-cyber-cyan to-sgif-emerald rounded-full scale-150" />
                
                {/* Icon container */}
                <div className="relative glass-card p-6 rounded-2xl border border-white/10">
                    <div className="text-gray-500">
                        {iconMap[type]}
                    </div>
                </div>
            </motion.div>

            {/* Content */}
            <motion.h3 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-semibold text-white mb-2"
            >
                {title || defaultContent.title}
            </motion.h3>
            
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-500 max-w-sm mb-6"
            >
                {description || defaultContent.description}
            </motion.p>

            {/* Action button */}
            {action && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {action}
                </motion.div>
            )}
        </motion.div>
    );
}

/**
 * Compact empty state for inline use in cards/tables
 */
export function EmptyStateCompact({
    icon,
    message,
    className
}: {
    icon?: React.ReactNode;
    message: string;
    className?: string;
}) {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center py-8 text-center",
            className
        )}>
            {icon && (
                <div className="text-gray-600 mb-3">
                    {icon}
                </div>
            )}
            <p className="text-gray-500 text-sm">{message}</p>
        </div>
    );
}

/**
 * Error state with retry functionality
 */
export function ErrorState({
    title = "Failed to load data",
    description = "An error occurred while fetching data. Please try again.",
    onRetry,
    className
}: {
    title?: string;
    description?: string;
    onRetry?: () => void;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "flex flex-col items-center justify-center py-16 px-4 text-center",
                className
            )}
        >
            {/* Error icon with animation */}
            <motion.div
                animate={{ 
                    rotate: [0, -5, 5, -5, 0],
                }}
                transition={{ 
                    duration: 0.5, 
                    repeat: 3,
                    repeatDelay: 2
                }}
                className="relative mb-6"
            >
                <div className="absolute inset-0 blur-xl opacity-30 bg-red-500 rounded-full scale-150" />
                <div className="relative glass-card p-6 rounded-2xl border border-red-500/20">
                    <AlertCircleIcon className="w-12 h-12 text-red-400" />
                </div>
            </motion.div>

            <h3 className="text-xl font-semibold text-white mb-2">
                {title}
            </h3>
            
            <p className="text-gray-500 max-w-sm mb-6">
                {description}
            </p>

            {onRetry && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onRetry}
                    className="px-6 py-2 bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black font-medium rounded-lg hover:shadow-neon-cyan transition-shadow"
                >
                    Try Again
                </motion.button>
            )}
        </motion.div>
    );
}

/**
 * Permission denied state
 */
export function AccessDeniedState({
    requiredRole,
    className
}: {
    requiredRole?: string;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "flex flex-col items-center justify-center py-16 px-4 text-center",
                className
            )}
        >
            <motion.div
                className="relative mb-6"
            >
                <div className="absolute inset-0 blur-xl opacity-30 bg-amber-500 rounded-full scale-150" />
                <div className="relative glass-card p-6 rounded-2xl border border-amber-500/20">
                    <ShieldCheckIcon className="w-12 h-12 text-amber-400" />
                </div>
            </motion.div>

            <h3 className="text-xl font-semibold text-white mb-2">
                Access Restricted
            </h3>
            
            <p className="text-gray-500 max-w-sm mb-2">
                You don't have permission to access this resource.
            </p>

            {requiredRole && (
                <p className="text-xs text-gray-600">
                    Required role: <span className="text-amber-400 font-mono">{requiredRole}</span>
                </p>
            )}
        </motion.div>
    );
}
