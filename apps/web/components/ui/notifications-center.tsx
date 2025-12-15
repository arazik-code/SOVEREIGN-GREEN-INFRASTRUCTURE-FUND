"use client";

import * as React from "react";
import { cn } from "@sgif/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bell,
    X,
    Check,
    AlertTriangle,
    Info,
    FileText,
    DollarSign,
    Users,
    Shield,
    ChevronRight,
    Settings,
    Trash2,
    CheckCheck,
    Clock,
    Filter
} from "lucide-react";

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'document' | 'financial' | 'governance' | 'security';

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    actionUrl?: string;
    actionLabel?: string;
    priority?: 'low' | 'medium' | 'high' | 'critical';
}

interface NotificationsCenterProps {
    notifications: Notification[];
    onMarkAsRead: (id: string) => void;
    onMarkAllAsRead: () => void;
    onDelete: (id: string) => void;
    onClearAll: () => void;
    onNotificationClick?: (notification: Notification) => void;
    className?: string;
}

const typeConfig: Record<NotificationType, { icon: React.ElementType; color: string; bgColor: string }> = {
    info: { icon: Info, color: 'text-blue-400', bgColor: 'bg-blue-400/10' },
    success: { icon: Check, color: 'text-sgif-emerald', bgColor: 'bg-sgif-emerald/10' },
    warning: { icon: AlertTriangle, color: 'text-yellow-400', bgColor: 'bg-yellow-400/10' },
    error: { icon: AlertTriangle, color: 'text-red-400', bgColor: 'bg-red-400/10' },
    document: { icon: FileText, color: 'text-cyber-cyan', bgColor: 'bg-cyber-cyan/10' },
    financial: { icon: DollarSign, color: 'text-sgif-gold', bgColor: 'bg-sgif-gold/10' },
    governance: { icon: Users, color: 'text-purple-400', bgColor: 'bg-purple-400/10' },
    security: { icon: Shield, color: 'text-red-400', bgColor: 'bg-red-400/10' },
};

