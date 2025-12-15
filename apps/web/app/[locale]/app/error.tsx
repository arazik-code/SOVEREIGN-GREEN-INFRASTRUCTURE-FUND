"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangleIcon, RefreshCwIcon, HomeIcon } from "lucide-react";
import Link from "next/link";

export default function AppError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to monitoring service
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-sgif-dark-950 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-lg w-full text-center"
            >
                {/* Error icon with glow */}
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="relative mb-8 inline-block"
                >
                    <div className="absolute inset-0 blur-2xl opacity-30 bg-red-500 rounded-full scale-150" />
                    <div className="relative glass-card p-8 rounded-2xl border border-red-500/20">
                        <motion.div
                            animate={{ 
                                rotate: [0, -5, 5, -5, 0] 
                            }}
                            transition={{ 
                                duration: 0.5, 
                                repeat: 2,
                                repeatDelay: 3
                            }}
                        >
                            <AlertTriangleIcon className="w-16 h-16 text-red-400" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Error content */}
                <h1 className="text-3xl font-bold text-white mb-4">
                    Something went wrong
                </h1>
                
                <p className="text-gray-400 mb-2">
                    An unexpected error occurred while processing your request.
                </p>
                
                {error.digest && (
                    <p className="text-xs text-gray-600 font-mono mb-8">
                        Error ID: {error.digest}
                    </p>
                )}

                {/* Error details (development only) */}
                {process.env.NODE_ENV === "development" && (
                    <div className="glass-card p-4 rounded-lg text-left mb-8 border border-red-500/10">
                        <p className="text-xs text-red-400 font-mono break-all">
                            {error.message}
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={reset}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black font-semibold rounded-lg hover:shadow-neon-cyan transition-shadow"
                    >
                        <RefreshCwIcon className="w-4 h-4" />
                        Try Again
                    </motion.button>

                    <Link href="/app/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 glass-card text-white font-medium rounded-lg hover:border-white/20 transition-colors"
                        >
                            <HomeIcon className="w-4 h-4" />
                            Go to Dashboard
                        </motion.button>
                    </Link>
                </div>

                {/* Support info */}
                <div className="mt-12 pt-8 border-t border-white/5">
                    <p className="text-sm text-gray-500">
                        If this problem persists, please contact{" "}
                        <a 
                            href="mailto:support@sgif.fund" 
                            className="text-cyber-cyan hover:underline"
                        >
                            support@sgif.fund
                        </a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
