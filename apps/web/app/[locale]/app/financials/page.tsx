import { Link } from "@/navigation";
import { Button } from "@sgif/ui";
import { DollarSign, TrendingUp, Calculator, PieChart, Zap, ArrowUpRight, Activity } from "lucide-react";
import { FinancialChart } from "@/components/dashboard/financial-chart";

export default function FinancialsPage() {
    return (
        <div className="flex flex-col gap-6 relative">
            {/* Background effects */}
            <div className="fixed top-20 right-20 w-80 h-80 bg-sgif-gold/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-sgif-gold to-white bg-clip-text text-transparent flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-sgif-gold/10 border border-sgif-gold/20">
                            <DollarSign className="h-8 w-8 text-sgif-gold" />
                        </div>
                        Financial Systems
                    </h1>
                    <p className="text-gray-500 mt-2 flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sgif-emerald opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-sgif-emerald"></span>
                        </span>
                        Real-time portfolio analytics
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" asChild className="border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10 gap-2">
                        <Link href="/app/financials/simulate">
                            <Calculator className="h-4 w-4" /> IRR Simulator
                        </Link>
                    </Button>
                    <Button asChild className="bg-gradient-to-r from-sgif-gold to-sgif-emerald text-black font-semibold gap-2 shadow-neon-gold">
                        <Link href="/app/financials/fund">
                            <PieChart className="h-4 w-4" /> Fund Details
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Main KPI Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                {[
                    { label: "Total AUM", value: "$487M", change: "+12.5%", icon: TrendingUp, color: "sgif-gold" },
                    { label: "Deployed Capital", value: "$312M", change: "64%", icon: Activity, color: "cyber-cyan" },
                    { label: "Blended IRR", value: "14.2%", change: "Target: 12%", icon: Zap, color: "sgif-emerald" },
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-6 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                        <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-${stat.color} to-transparent`} />
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</span>
                            <div className={`p-2 rounded-lg bg-${stat.color}/10`}>
                                <stat.icon className={`h-4 w-4 text-${stat.color}`} />
                            </div>
                        </div>
                        <p className="text-4xl font-bold text-white font-mono mb-2">{stat.value}</p>
                        <div className="flex items-center gap-1 text-sm text-sgif-emerald">
                            <ArrowUpRight className="h-4 w-4" />
                            {stat.change}
                        </div>
                        <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity bg-${stat.color}`} />
                    </div>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="glass-card p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-cyber-cyan to-transparent" />
                    <h3 className="font-semibold mb-4 text-white flex items-center gap-2">
                        <Activity className="h-4 w-4 text-cyber-cyan" />
                        Portfolio Performance
                    </h3>
                    <div className="h-[300px]">
                        <FinancialChart />
                    </div>
                </div>
                <div className="glass-card p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-sgif-gold to-transparent" />
                    <h3 className="font-semibold mb-4 text-white flex items-center gap-2">
                        <Zap className="h-4 w-4 text-sgif-gold" />
                        Quick Actions
                    </h3>
                    <div className="space-y-3">
                        {[
                            { label: "View Fund Performance", href: "/app/financials/fund" },
                            { label: "Run IRR Simulation", href: "/app/financials/simulate" },
                            { label: "Download Quarterly Report", href: "#" },
                            { label: "View LP Statements", href: "#" },
                        ].map((action, i) => (
                            <Button 
                                key={i} 
                                variant="outline" 
                                className="w-full justify-between border-white/10 hover:border-cyber-cyan/30 hover:bg-cyber-cyan/5 group" 
                                asChild={action.href !== "#"}
                            >
                                {action.href !== "#" ? (
                                    <Link href={action.href}>
                                        {action.label}
                                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                ) : (
                                    <span>
                                        {action.label}
                                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </span>
                                )}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
