"use client";

import { useState } from "react";
import { cn } from "@sgif/ui";
import { Button } from "@sgif/ui";
import { motion } from "framer-motion";
import {
    Users,
    Plus,
    Search,
    Filter,
    MoreVertical,
    Shield,
    Mail,
    Clock,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    ChevronDown,
    UserPlus,
    Settings,
    Trash2,
    Edit3,
    Eye,
    Download,
    Lock,
    Unlock,
    RefreshCw
} from "lucide-react";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: "active" | "pending" | "suspended" | "inactive";
    lastActive: string;
    mfaEnabled: boolean;
    organization?: string;
    avatar?: string;
}

const users: User[] = [
    { id: "1", name: "Sarah Chen", email: "sarah.chen@sgif.gov", role: "Managing Partner", status: "active", lastActive: "Just now", mfaEnabled: true },
    { id: "2", name: "Dr. Ahmed Hassan", email: "ahmed.hassan@sgif.gov", role: "CIO", status: "active", lastActive: "5 min ago", mfaEnabled: true },
    { id: "3", name: "James Williams", email: "james.williams@sgif.gov", role: "Head of ESG", status: "active", lastActive: "1 hour ago", mfaEnabled: true },
    { id: "4", name: "Mohammed Al-Rashid", email: "m.alrashid@mof.gov", role: "Government Observer", status: "active", lastActive: "2 hours ago", mfaEnabled: true, organization: "Ministry of Finance" },
    { id: "5", name: "Emily Thompson", email: "emily.t@adia.gov", role: "LP Viewer", status: "active", lastActive: "Yesterday", mfaEnabled: true, organization: "ADIA" },
    { id: "6", name: "David Park", email: "david.park@pwc.com", role: "Auditor", status: "active", lastActive: "3 days ago", mfaEnabled: true, organization: "PwC" },
    { id: "7", name: "Lisa Morgan", email: "lisa.m@invited.com", role: "LP Viewer", status: "pending", lastActive: "Invited Dec 10", mfaEnabled: false, organization: "Mubadala" },
    { id: "8", name: "John Smith", email: "john.s@suspended.com", role: "Portfolio Manager", status: "suspended", lastActive: "Nov 15, 2024", mfaEnabled: false },
];

const roleConfig: Record<string, { color: string; icon: React.ElementType }> = {
    "Managing Partner": { color: "sgif-gold", icon: Shield },
    "CIO": { color: "cyber-cyan", icon: Shield },
    "Head of ESG": { color: "sgif-emerald", icon: Shield },
    "Government Observer": { color: "purple-400", icon: Eye },
    "LP Viewer": { color: "blue-400", icon: Eye },
    "Auditor": { color: "pink-400", icon: Shield },
    "Portfolio Manager": { color: "orange-400", icon: Settings },
};

const statusConfig = {
    active: { color: "sgif-emerald", label: "Active", icon: CheckCircle2 },
    pending: { color: "sgif-gold", label: "Pending", icon: Clock },
    suspended: { color: "red-500", label: "Suspended", icon: XCircle },
    inactive: { color: "gray-500", label: "Inactive", icon: AlertTriangle },
};

