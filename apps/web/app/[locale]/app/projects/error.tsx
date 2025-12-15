"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ServerCrashIcon, RefreshCwIcon, ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

export default function ProjectsError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Projects error:", error);
    }, [error]);

    return (
        <div className="p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-12 text-center max-w-xl mx-auto"
            >
                <div className="relative mb-6 inline-block">
                    <div className="absolute inset-0 blur-xl opacity-20 bg-orange-500 rounded-full scale-150" />
                    <div className="relative p-4 rounded-xl border border-orange-500/20 bg-orange-500/5">
                        <ServerCrashIcon className="w-12 h-12 text-orange-400" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3">
                    Failed to Load Projects
                </h2>
                
                <p className="text-gray-400 mb-6">
                    We couldn't retrieve your project data. Please try again.
                </p>

                {error.digest && (
                    <p className="text-xs text-gray-600 font-mono mb-6">
                        Ref: {error.digest}
                    </p>
                )}

                <div className="flex items-center justify-center gap-3">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={reset}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black font-medium rounded-lg"
                    >
                        <RefreshCwIcon className="w-4 h-4" />
                        Try Again
                    </motion.button>

                    <Link href="/app/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 px-5 py-2.5 glass-card text-white font-medium rounded-lg"
                        >
                            <ChevronLeftIcon className="w-4 h-4" />
                            Dashboard
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
