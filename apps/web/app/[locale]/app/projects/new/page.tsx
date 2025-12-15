"use client";

import { Button } from "@sgif/ui";
import { useRouter } from "@/navigation";
import { ArrowLeft, Plus, Rocket, Sun, Wind, Droplets, Atom, Zap } from "lucide-react";

export default function NewProjectPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full relative">
            {/* Background effects */}
            <div className="fixed top-1/3 right-1/4 w-72 h-72 bg-sgif-gold/5 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed bottom-1/4 left-1/3 w-64 h-64 bg-sgif-emerald/5 rounded-full blur-3xl pointer-events-none" />
            
            <Button variant="ghost" className="w-fit pl-0 hover:pl-2 transition-all text-gray-400 hover:text-white group" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Projects
            </Button>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-sgif-gold/80 to-orange-400 bg-clip-text text-transparent flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-sgif-gold/10 border border-sgif-gold/20">
                        <Rocket className="h-8 w-8 text-sgif-gold" />
                    </div>
                    New Investment Proposal
                </h1>
                <p className="text-gray-500 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-sgif-gold" />
                    Initialize a new project within the fund portfolio
                </p>
            </div>

            <div className="glass-card p-8">
                <form className="space-y-8">
                    {/* Project Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Project Name</label>
                        <input 
                            className="flex h-12 w-full rounded-xl border border-white/10 bg-gray-900/50 px-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sgif-gold/50 focus:border-sgif-gold/50 transition-all" 
                            placeholder="e.g. Al Dhafra Solar Phase 2" 
                        />
                    </div>
                    
                    {/* Project Type Selection */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-300">Project Type</label>
                        <div className="grid grid-cols-4 gap-3">
                            {[
                                { icon: Sun, name: "Solar PV", color: "sgif-gold" },
                                { icon: Wind, name: "Wind Farm", color: "cyber-cyan" },
                                { icon: Droplets, name: "Hydrogen", color: "sgif-emerald" },
                                { icon: Atom, name: "Nuclear", color: "purple-400" },
                            ].map((type, i) => (
                                <button
                                    key={type.name}
                                    type="button"
                                    className={`p-4 rounded-xl border transition-all duration-300 text-center group ${
                                        i === 0
                                            ? `bg-${type.color}/10 border-${type.color}/40 shadow-lg shadow-${type.color}/10`
                                            : "bg-gray-900/50 border-white/10 hover:border-white/20 hover:bg-white/5"
                                    }`}
                                >
                                    <type.icon className={`h-6 w-6 mx-auto mb-2 ${i === 0 ? `text-${type.color}` : "text-gray-400 group-hover:text-white"}`} />
                                    <span className={`text-xs font-medium ${i === 0 ? "text-white" : "text-gray-400"}`}>{type.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Budget & Location */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Estimated Budget</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-mono">$</span>
                                <input 
                                    className="flex h-12 w-full rounded-xl border border-white/10 bg-gray-900/50 pl-8 pr-16 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sgif-gold/50 focus:border-sgif-gold/50 transition-all font-mono" 
                                    placeholder="0.00" 
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Million</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Location</label>
                            <select className="flex h-12 w-full rounded-xl border border-white/10 bg-gray-900/50 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sgif-gold/50 focus:border-sgif-gold/50 transition-all">
                                <option>United Arab Emirates</option>
                                <option>Saudi Arabia</option>
                                <option>Egypt</option>
                                <option>Oman</option>
                                <option>Morocco</option>
                            </select>
                        </div>
                    </div>
                    
                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Project Description</label>
                        <textarea 
                            className="flex min-h-[120px] w-full rounded-xl border border-white/10 bg-gray-900/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sgif-gold/50 focus:border-sgif-gold/50 transition-all resize-none" 
                            placeholder="Describe the project scope, capacity, expected outputs, and strategic alignment..." 
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                        <Button 
                            variant="outline" 
                            type="button" 
                            onClick={() => router.back()}
                            className="border-white/10 hover:border-white/20 transition-all"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            className="bg-gradient-to-r from-sgif-gold to-orange-500 text-black hover:from-sgif-gold/90 hover:to-orange-500/90 font-semibold shadow-lg shadow-sgif-gold/25 border border-sgif-gold/30 transition-all duration-300 group"
                        >
                            <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
                            Create Proposal
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
