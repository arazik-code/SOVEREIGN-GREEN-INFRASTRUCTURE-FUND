"use client";

import { useEffect } from "react";
import { useRouter } from "@/navigation";
import { useAuth } from "@sgif/lib";
import { motion } from "framer-motion";
import { LogOut, Shield, Loader2 } from "lucide-react";

export default function LogoutPage() {
    const { logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const performLogout = async () => {
            await logout();
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        };
        performLogout();
    }, [logout, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            {/* Background effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sgif-gold/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-12 text-center relative overflow-hidden max-w-md"
            >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent" />

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-cyber-cyan/10 border border-cyber-cyan/20 mb-6"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        <LogOut className="h-10 w-10 text-cyber-cyan" />
                    </motion.div>
                </motion.div>

                <h1 className="text-2xl font-bold text-white mb-3">
                    Secure Logout
                </h1>
                <p className="text-gray-400 mb-6">
                    Terminating your secure session and clearing credentials...
                </p>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Redirecting to login...</span>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-600">
                    <Shield className="h-3 w-3" />
                    <span>Session terminated securely</span>
                </div>
            </motion.div>
        </div>
    );
}
