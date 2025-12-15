import { Button } from "@sgif/ui";
import { Users, Shield, Activity, Database, Key, FileText, Hexagon, Zap, Radio, Terminal } from "lucide-react";

export default function AdminPage() {
    return (
        <div className="flex flex-col gap-6 relative">
            {/* Background effects */}
            <div className="fixed top-20 left-20 w-80 h-80 bg-sgif-gold/5 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed bottom-20 right-20 w-64 h-64 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-sgif-gold to-white bg-clip-text text-transparent flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-sgif-gold/10 border border-sgif-gold/20">
                            <Shield className="h-8 w-8 text-sgif-gold" />
                        </div>
                        System Administration
                    </h1>
                    <p className="text-gray-500 mt-2 flex items-center gap-2">
                        <Terminal className="h-4 w-4" />
                        Sovereign-grade access control
                    </p>
                </div>
            </div>

            {/* Status Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                {[
                    { label: "Active Users", value: "24", sub: "3 pending", icon: Users, color: "sgif-gold", status: "normal" },
                    { label: "Security Status", value: "SECURE", sub: "All systems", icon: Shield, color: "sgif-emerald", status: "secure" },
                    { label: "API Calls (24h)", value: "12.4K", sub: "99.9% success", icon: Activity, color: "cyber-cyan", status: "active" },
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-6 relative overflow-hidden group">
                        <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-${stat.color} to-transparent`} />
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</span>
                            <div className={`p-2 rounded-lg bg-${stat.color}/10`}>
                                <stat.icon className={`h-4 w-4 text-${stat.color}`} />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <p className={`text-3xl font-bold font-mono ${stat.status === 'secure' ? 'text-sgif-emerald' : 'text-white'}`}>
                                {stat.value}
                            </p>
                            {stat.status === 'secure' && (
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sgif-emerald opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sgif-emerald"></span>
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{stat.sub}</p>
                    </div>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* User Management */}
                <div className="glass-card p-6 relative overflow-hidden scan-line">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-cyber-cyan to-transparent" />
                    <h3 className="font-semibold mb-4 text-white flex items-center gap-2">
                        <Users className="h-5 w-5 text-cyber-cyan" /> 
                        Personnel Registry
                        <span className="ml-auto text-xs text-cyber-cyan font-mono bg-cyber-cyan/10 px-2 py-1 rounded">LIVE</span>
                    </h3>
                    <div className="space-y-3">
                        {[
                            { name: "John Smith", role: "System Admin", status: "active", time: "2h ago" },
                            { name: "Sarah Johnson", role: "LP Partner", status: "idle", time: "1d ago" },
                            { name: "Ahmed Al-Rashid", role: "Analyst", status: "online", time: "Now" },
                        ].map((user, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyber-cyan/30 transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-cyan/20 to-sgif-gold/20 flex items-center justify-center border border-white/10">
                                        <span className="text-sm font-bold text-white">{user.name.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${
                                            user.status === 'online' ? 'bg-sgif-emerald animate-pulse' :
                                            user.status === 'active' ? 'bg-cyber-cyan' : 'bg-gray-500'
                                        }`} />
                                        <span className="text-xs text-gray-500 font-mono">{user.time}</span>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cyber-cyan">
                                        Manage
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 border-white/10 hover:border-cyber-cyan/30">
                        View All Personnel
                    </Button>
                </div>

                {/* Quick Actions */}
                <div className="glass-card p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-sgif-gold to-transparent" />
                    <h3 className="font-semibold mb-4 text-white flex items-center gap-2">
                        <Zap className="h-5 w-5 text-sgif-gold" /> System Controls
                    </h3>
                    <div className="space-y-3">
                        {[
                            { label: "API Key Management", icon: Key, color: "cyber-cyan" },
                            { label: "Database Operations", icon: Database, color: "sgif-emerald" },
                            { label: "Audit Log Viewer", icon: FileText, color: "sgif-gold" },
                            { label: "System Diagnostics", icon: Activity, color: "purple-500" },
                        ].map((action, i) => (
                            <Button 
                                key={i} 
                                variant="outline" 
                                className="w-full justify-start gap-3 border-white/10 hover:border-white/20 hover:bg-white/5 group h-12"
                            >
                                <div className={`p-1.5 rounded-md bg-${action.color}/10 group-hover:bg-${action.color}/20 transition-colors`}>
                                    <action.icon className={`h-4 w-4 text-${action.color}`} />
                                </div>
                                {action.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* System Status Bar */}
            <div className="glass-card p-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-sgif-emerald via-cyber-cyan to-sgif-gold" />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Radio className="h-4 w-4 text-sgif-emerald animate-pulse" />
                            <span className="text-sm text-sgif-emerald font-mono">ALL SYSTEMS OPERATIONAL</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-xs text-gray-500 font-mono">
                        <span>UPTIME: 99.99%</span>
                        <span>LATENCY: 12ms</span>
                        <span>NODES: 8/8</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
