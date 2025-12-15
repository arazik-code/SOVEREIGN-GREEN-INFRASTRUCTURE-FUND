import { Button } from "@sgif/ui";
import { ArrowLeft, Leaf, Zap, Calculator, Sun, Wind, Globe } from "lucide-react";
import { Link } from "@/navigation";

export default function CarbonCalculatorPage() {
    return (
        <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full relative">
            {/* Background effects */}
            <div className="fixed top-1/3 right-1/3 w-72 h-72 bg-sgif-emerald/5 rounded-full blur-3xl pointer-events-none" />
            
            <Link href="/app/carbon">
                <Button variant="ghost" className="w-fit pl-0 hover:pl-2 transition-all text-gray-400 hover:text-white group">
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Overview
                </Button>
            </Link>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-sgif-emerald/80 to-green-400 bg-clip-text text-transparent flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-sgif-emerald/10 border border-sgif-emerald/20">
                        <Calculator className="h-8 w-8 text-sgif-emerald" />
                    </div>
                    Carbon Impact Assessment
                </h1>
                <p className="text-gray-500 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-sgif-emerald" />
                    Calculate projected CO2 offset for a new infrastructure project
                </p>
            </div>

            <div className="glass-card p-8 space-y-8">
                {/* Technology Selection */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-white flex items-center gap-2">
                        <div className="w-1 h-5 bg-gradient-to-b from-sgif-emerald to-green-400 rounded-full" />
                        Select Technology
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { icon: Sun, name: "Solar PV", emission: "0.04" },
                            { icon: Wind, name: "Onshore Wind", emission: "0.01" },
                            { icon: Wind, name: "Offshore Wind", emission: "0.01" },
                        ].map((tech, i) => (
                            <button
                                key={tech.name}
                                className={`p-4 rounded-xl border transition-all duration-300 text-left group ${
                                    i === 0
                                        ? "bg-sgif-emerald/10 border-sgif-emerald/40 shadow-lg shadow-sgif-emerald/10"
                                        : "bg-gray-900/50 border-white/10 hover:border-white/20 hover:bg-white/5"
                                }`}
                            >
                                <tech.icon className={`h-8 w-8 mb-3 ${i === 0 ? "text-sgif-emerald" : "text-gray-400 group-hover:text-white"}`} />
                                <p className={`font-medium ${i === 0 ? "text-white" : "text-gray-400"}`}>{tech.name}</p>
                                <p className="text-xs text-gray-500 mt-1">{tech.emission} tCO2/MWh</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Project Parameters */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-white flex items-center gap-2">
                        <div className="w-1 h-5 bg-gradient-to-b from-cyber-cyan to-blue-400 rounded-full" />
                        Project Parameters
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Capacity (MW)</label>
                            <input 
                                className="flex h-12 w-full rounded-xl border border-white/10 bg-gray-900/50 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sgif-emerald/50 focus:border-sgif-emerald/50 transition-all font-mono" 
                                placeholder="0.00" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Capacity Factor (%)</label>
                            <input 
                                className="flex h-12 w-full rounded-xl border border-white/10 bg-gray-900/50 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sgif-emerald/50 focus:border-sgif-emerald/50 transition-all font-mono" 
                                defaultValue="25" 
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Grid Emission Factor (tCO2/MWh)</label>
                        <input 
                            className="flex h-12 w-full rounded-xl border border-white/10 bg-gray-900/50 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sgif-emerald/50 focus:border-sgif-emerald/50 transition-all font-mono" 
                            defaultValue="0.435" 
                        />
                        <p className="text-xs text-gray-500 flex items-center gap-2">
                            <Leaf className="h-3 w-3" />
                            Default for GCC Region grid mix
                        </p>
                    </div>
                </div>

                {/* Result Preview */}
                <div className="p-4 rounded-xl bg-sgif-emerald/5 border border-sgif-emerald/20">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Estimated Annual Offset</span>
                        <span className="text-2xl font-bold text-sgif-emerald font-mono">-- tCO2</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                    <Button className="w-full h-12 bg-gradient-to-r from-sgif-emerald to-green-500 text-white hover:from-sgif-emerald/90 hover:to-green-500/90 shadow-lg shadow-sgif-emerald/25 border border-sgif-emerald/30 transition-all duration-300 hover:shadow-sgif-emerald/40 group text-base font-semibold">
                        <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                        Calculate Carbon Impact
                    </Button>
                </div>
            </div>
        </div>
    );
}
