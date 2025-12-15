"use client";

import * as React from "react";
import { Link } from "@/navigation";
import { useAuth } from "@sgif/lib";
import { Button, cn } from "@sgif/ui";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Menu, Bell, User, Search, LogOut, Shield, Command, 
    Sparkles, Settings, HelpCircle, ChevronDown, Activity,
    Zap, Globe
} from "lucide-react";

export const TopNav = React.memo(function TopNav({
    onMenuClick,
}: {
    onMenuClick: () => void;
}) {
    const { user, logout } = useAuth();
    const [searchFocused, setSearchFocused] = React.useState(false);
    const [showUserMenu, setShowUserMenu] = React.useState(false);
    const [showNotifications, setShowNotifications] = React.useState(false);

    // Sample notifications
    const notifications = [
        { id: 1, title: "Project Alpha Approved", time: "2m ago", type: "success", unread: true },
        { id: 2, title: "New LP Investment Received", time: "1h ago", type: "info", unread: true },
        { id: 3, title: "Carbon Audit Complete", time: "3h ago", type: "success", unread: false },
        { id: 4, title: "Risk Alert: Market Volatility", time: "5h ago", type: "warning", unread: false },
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-black/80 backdrop-blur-xl">
            {/* Animated top accent line */}
            <motion.div 
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                    background: "linear-gradient(90deg, rgba(0,212,255,0.5), rgba(212,175,55,0.3), rgba(2,154,118,0.5))"
                }}
                animate={{
                    backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="flex h-16 items-center px-4">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden mr-2 text-gray-400 hover:text-cyber-cyan hover:bg-cyber-cyan/10" 
                    onClick={onMenuClick}
                >
                    <Menu className="h-5 w-5" />
                </Button>

                {/* Quick nav links with animations */}
                <div className="mr-4 hidden md:flex">
                    <nav className="flex items-center space-x-1 text-sm font-medium">
                        {[
                            { href: "/app/projects", label: "Projects", icon: Activity },
                            { href: "/app/carbon", label: "Carbon", icon: Globe },
                            { href: "/app/financials", label: "Financials", icon: Zap },
                        ].map((link, index) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    className="group px-3 py-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2"
                                >
                                    <link.icon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>
                </div>

                <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
                    {/* Enhanced Search */}
                    <motion.div 
                        className="w-full flex-1 md:w-auto md:flex-none"
                        animate={{ scale: searchFocused ? 1.02 : 1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <div className={cn(
                            "relative transition-all duration-300 rounded-xl",
                            searchFocused && "shadow-[0_0_30px_rgba(0,212,255,0.15)]"
                        )}>
                            <Search className={cn(
                                "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors",
                                searchFocused ? "text-cyber-cyan" : "text-gray-600"
                            )} />
                            <input
                                type="search"
                                placeholder="Search systems..."
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                                className={cn(
                                    "flex h-11 w-full rounded-xl border bg-white/5 px-4 py-2 pl-11 text-sm font-mono",
                                    "placeholder:text-gray-600 text-white",
                                    "focus:outline-none transition-all duration-300",
                                    "md:w-[220px] lg:w-[320px]",
                                    searchFocused 
                                        ? "border-cyber-cyan/50 bg-cyber-cyan/5" 
                                        : "border-white/10"
                                )}
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1">
                                <kbd className="h-5 px-1.5 rounded border border-white/10 bg-white/5 font-mono text-[10px] text-gray-500 flex items-center gap-0.5">
                                    <Command className="h-2.5 w-2.5" />K
                                </kbd>
                            </div>
                            
                            {/* AI search indicator */}
                            <AnimatePresence>
                                {searchFocused && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 5 }}
                                        className="absolute left-0 right-0 -bottom-8 flex items-center justify-center gap-2 text-[10px] text-gray-500"
                                    >
                                        <Sparkles className="w-3 h-3 text-purple-400" />
                                        <span>AI-powered search available</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Status indicators */}
                    <div className="hidden xl:flex items-center gap-3">
                        <motion.div 
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sgif-emerald/10 border border-sgif-emerald/20"
                            animate={{ borderColor: ["rgba(2,154,118,0.2)", "rgba(2,154,118,0.4)", "rgba(2,154,118,0.2)"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sgif-emerald opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-sgif-emerald"></span>
                            </span>
                            <span className="text-[10px] text-sgif-emerald font-mono font-bold tracking-wider">SECURE</span>
                        </motion.div>
                        
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20">
                            <Activity className="w-3 h-3 text-cyber-cyan" />
                            <span className="text-[10px] text-cyber-cyan font-mono">API: 23ms</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                        {/* Notifications */}
                        <div className="relative">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="relative text-gray-400 hover:text-white hover:bg-white/5"
                                onClick={() => setShowNotifications(!showNotifications)}
                            >
                                <Bell className="h-5 w-5" />
                                {unreadCount > 0 && (
                                    <motion.span 
                                        className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-cyber-cyan rounded-full text-[10px] font-bold text-black flex items-center justify-center"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        {unreadCount}
                                    </motion.span>
                                )}
                            </Button>
                            
                            <AnimatePresence>
                                {showNotifications && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 top-full mt-2 w-80 z-50 rounded-xl border border-white/10 bg-gray-900/95 backdrop-blur-xl shadow-2xl overflow-hidden"
                                        >
                                            <div className="p-4 border-b border-white/5 flex items-center justify-between">
                                                <h3 className="font-semibold text-white text-sm">Notifications</h3>
                                                <span className="text-[10px] text-cyber-cyan font-mono">{unreadCount} NEW</span>
                                            </div>
                                            <div className="max-h-80 overflow-y-auto">
                                                {notifications.map((notif, i) => (
                                                    <motion.div
                                                        key={notif.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.05 }}
                                                        className={cn(
                                                            "p-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer",
                                                            notif.unread && "bg-cyber-cyan/5"
                                                        )}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div className={cn(
                                                                "w-2 h-2 rounded-full mt-1.5 flex-shrink-0",
                                                                notif.type === "success" && "bg-sgif-emerald",
                                                                notif.type === "warning" && "bg-sgif-gold",
                                                                notif.type === "info" && "bg-cyber-cyan"
                                                            )} />
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm text-white truncate">{notif.title}</p>
                                                                <p className="text-[10px] text-gray-500 font-mono">{notif.time}</p>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                            <div className="p-3 border-t border-white/5">
                                                <button className="w-full text-center text-xs text-cyber-cyan hover:text-cyber-cyan/80 transition-colors">
                                                    View all notifications
                                                </button>
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                        
                        {user ? (
                            <div className="relative">
                                <motion.button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyber-cyan/30 transition-all group"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="relative">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyber-cyan to-sgif-gold flex items-center justify-center">
                                            <User className="h-4 w-4 text-black" />
                                        </div>
                                        <motion.div 
                                            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-sgif-emerald rounded-full border-2 border-gray-900"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </div>
                                    <div className="hidden sm:flex flex-col items-start">
                                        <span className="text-xs text-white font-medium">{user.name}</span>
                                        <span className="text-[10px] text-gray-500 font-mono">{user.role || 'Operator'}</span>
                                    </div>
                                    <ChevronDown className={cn(
                                        "w-4 h-4 text-gray-500 transition-transform",
                                        showUserMenu && "rotate-180"
                                    )} />
                                </motion.button>
                                
                                <AnimatePresence>
                                    {showUserMenu && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className="absolute right-0 top-full mt-2 w-56 z-50 rounded-xl border border-white/10 bg-gray-900/95 backdrop-blur-xl shadow-2xl overflow-hidden"
                                            >
                                                <div className="p-4 border-b border-white/5">
                                                    <p className="text-sm text-white font-medium">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                                <div className="p-2">
                                                    {[
                                                        { icon: User, label: "Profile", href: "/app/settings" },
                                                        { icon: Settings, label: "Settings", href: "/app/settings" },
                                                        { icon: HelpCircle, label: "Help Center", href: "/help" },
                                                    ].map((item, i) => (
                                                        <Link
                                                            key={item.label}
                                                            href={item.href}
                                                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                                                            onClick={() => setShowUserMenu(false)}
                                                        >
                                                            <item.icon className="w-4 h-4" />
                                                            <span className="text-sm">{item.label}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                                <div className="p-2 border-t border-white/5">
                                                    <button
                                                        onClick={() => {
                                                            logout();
                                                            setShowUserMenu(false);
                                                        }}
                                                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                                                    >
                                                        <LogOut className="w-4 h-4" />
                                                        <span className="text-sm">Sign Out</span>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button 
                                    size="sm"
                                    className="bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black font-semibold shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                                >
                                    <Shield className="h-4 w-4 mr-1" />
                                    Login
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
});
