"use client";

import { ProjectMap } from "@/components/dashboard/project-map";
import { motion } from "framer-motion";
import { Globe, Zap, Activity, MapPin, Compass } from "lucide-react";

export default function MapsPage() {
    return (
        <div className="flex flex-col gap-6 h-[calc(100vh-8rem)] relative">
            {/* Background effects */}
            <div className="fixed top-1/3 right-1/4 w-96 h-96 bg-sgif-emerald/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="fixed bottom-1/4 left-1/4 w-80 h-80 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />
            
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-sgif-emerald/80 to-green-400 bg-clip-text text-transparent flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-sgif-emerald/10 border border-sgif-emerald/20">
                            <Globe className="h-8 w-8 text-sgif-emerald" />
                        </div>
                        Global Asset Map
                    </h1>
                    <p className="text-gray-500 mt-2 flex items-center gap-2">
                        <Compass className="h-4 w-4 text-cyber-cyan animate-pulse" />
                        Real-time geospatial infrastructure visualization • MENA Region
                    </p>
                </div>
                
                {/* Live indicator */}
                <div className="flex items-center gap-3">
                    <div className="glass-card px-4 py-2 flex items-center gap-2">
                        <div className="relative">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                        </div>
                        <span className="text-xs text-gray-400">Live Data Feed</span>
                    </div>
                </div>
            </motion.div>

            {/* Map Container */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex-1 glass-card overflow-hidden relative"
            >
                <ProjectMap />
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid gap-4 md:grid-cols-5"
            >
                {[
                    { color: "from-amber-500 to-orange-500", glow: "amber", type: "Solar", count: 3, power: "6.6 GW", icon: "☀️" },
                    { color: "from-cyan-500 to-teal-500", glow: "cyan", type: "Hydrogen", count: 2, power: "1.7 GW", icon: "💧" },
                    { color: "from-purple-500 to-pink-500", glow: "purple", type: "Nuclear", count: 1, power: "1.4 GW", icon: "⚛️" },
                    { color: "from-blue-500 to-indigo-500", glow: "blue", type: "Wind", count: 1, power: "800 MW", icon: "🌬️" },
                    { color: "from-emerald-500 to-green-500", glow: "emerald", type: "Ammonia", count: 1, power: "200 kt/y", icon: "🧪" },
                ].map((item, index) => (
                    <motion.div 
                        key={item.type} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className="glass-card p-4 group hover:border-white/20 transition-all duration-300 relative overflow-hidden"
                    >
                        {/* Background glow */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                        
                        <div className="flex items-center gap-3 mb-3 relative">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center text-lg shadow-lg`}>
                                {item.icon}
                            </div>
                            <span className="text-sm text-gray-400 font-medium">{item.type}</span>
                        </div>
                        <p className="text-2xl font-bold text-white font-mono relative">
                            {item.count} 
                            <span className="text-sm font-normal text-gray-500 ml-1">Projects</span>
                        </p>
                        <p className="text-xs text-sgif-emerald mt-1 flex items-center gap-1 relative">
                            <Zap className="h-3 w-3" /> {item.power}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
