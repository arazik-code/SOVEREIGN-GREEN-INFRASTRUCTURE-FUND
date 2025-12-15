"use client";

import { Button } from "@sgif/ui";
import { ArrowLeft, Play, Zap, TrendingUp, RefreshCw, BarChart3, Target } from "lucide-react";
import { Link } from "@/navigation";
import { useState } from "react";

export default function IRRSimulatorPage() {
    const [irr, setIrr] = useState<number | null>(null);
    const [isSimulating, setIsSimulating] = useState(false);

    const runSimulation = () => {
        setIsSimulating(true);
        setTimeout(() => {
            setIrr(14.2);
            setIsSimulating(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full relative">
            {/* Background effects */}
            <div className="fixed top-1/3 right-1/4 w-80 h-80 bg-sgif-gold/5 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed bottom-1/4 left-1/3 w-72 h-72 bg-sgif-emerald/5 rounded-full blur-3xl pointer-events-none" />
            
            <Link href="/app/financials/fund">
                <Button variant="ghost" className="w-fit pl-0 hover:pl-2 transition-all text-gray-400 hover:text-white group">
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Fund
                </Button>
            </Link>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-sgif-gold/80 to-orange-400 bg-clip-text text-transparent flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-sgif-gold/10 border border-sgif-gold/20">
                        <BarChart3 className="h-8 w-8 text-sgif-gold" />
                    </div>
                    IRR Simulator
                </h1>
                <p className="text-gray-500 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-sgif-gold" />
                    Run quantum Monte Carlo simulations on project financial models
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Parameters Panel */}
                <div className="glass-card p-6 space-y-6">
                    <div className="space-y-6">
                        <h3 className="font-semibold text-lg text-white flex items-center gap-2">
                            <div className="w-1 h-5 bg-gradient-to-b from-sgif-gold to-orange-400 rounded-full" />
                            Scenario Parameters
                        </h3>

                        {/* Tariff Slider */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-gray-300">Electricity Tariff</label>
                                <span className="text-sm font-mono text-sgif-gold">$55/MWh</span>
                            </div>
                            <div className="relative">
                                <input 
                                    type="range" 
                                    className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer accent-sgif-gold" 
                                    min="10" 
                                    max="100" 
                                    defaultValue="55"
                                    style={{
                                        background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 50%, #1f2937 50%, #1f2937 100%)`
                                    }}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 font-mono">
                                <span>$10</span>
                                <span>$100</span>
                            </div>
                        </div>

                        {/* CAPEX Slider */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-gray-300">CAPEX Sensitivity</label>
                                <span className="text-sm font-mono text-cyber-cyan">0%</span>
                            </div>
                            <div className="relative">
                                <input 
                                    type="range" 
                                    className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer accent-cyber-cyan" 
                                    min="-20" 
                                    max="20" 
                                    defaultValue="0"
                                />
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 font-mono">
                                <span>-20%</span>
                                <span>+20%</span>
                            </div>
                        </div>

                        {/* Interest Rate Slider */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-gray-300">Interest Rate</label>
                                <span className="text-sm font-mono text-sgif-emerald">6%</span>
                            </div>
                            <div className="relative">
                                <input 
                                    type="range" 
                                    className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer accent-sgif-emerald" 
                                    min="2" 
                                    max="10" 
                                    step="0.5" 
                                    defaultValue="6"
                                />
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 font-mono">
                                <span>2%</span>
                                <span>10%</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <Button
                            className="w-full h-12 bg-gradient-to-r from-sgif-gold to-orange-500 text-black hover:from-sgif-gold/90 hover:to-orange-500/90 shadow-lg shadow-sgif-gold/25 border border-sgif-gold/30 transition-all duration-300 font-semibold group disabled:opacity-50"
                            onClick={runSimulation}
                            disabled={isSimulating}
                        >
                            {isSimulating ? (
                                <>
                                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" /> Running Simulation...
                                </>
                            ) : (
                                <>
                                    <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> Run Quantum Simulation
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Results Panel */}
                <div className="glass-card p-6 flex flex-col justify-center items-center text-center space-y-6 min-h-[400px]">
                    {irr ? (
                        <>
                            <div className="p-4 rounded-2xl bg-sgif-emerald/10 border border-sgif-emerald/20">
                                <Target className="h-12 w-12 text-sgif-emerald" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-400 mb-2">Simulated Project IRR</h3>
                                <div className="text-7xl font-bold bg-gradient-to-r from-sgif-emerald to-green-400 bg-clip-text text-transparent font-mono">{irr}%</div>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-sgif-emerald/10 border border-sgif-emerald/20">
                                <TrendingUp className="h-4 w-4 text-sgif-emerald" />
                                <span className="text-sm text-sgif-emerald font-medium">Above Hurdle Rate (12%)</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 w-full mt-4 pt-4 border-t border-white/10">
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 mb-1">NPV</p>
                                    <p className="text-lg font-bold text-white font-mono">$24.3M</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 mb-1">Payback</p>
                                    <p className="text-lg font-bold text-white font-mono">6.2 yrs</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center">
                                <BarChart3 className="h-10 w-10 text-gray-600" />
                            </div>
                            <p className="text-gray-500 max-w-xs">Configure parameters and run a quantum simulation to see projected IRR results</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