export default function AdminUsersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState<string>("all");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [showInviteModal, setShowInviteModal] = useState(false);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = selectedRole === "all" || user.role === selectedRole;
        const matchesStatus = selectedStatus === "all" || user.status === selectedStatus;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const toggleUserSelection = (userId: string) => {
        setSelectedUsers(prev => 
            prev.includes(userId) 
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const toggleSelectAll = () => {
        if (selectedUsers.length === filteredUsers.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredUsers.map(u => u.id));
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">User Management</h1>
                    <p className="text-gray-400 mt-1">Manage users, roles, and permissions</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="border-white/10 gap-2">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                    <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black gap-2"
                        onClick={() => setShowInviteModal(true)}
                    >
                        <UserPlus className="h-4 w-4" />
                        Invite User
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Users", value: users.length.toString(), color: "cyber-cyan", icon: Users },
                    { label: "Active", value: users.filter(u => u.status === "active").length.toString(), color: "sgif-emerald", icon: CheckCircle2 },
                    { label: "Pending Invites", value: users.filter(u => u.status === "pending").length.toString(), color: "sgif-gold", icon: Clock },
                    { label: "MFA Enabled", value: `${Math.round(users.filter(u => u.mfaEnabled).length / users.length * 100)}%`, color: "purple-400", icon: Shield },
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
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-9 pr-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan/50"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyber-cyan/50"
                    >
                        <option value="all" className="bg-gray-900">All Roles</option>
                        {Object.keys(roleConfig).map(role => (
                            <option key={role} value={role} className="bg-gray-900">{role}</option>
                        ))}
                    </select>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyber-cyan/50"
                    >
                        <option value="all" className="bg-gray-900">All Status</option>
                        <option value="active" className="bg-gray-900">Active</option>
                        <option value="pending" className="bg-gray-900">Pending</option>
                        <option value="suspended" className="bg-gray-900">Suspended</option>
                    </select>
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedUsers.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20"
                >
                    <span className="text-sm text-white">
                        {selectedUsers.length} user{selectedUsers.length > 1 ? "s" : ""} selected
                    </span>
                    <div className="flex items-center gap-2 ml-auto">
                        <Button variant="outline" size="sm" className="border-white/10 gap-2">
                            <Mail className="h-4 w-4" />
                            Send Email
                        </Button>
                        <Button variant="outline" size="sm" className="border-white/10 gap-2">
                            <Lock className="h-4 w-4" />
                            Suspend
                        </Button>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10 gap-2"
                        >
                            <Trash2 className="h-4 w-4" />
                            Remove
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Users Table */}
            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-white/10 bg-white/[0.02]">
                                <th className="p-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 rounded border-white/20 bg-white/5"
                                    />
                                </th>
                                <th className="p-4 text-sm font-medium text-gray-400">User</th>
                                <th className="p-4 text-sm font-medium text-gray-400">Role</th>
                                <th className="p-4 text-sm font-medium text-gray-400">Status</th>
                                <th className="p-4 text-sm font-medium text-gray-400">Last Active</th>
                                <th className="p-4 text-sm font-medium text-gray-400">MFA</th>
                                <th className="p-4 text-sm font-medium text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, i) => {
                                const roleConf = roleConfig[user.role] || { color: "gray-400", icon: Users };
                                const statusConf = statusConfig[user.status];

                                return (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.03 }}
                                        className={cn(
                                            "border-b border-white/5 hover:bg-white/[0.02] transition-colors",
                                            selectedUsers.includes(user.id) && "bg-cyber-cyan/5"
                                        )}
                                    >
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user.id)}
                                                onChange={() => toggleUserSelection(user.id)}
                                                className="w-4 h-4 rounded border-white/20 bg-white/5"
                                            />
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyber-cyan/20 to-sgif-gold/20 border border-white/10 flex items-center justify-center">
                                                    <span className="text-sm font-medium text-white">
                                                        {user.name.split(" ").map(n => n[0]).join("")}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{user.name}</p>
                                                    <p className="text-sm text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <span className={cn(
                                                    "text-xs px-2 py-0.5 rounded-full border",
                                                    `bg-${roleConf.color}/10 text-${roleConf.color} border-${roleConf.color}/20`
                                                )}>
                                                    {user.role}
                                                </span>
                                                {user.organization && (
                                                    <span className="text-xs text-gray-600">
                                                        {user.organization}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={cn(
                                                "flex items-center gap-1 text-xs",
                                                `text-${statusConf.color}`
                                            )}>
                                                <statusConf.icon className="h-3 w-3" />
                                                {statusConf.label}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-500">
                                            {user.lastActive}
                                        </td>
                                        <td className="p-4">
                                            {user.mfaEnabled ? (
                                                <CheckCircle2 className="h-4 w-4 text-sgif-emerald" />
                                            ) : (
                                                <XCircle className="h-4 w-4 text-gray-600" />
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <Edit3 className="h-4 w-4 text-gray-400" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <MoreVertical className="h-4 w-4 text-gray-400" />
                                                </Button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
