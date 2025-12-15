import { Button } from "@sgif/ui";
import { Leaf, TrendingUp, Zap, Globe, BarChart3, ArrowUpRight } from "lucide-react";
import { Link } from "@/navigation";
import { FinancialChart } from "@/components/dashboard/financial-chart";

export default function CarbonPage() {
    return (
        <div className="flex flex-col gap-6 relative">
            {/* Background effects */}
            <div className="fixed top-1/4 right-1/4 w-96 h-96 bg-sgif-emerald/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
            <div className="fixed bottom-1/3 left-1/4 w-72 h-72 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-sgif-emerald/80 to-green-400 bg-clip-text text-transparent flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-sgif-emerald/10 border border-sgif-emerald/20">
                            <Leaf className="h-8 w-8 text-sgif-emerald animate-pulse-slow" />
                        </div>
                        Carbon Management
                    </h1>
                    <p className="text-gray-500 mt-2 flex items-center gap-2">
                        <Globe className="h-4 w-4 text-sgif-emerald" />
                        Real-time carbon offset tracking & forecasting
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/app/carbon/calculator">
                        <Button className="bg-gradient-to-r from-sgif-emerald to-green-500 hover:from-sgif-emerald/90 hover:to-green-500/90 text-white shadow-lg shadow-sgif-emerald/25 border border-sgif-emerald/30 transition-all duration-300 hover:shadow-sgif-emerald/40 hover:scale-105 group">
                            <Zap className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                            New Assessment
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-3">
                {/* Carbon Offset Card */}
                <div className="glass-card p-6 group hover:border-sgif-emerald/40 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 rounded-lg bg-sgif-emerald/10 border border-sgif-emerald/20">
                            <Leaf className="h-5 w-5 text-sgif-emerald" />
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-sgif-emerald/10 text-sgif-emerald border border-sgif-emerald/20">
                            +15% target
                        </span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-400">Total Offset (YTD)</h3>
                    <div className="text-3xl font-bold text-sgif-emerald mt-2 font-mono tracking-tight">1,240,000 t</div>
                    <div className="mt-3 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-sgif-emerald to-green-400 rounded-full shadow-lg shadow-sgif-emerald/50" />
                    </div>
                </div>
                
                {/* Credits Card */}
                <div className="glass-card p-6 group hover:border-cyber-cyan/40 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20">
                            <BarChart3 className="h-5 w-5 text-cyber-cyan" />
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20 font-mono">
                            Verra
                        </span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-400">Credits Available</h3>
                    <div className="text-3xl font-bold text-white mt-2 font-mono tracking-tight">450,000</div>
                    <p className="text-xs text-gray-500 mt-2">Verified Carbon Standard</p>
                </div>
                
                {/* Market Price Card */}
                <div className="glass-card p-6 group hover:border-sgif-gold/40 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 rounded-lg bg-sgif-gold/10 border border-sgif-gold/20">
                            <TrendingUp className="h-5 w-5 text-sgif-gold" />
                        </div>
                        <div className="flex items-center gap-1 text-sgif-emerald text-xs">
                            <ArrowUpRight className="h-3 w-3" />
                            +2.3%
                        </div>
                    </div>
                    <h3 className="text-sm font-medium text-gray-400">Market Price</h3>
                    <div className="text-3xl font-bold text-sgif-gold mt-2 font-mono tracking-tight">$24.50</div>
                    <p className="text-xs text-gray-500 mt-2">per carbon credit</p>
                </div>
            </div>

            {/* Forecasting Chart */}
            <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                        <div className="w-1 h-5 bg-gradient-to-b from-sgif-emerald to-green-400 rounded-full" />
                        Carbon Credit Forecasting
                    </h3>
                    <div className="flex items-center gap-2">
                        {["1M", "3M", "1Y", "ALL"].map((period, i) => (
                            <button
                                key={period}
                                className={`px-3 py-1 text-xs rounded-lg transition-all ${
                                    i === 2
                                        ? "bg-sgif-emerald/20 text-sgif-emerald border border-sgif-emerald/30"
                                        : "text-gray-500 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                {period}
                            </button>
                        ))}
                    </div>
                </div>
                <FinancialChart />
            </div>
        </div>
    );
}
