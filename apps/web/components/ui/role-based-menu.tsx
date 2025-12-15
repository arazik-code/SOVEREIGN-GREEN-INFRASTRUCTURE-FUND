"use client";

import * as React from "react";
import { Link, usePathname } from "@/navigation";
import { useAuth } from "@sgif/lib";
import { cn } from "@sgif/ui";
import { motion } from "framer-motion";
import {
    PieChart,
    Briefcase,
    Leaf,
    DollarSign,
    FileText,
    Settings,
    Users,
    Map as MapIcon,
    Cpu,
    Shield,
    Vote,
    BarChart3,
    Lightbulb,
    Building2,
    LucideIcon
} from "lucide-react";
import { 
    type UserRole, 
    type Permission, 
    hasPermission, 
    ROLE_DEFINITIONS,
    canAccessRoute 
} from "@sgif/lib";

interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
    color: string;
    permission?: Permission;
    badge?: string;
}

const NAV_ITEMS: NavItem[] = [
    { title: "Command Center", href: "/app/dashboard", icon: PieChart, color: "cyber-cyan", permission: "dashboard:view" },
    { title: "Projects", href: "/app/projects", icon: Briefcase, color: "sgif-gold", permission: "projects:view" },
    { title: "LP Portal", href: "/app/lp", icon: Building2, color: "blue-500", permission: "lp:view" },
    { title: "Carbon", href: "/app/carbon", icon: Leaf, color: "sgif-emerald", permission: "carbon:view" },
    { title: "Financials", href: "/app/financials", icon: DollarSign, color: "sgif-gold", permission: "financials:view" },
    { title: "Data Room", href: "/app/data-room", icon: FileText, color: "cyber-cyan", permission: "dataroom:view" },
    { title: "Governance", href: "/app/governance", icon: Vote, color: "purple-500", permission: "governance:view" },
    { title: "Reports", href: "/app/reports", icon: BarChart3, color: "sgif-gold", permission: "reports:view" },
    { title: "Insights", href: "/app/insights", icon: Lightbulb, color: "yellow-400", permission: "insights:view" },
    { title: "AI Copilot", href: "/app/ai", icon: Cpu, color: "purple-500", permission: "ai:view" },
    { title: "Maps", href: "/app/maps", icon: MapIcon, color: "sgif-emerald", permission: "maps:view" },
    { title: "Admin", href: "/app/admin", icon: Users, color: "sgif-gold", permission: "admin:view" },
    { title: "Settings", href: "/app/settings", icon: Settings, color: "gray-400" },
];

interface RoleBasedMenuProps {
    collapsed?: boolean;
    className?: string;
}

export function RoleBasedMenu({ collapsed = false, className }: RoleBasedMenuProps) {
    const { user } = useAuth();
    const pathname = usePathname();
    
    const userRole = (user?.role || 'lp') as UserRole;
    const roleInfo = ROLE_DEFINITIONS[userRole];

    // Filter nav items based on user permissions
    const visibleItems = React.useMemo(() => {
        return NAV_ITEMS.filter(item => {
            if (!item.permission) return true;
            return hasPermission(userRole, item.permission);
        });
    }, [userRole]);

    return (
        <div className={cn("flex flex-col gap-1", className)}>
            {/* Role indicator */}
            {!collapsed && (
                <div className="px-3 py-2 mb-2">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/5">
                        <Shield className={cn("h-4 w-4", `text-${roleInfo?.color || 'gray-400'}`)} />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500">Access Level</p>
                            <p className={cn("text-sm font-medium truncate", `text-${roleInfo?.color || 'white'}`)}>
                                {roleInfo?.displayName || 'Unknown'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation items */}
            {visibleItems.map((item, index) => {
                const isActive = pathname?.startsWith(item.href);
                const Icon = item.icon;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200",
                            isActive 
                                ? "bg-white/5 text-white" 
                                : "text-gray-500 hover:text-white hover:bg-white/5"
                        )}
                    >
                        {/* Active indicator */}
                        {isActive && (
                            <motion.div
                                layoutId="activeNav"
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyber-cyan to-sgif-gold rounded-r"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        
                        <div className={cn(
                            "relative p-1.5 rounded-md transition-colors",
                            isActive ? "bg-white/10" : "group-hover:bg-white/5"
                        )}>
                            <Icon className={cn(
                                "h-4 w-4 transition-colors",
                                isActive && `text-${item.color}`
                            )} />
                            {isActive && (
                                <div className={cn(
                                    "absolute inset-0 rounded-md blur-md opacity-50",
                                    `bg-${item.color}`
                                )} />
                            )}
                        </div>
                        
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2, delay: index * 0.02 }}
                                className={cn(
                                    "text-sm font-medium flex-1",
                                    isActive && "text-white"
                                )}
                            >
                                {item.title}
                            </motion.span>
                        )}

                        {/* Badge */}
                        {!collapsed && item.badge && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyber-cyan/20 text-cyber-cyan font-medium">
                                {item.badge}
                            </span>
                        )}

                        {/* Hover glow effect */}
                        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyber-cyan/5 to-transparent" />
                        </div>
                    </Link>
                );
            })}

            {/* Restricted items indicator */}
            {!collapsed && NAV_ITEMS.length !== visibleItems.length && (
                <div className="px-3 py-2 mt-4">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Shield className="h-3 w-3" />
                        <span>{NAV_ITEMS.length - visibleItems.length} sections restricted</span>
                    </div>
                </div>
            )}
        </div>
    );
}

/**
 * Quick role switcher for development/demo purposes
 */
export function RoleSwitcher({ className }: { className?: string }) {
    const { user, login } = useAuth();
    const [isOpen, setIsOpen] = React.useState(false);
    
    const currentRole = (user?.role || 'LP') as UserRole;
    const currentRoleInfo = ROLE_DEFINITIONS[currentRole];

    const handleRoleSwitch = async (role: UserRole) => {
        await login(user?.email || 'demo@sgif.gov', role);
        setIsOpen(false);
    };

    const roles: UserRole[] = ['Founder', 'GP', 'Admin', 'Advisor', 'LP', 'Auditor', 'Government_Observer'];

    return (
        <div className={cn("relative", className)}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            >
                <Shield className={cn("h-4 w-4", `text-${currentRoleInfo.color}`)} />
                <span className="text-sm text-gray-300">{currentRoleInfo.displayName}</span>
            </button>

            {isOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute bottom-full left-0 mb-2 w-56 glass-card p-2 z-50">
                        <p className="text-xs text-gray-500 px-2 py-1 mb-1">Switch Role (Demo)</p>
                        {roles.map(role => {
                            const info = ROLE_DEFINITIONS[role];
                            const isActive = role === currentRole;
                            
                            return (
                                <button
                                    key={role}
                                    onClick={() => handleRoleSwitch(role)}
                                    className={cn(
                                        "w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left transition-colors",
                                        isActive 
                                            ? "bg-white/10 text-white" 
                                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <Shield className={cn("h-4 w-4", `text-${info.color}`)} />
                                    <span className="text-sm">{info.displayName}</span>
                                    {isActive && (
                                        <span className="ml-auto text-xs text-cyber-cyan">Active</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
