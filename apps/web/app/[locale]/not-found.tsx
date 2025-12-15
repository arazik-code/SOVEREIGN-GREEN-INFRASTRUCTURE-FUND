"use client";

import { motion } from "framer-motion";
import { SearchXIcon, HomeIcon, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-sgif-dark-950 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-lg w-full text-center"
            >
                {/* 404 display */}
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="relative mb-8"
                >
                    {/* Glowing background */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-64 h-64 bg-gradient-to-br from-cyber-cyan/10 to-sgif-emerald/10 rounded-full blur-3xl" />
                    </div>

                    {/* 404 text */}
                    <div className="relative">
                        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyber-cyan via-sgif-emerald to-cyber-cyan">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                animate={{ 
                                    opacity: [0.5, 1, 0.5],
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity 
                                }}
                                className="glass-card p-4 rounded-xl"
                            >
                                <SearchXIcon className="w-12 h-12 text-gray-400" />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Content */}
                <h2 className="text-2xl font-bold text-white mb-4">
                    Page Not Found
                </h2>
                
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    The page you're looking for doesn't exist or has been moved to a new location.
                </p>

                {/* Actions */}
                <div className="flex items-center justify-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-6 py-3 glass-card text-white font-medium rounded-lg hover:border-white/20 transition-colors"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Go Back
                    </motion.button>

                    <Link href="/app/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black font-semibold rounded-lg hover:shadow-neon-cyan transition-shadow"
                        >
                            <HomeIcon className="w-4 h-4" />
                            Dashboard
                        </motion.button>
                    </Link>
                </div>

                {/* Decorative grid */}
                <div className="mt-16 grid grid-cols-5 gap-2 max-w-xs mx-auto opacity-30">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            transition={{ delay: i * 0.05 }}
                            className="w-6 h-6 rounded border border-white/10"
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
