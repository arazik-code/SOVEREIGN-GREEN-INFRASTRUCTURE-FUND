"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertOctagonIcon, RefreshCwIcon, HomeIcon } from "lucide-react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log to error reporting service
        console.error("Global error:", error);
    }, [error]);

    return (
        <html lang="en">
            <body className="bg-sgif-dark-950">
                <div className="min-h-screen flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-lg w-full text-center"
                    >
                        {/* Critical error icon */}
                        <div className="relative mb-8 inline-block">
                            <div className="absolute inset-0 blur-3xl opacity-40 bg-red-600 rounded-full scale-150" />
                            <div 
                                className="relative p-8 rounded-2xl border border-red-500/30"
                                style={{ background: "rgba(20, 20, 25, 0.8)" }}
                            >
                                <AlertOctagonIcon className="w-16 h-16 text-red-500" />
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold text-white mb-4">
                            Critical Error
                        </h1>
                        
                        <p className="text-gray-400 mb-8">
                            A critical error has occurred. Our engineering team has been notified and is working to resolve this issue.
                        </p>

                        {error.digest && (
                            <p className="text-xs text-gray-600 font-mono mb-8 p-3 rounded-lg border border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
                                Error Reference: {error.digest}
                            </p>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={reset}
                                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-black transition-all"
                                style={{ background: "linear-gradient(135deg, #00D4FF, #10B981)" }}
                            >
                                <RefreshCwIcon className="w-4 h-4" />
                                Try Again
                            </button>

                            <a href="/">
                                <button
                                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white border border-white/10 transition-all hover:border-white/20"
                                    style={{ background: "rgba(255,255,255,0.05)" }}
                                >
                                    <HomeIcon className="w-4 h-4" />
                                    Return Home
                                </button>
                            </a>
                        </div>

                        {/* Support */}
                        <div className="mt-12 pt-8 border-t border-white/5">
                            <p className="text-sm text-gray-500">
                                Need immediate assistance? Contact our support team at{" "}
                                <a 
                                    href="mailto:support@sgif.fund" 
                                    className="text-cyan-400 hover:underline"
                                >
                                    support@sgif.fund
                                </a>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </body>
        </html>
    );
}
