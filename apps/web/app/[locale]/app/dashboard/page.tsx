"use client";

import { Button } from "@sgif/ui";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { FinancialChart } from "@/components/dashboard/financial-chart";
import { ProjectMap } from "@/components/dashboard/project-map";
import { Briefcase, Leaf, TrendingUp, DollarSign, Download, Activity, Zap, Radio } from "lucide-react";
import { useKpi } from "@/hooks/use-data";

export default function DashboardPage() {
    const { data: kpis, isLoading } = useKpi();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-cyber-cyan/20 border-t-cyber-cyan rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-cyber-cyan animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 relative">
            {/* Background effects */}
            <div className="fixed top-0 right-0 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-80 h-80 bg-sgif-gold/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                            Command Center
                        </h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan"></span>
                            </span>
                            <span className="text-xs text-cyber-cyan font-mono">SYSTEMS ONLINE</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10 gap-2">
                        <Radio className="w-4 h-4" />
                        Live Feed
                    </Button>
                    <Button className="bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black font-semibold gap-2 shadow-neon-cyan">
                        <Download className="w-4 h-4" />
                        Export Report
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KpiCard
                    title="Total AUM"
                    value={kpis?.aum || "--"}
                    trend="+20% from last month"
                    trendDirection="up"
                    icon={<DollarSign className="h-5 w-5 text-sgif-gold" />}
                    glowColor="gold"
                />
                <KpiCard
                    title="Active Projects"
                    value={kpis?.activeProjects?.toString() || "--"}
                    trend="+2 new projects"
                    trendDirection="up"
                    icon={<Briefcase className="h-5 w-5 text-cyber-cyan" />}
                    glowColor="cyan"
                />
                <KpiCard
                    title="Carbon Offset"
                    value={kpis?.carbonOffset || "--"}
                    trend="Verified 100%"
                    trendDirection="up"
                    icon={<Leaf className="h-5 w-5 text-sgif-emerald" />}
                    glowColor="emerald"
                />
                <KpiCard
                    title="IRR (Avg)"
                    value={kpis?.irr || "--"}
                    trend="Target: 12%"
                    trendDirection="neutral"
                    icon={<TrendingUp className="h-5 w-5 text-cyber-purple" />}
                    glowColor="purple"
                />
            </div>

            {/* Main content grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Chart */}
                <div className="col-span-4 glass-card p-6 h-[420px] relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent" />
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <Activity className="w-4 h-4 text-cyber-cyan" />
                            Portfolio Performance
                        </h3>
                        <span className="text-xs text-cyber-cyan font-mono bg-cyber-cyan/10 px-2 py-1 rounded">REAL-TIME</span>
                    </div>
                    <div className="h-[340px] w-full">
                        <FinancialChart />
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="col-span-3 glass-card p-6 h-[420px] relative overflow-hidden scan-line">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sgif-gold to-transparent" />
                    <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-sgif-gold" />
                        Activity Stream
                    </h3>
                    <ul className="space-y-3">
                        {[
                            { action: "Project Alpha Approved", time: "2h ago", status: "success" },
                            { action: "Carbon Audit Completed", time: "5h ago", status: "success" },
                            { action: "New LP Investment", time: "1d ago", status: "info" },
                            { action: "Risk Assessment Updated", time: "1d ago", status: "warning" },
                            { action: "Q3 Report Generated", time: "2d ago", status: "info" },
                        ].map((item, i) => (
                            <li key={i} className="group flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyber-cyan/30 transition-all">
                                <div className="flex items-center gap-3">
                                    <span className={`w-2 h-2 rounded-full ${
                                        item.status === 'success' ? 'bg-sgif-emerald' :
                                        item.status === 'warning' ? 'bg-sgif-gold' : 'bg-cyber-cyan'
                                    } animate-pulse`} />
                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{item.action}</span>
                                </div>
                                <span className="text-xs text-gray-600 font-mono">{item.time}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Map Section */}
            <div className="glass-card p-6 h-[400px] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sgif-emerald to-transparent" />
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Radio className="w-4 h-4 text-sgif-emerald animate-pulse" />
                    Asset Locations
                    <span className="ml-auto text-xs text-sgif-emerald font-mono bg-sgif-emerald/10 px-2 py-1 rounded">8 ACTIVE SITES</span>
                </h3>
                <div className="h-[320px] rounded-lg overflow-hidden border border-white/10">
                    <ProjectMap />
                </div>
            </div>
        </div>
    );
}