export function NotificationsCenter({
    notifications,
    onMarkAsRead,
    onMarkAllAsRead,
    onDelete,
    onClearAll,
    onNotificationClick,
    className,
}: NotificationsCenterProps) {
    const [filter, setFilter] = React.useState<'all' | 'unread'>('all');
    
    const filteredNotifications = React.useMemo(() => {
        if (filter === 'unread') {
            return notifications.filter(n => !n.read);
        }
        return notifications;
    }, [notifications, filter]);

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className={cn("glass-card w-96 max-h-[600px] flex flex-col overflow-hidden", className)}>
            {/* Header */}
            <div className="p-4 border-b border-white/5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Bell className="h-5 w-5 text-white" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyber-cyan rounded-full flex items-center justify-center text-[10px] font-bold text-black">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </div>
                        <h3 className="font-semibold text-white">Notifications</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onMarkAllAsRead}
                            className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                            title="Mark all as read"
                        >
                            <CheckCheck className="h-4 w-4" />
                        </button>
                        <button
                            onClick={onClearAll}
                            className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                            title="Clear all"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Filter tabs */}
                <div className="flex gap-1 p-1 bg-white/5 rounded-lg">
                    {(['all', 'unread'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                                filter === f
                                    ? "bg-white/10 text-white"
                                    : "text-gray-400 hover:text-white"
                            )}
                        >
                            {f === 'all' ? 'All' : `Unread (${unreadCount})`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Notifications list */}
            <div className="flex-1 overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                    <div className="p-8 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 mb-3">
                            <Bell className="h-6 w-6 text-gray-500" />
                        </div>
                        <p className="text-sm text-gray-400">
                            {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
                        </p>
                    </div>
                ) : (
                    <AnimatePresence initial={false}>
                        {filteredNotifications.map((notification, index) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onMarkAsRead={onMarkAsRead}
                                onDelete={onDelete}
                                onClick={onNotificationClick}
                                index={index}
                            />
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/5">
                <button className="w-full text-xs text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1">
                    <Settings className="h-3 w-3" />
                    Notification Settings
                </button>
            </div>
        </div>
    );
}

interface NotificationItemProps {
    notification: Notification;
    onMarkAsRead: (id: string) => void;
    onDelete: (id: string) => void;
    onClick?: (notification: Notification) => void;
    index: number;
}

function NotificationItem({ notification, onMarkAsRead, onDelete, onClick, index }: NotificationItemProps) {
    const config = typeConfig[notification.type];
    const Icon = config.icon;
    
    const priorityColors = {
        low: 'border-l-gray-500',
        medium: 'border-l-blue-400',
        high: 'border-l-yellow-400',
        critical: 'border-l-red-400',
    };

    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0, x: -100 }}
            transition={{ duration: 0.2 }}
        >
            <div
                onClick={() => {
                    if (!notification.read) onMarkAsRead(notification.id);
                    onClick?.(notification);
                }}
                className={cn(
                    "p-4 border-b border-white/5 cursor-pointer transition-colors group relative",
                    "hover:bg-white/[0.02]",
                    !notification.read && "bg-cyber-cyan/[0.03]",
                    notification.priority && `border-l-2 ${priorityColors[notification.priority]}`
                )}
            >
                <div className="flex gap-3">
                    {/* Icon */}
                    <div className={cn("p-2 rounded-lg flex-shrink-0", config.bgColor)}>
                        <Icon className={cn("h-4 w-4", config.color)} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                            <h4 className={cn(
                                "text-sm font-medium truncate",
                                notification.read ? "text-gray-300" : "text-white"
                            )}>
                                {notification.title}
                            </h4>
                            {!notification.read && (
                                <span className="w-2 h-2 bg-cyber-cyan rounded-full flex-shrink-0 mt-1.5" />
                            )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {notification.message}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-[10px] text-gray-600 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatTime(notification.timestamp)}
                            </span>
                            {notification.actionLabel && (
                                <span className="text-[10px] text-cyber-cyan flex items-center gap-0.5">
                                    {notification.actionLabel}
                                    <ChevronRight className="h-3 w-3" />
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Delete button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(notification.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/10 text-gray-500 hover:text-red-400 transition-all"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

/**
 * Notification Bell Button with Dropdown
 */
export function NotificationsBell() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [notifications, setNotifications] = React.useState<Notification[]>([
        {
            id: '1',
            type: 'financial',
            title: 'Q4 Distribution Approved',
            message: 'The LP distribution for Q4 2024 has been approved by the investment committee.',
            timestamp: new Date(Date.now() - 300000),
            read: false,
            priority: 'high',
            actionLabel: 'View Details',
        },
        {
            id: '2',
            type: 'document',
            title: 'New Document Uploaded',
            message: 'Due diligence report for Project Sahara has been uploaded to the data room.',
            timestamp: new Date(Date.now() - 3600000),
            read: false,
            actionLabel: 'Open Document',
        },
        {
            id: '3',
            type: 'governance',
            title: 'Vote Required',
            message: 'Your vote is required for the Project Phoenix capital call resolution.',
            timestamp: new Date(Date.now() - 7200000),
            read: false,
            priority: 'critical',
            actionLabel: 'Cast Vote',
        },
        {
            id: '4',
            type: 'security',
            title: 'New Login Detected',
            message: 'A new login was detected from Dubai, UAE at 10:42 AM.',
            timestamp: new Date(Date.now() - 86400000),
            read: true,
        },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1 right-1 w-4 h-4 bg-cyber-cyan rounded-full flex items-center justify-center text-[10px] font-bold text-black"
                    >
                        {unreadCount}
                    </motion.span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        
                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 top-full mt-2 z-50"
                        >
                            <NotificationsCenter
                                notifications={notifications}
                                onMarkAsRead={(id) => {
                                    setNotifications(prev => 
                                        prev.map(n => n.id === id ? { ...n, read: true } : n)
                                    );
                                }}
                                onMarkAllAsRead={() => {
                                    setNotifications(prev => 
                                        prev.map(n => ({ ...n, read: true }))
                                    );
                                }}
                                onDelete={(id) => {
                                    setNotifications(prev => prev.filter(n => n.id !== id));
                                }}
                                onClearAll={() => setNotifications([])}
                                onNotificationClick={() => setIsOpen(false)}
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
