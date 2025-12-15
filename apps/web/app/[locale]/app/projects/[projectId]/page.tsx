import { Button } from "@sgif/ui";
import { ArrowLeft, Download, ExternalLink, Sun, Zap, TrendingUp, Calendar, Users, MapPin, Target } from "lucide-react";
import { Link } from "@/navigation";
import { FinancialChart } from "@/components/dashboard/financial-chart";

export default function ProjectDetailPage({ params }: { params: { projectId: string } }) {
    return (
        <div className="flex flex-col gap-6 relative">
            {/* Background effects */}
            <div className="fixed top-1/4 right-1/4 w-96 h-96 bg-sgif-gold/5 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed bottom-1/3 left-1/4 w-72 h-72 bg-sgif-emerald/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/app/projects">
                    <Button variant="ghost" size="icon" className="rounded-xl border border-white/10 hover:border-sgif-gold/30 hover:bg-sgif-gold/10 hover:text-sgif-gold transition-all group">
                        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                    </Button>
                </Link>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-sgif-gold/80 to-orange-400 bg-clip-text text-transparent flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-sgif-gold/10 border border-sgif-gold/20">
                            <Sun className="h-6 w-6 text-sgif-gold" />
                        </div>
                        Al Dhafra Solar PV
                        <span className="text-sm font-normal bg-sgif-emerald/10 text-sgif-emerald px-3 py-1 rounded-full border border-sgif-emerald/20">
                            <Zap className="h-3 w-3 inline mr-1" />
                            Construction
                        </span>
                    </h1>
                    <p className="text-gray-500 mt-1 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        ID: {params.projectId} • United Arab Emirates • 2GW Capacity
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-white/10 hover:border-cyber-cyan/30 hover:bg-cyber-cyan/10 hover:text-cyber-cyan transition-all group">
                        <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" /> Export Teaser
                    </Button>
                    <Button className="bg-gradient-to-r from-sgif-gold to-orange-500 hover:from-sgif-gold/90 hover:to-orange-500/90 text-black font-semibold shadow-lg shadow-sgif-gold/25 border border-sgif-gold/30 transition-all duration-300">
                        <ExternalLink className="mr-2 h-4 w-4" /> Data Room
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="col-span-2 space-y-6">
                    {/* Financial Projections */}
                    <div className="glass-card p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold text-white flex items-center gap-2">
                                <div className="w-1 h-5 bg-gradient-to-b from-sgif-gold to-orange-400 rounded-full" />
                                Financial Projections
                            </h3>
                            <div className="flex items-center gap-2">
                                {["1Y", "5Y", "Life"].map((period, i) => (
                                    <button
                                        key={period}
                                        className={`px-3 py-1 text-xs rounded-lg transition-all ${
                                            i === 1
                                                ? "bg-sgif-gold/20 text-sgif-gold border border-sgif-gold/30"
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
                    
                    {/* Project Overview */}
                    <div className="glass-card p-6">
                        <h3 className="font-semibold mb-4 text-white flex items-center gap-2">
                            <div className="w-1 h-5 bg-gradient-to-b from-cyber-cyan to-blue-400 rounded-full" />
                            Project Overview
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            The Al Dhafra Solar PV project will be the world's largest single-site solar power plant, using approximately 4 million solar panels to generate enough electricity for approximately 160,000 homes across the UAE. It will mitigate 2.4 million tonnes of CO2 annually, contributing significantly to the UAE's clean energy goals and the global transition to sustainable infrastructure.
                        </p>
                        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
                            {[
                                { label: "Panels", value: "4M+" },
                                { label: "Homes Powered", value: "160K" },
                                { label: "CO2 Mitigation", value: "2.4M t/yr" },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                                    <p className="text-lg font-bold text-white font-mono">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Key Metrics */}
                    <div className="glass-card p-6 space-y-4">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <Target className="h-5 w-5 text-sgif-gold" />
                            Key Metrics
                        </h3>
                        {[
                            { label: "Total Budget", value: "$1.2B", color: "white" },
                            { label: "Equity Ticket", value: "$300M", color: "text-sgif-gold" },
                            { label: "Target IRR", value: "8.5%", color: "text-sgif-emerald" },
                            { label: "COD Date", value: "Q4 2025", color: "text-cyber-cyan" },
                        ].map((metric, i) => (
                            <div key={metric.label} className="flex justify-between items-center p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                                <span className="text-sm text-gray-400">{metric.label}</span>
                                <span className={`font-mono font-semibold ${metric.color}`}>{metric.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Team */}
                    <div className="glass-card p-6">
                        <h3 className="font-semibold mb-4 text-white flex items-center gap-2">
                            <Users className="h-5 w-5 text-cyber-cyan" />
                            Project Team
                        </h3>
                        <div className="space-y-3">
                            {[
                                { name: "Ahmed K.", role: "Project Lead", initial: "A", color: "from-sgif-gold to-orange-500" },
                                { name: "Sarah M.", role: "Finance", initial: "S", color: "from-sgif-emerald to-green-500" },
                                { name: "Omar R.", role: "Technical", initial: "O", color: "from-cyber-cyan to-blue-500" },
                            ].map((member) => (
                                <div key={member.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all">
                                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${member.color} flex items-center justify-center text-sm font-bold text-white shadow-lg`}>
                                        {member.initial}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{member.name}</p>
                                        <p className="text-xs text-gray-500">{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="glass-card p-6">
                        <h3 className="font-semibold mb-4 text-white flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-purple-400" />
                            Timeline
                        </h3>
                        <div className="space-y-3">
                            {[
                                { phase: "Financial Close", date: "Q1 2024", done: true },
                                { phase: "Construction", date: "Q2 2024", done: true },
                                { phase: "Grid Connection", date: "Q3 2025", done: false },
                                { phase: "Commercial Operation", date: "Q4 2025", done: false },
                            ].map((item, i) => (
                                <div key={item.phase} className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${item.done ? 'bg-sgif-emerald shadow-lg shadow-sgif-emerald/50' : 'border-2 border-gray-600'}`} />
                                    <div className="flex-1">
                                        <p className={`text-sm ${item.done ? 'text-white' : 'text-gray-500'}`}>{item.phase}</p>
                                    </div>
                                    <span className="text-xs font-mono text-gray-500">{item.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
