import { Button } from "@sgif/ui";
import { Download, TrendingUp, DollarSign, PieChart, BarChart3, ArrowUpRight, Wallet } from "lucide-react";
import { FinancialChart } from "@/components/dashboard/financial-chart";
import { Link } from "@/navigation";

export default function FundFinancialsPage() {
    return (
        <div className="flex flex-col gap-6 relative">
            {/* Background effects */}
            <div className="fixed top-1/4 right-1/4 w-96 h-96 bg-sgif-gold/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
            <div className="fixed bottom-1/3 left-1/4 w-72 h-72 bg-sgif-emerald/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-sgif-gold/80 to-orange-400 bg-clip-text text-transparent flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-sgif-gold/10 border border-sgif-gold/20">
                            <Wallet className="h-8 w-8 text-sgif-gold" />
                        </div>
                        Fund Performance
                    </h1>
                    <p className="text-gray-500 mt-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-sgif-emerald" />
                        Real-time fund analytics and investor metrics
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/app/financials/simulate">
                        <Button variant="outline" className="border-white/10 hover:border-sgif-gold/30 hover:bg-sgif-gold/10 hover:text-sgif-gold transition-all">
                            <PieChart className="mr-2 h-4 w-4" /> IRR Simulator
                        </Button>
                    </Link>
                    <Button className="bg-gradient-to-r from-sgif-gold to-orange-500 hover:from-sgif-gold/90 hover:to-orange-500/90 text-black font-semibold shadow-lg shadow-sgif-gold/25 border border-sgif-gold/30 transition-all duration-300 group">
                        <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" /> Investor Report
                    </Button>
                </div>
            </div>

            {/* KPI Strip */}
            <div className="grid gap-4 md:grid-cols-4">
                {[
                    { icon: DollarSign, label: "Total AUM", value: "$2.4B", change: "+12%", color: "sgif-gold" },
                    { icon: TrendingUp, label: "Fund IRR", value: "18.4%", change: "+2.1%", color: "sgif-emerald" },
                    { icon: BarChart3, label: "MOIC", value: "1.8x", change: "+0.3x", color: "cyber-cyan" },
                    { icon: PieChart, label: "Deployed", value: "72%", change: "+8%", color: "purple-400" },
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-5 group hover:border-white/20 transition-all duration-300">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`p-2 rounded-lg bg-${stat.color}/10 border border-${stat.color}/20`}>
                                <stat.icon className={`h-5 w-5 text-${stat.color}`} />
                            </div>
                            <div className="flex items-center gap-1 text-sgif-emerald text-xs font-mono">
                                <ArrowUpRight className="h-3 w-3" />
                                {stat.change}
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-white font-mono">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid gap-6 md:grid-cols-2">
                <div className="glass-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <div className="w-1 h-5 bg-gradient-to-b from-sgif-gold to-orange-400 rounded-full" />
                            Net Asset Value (NAV)
                        </h3>
                        <div className="flex items-center gap-2">
                            {["1Y", "3Y", "ALL"].map((period, i) => (
                                <button
                                    key={period}
                                    className={`px-3 py-1 text-xs rounded-lg transition-all ${
                                        i === 0
                                            ? "bg-sgif-gold/20 text-sgif-gold border border-sgif-gold/30"
                                            : "text-gray-500 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    {period}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-[300px]">
                        <FinancialChart />
                    </div>
                </div>
                <div className="glass-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <div className="w-1 h-5 bg-gradient-to-b from-cyber-cyan to-blue-400 rounded-full" />
                            Capital Deployment
                        </h3>
                    </div>
                    <div className="flex items-center justify-center h-[300px] rounded-xl bg-gradient-to-br from-cyber-cyan/5 to-blue-500/5 border border-cyber-cyan/10">
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-cyber-cyan/30 border-t-cyber-cyan animate-spin" style={{ animationDuration: '3s' }} />
                            <span className="text-gray-500">Loading Waterfall Data...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
