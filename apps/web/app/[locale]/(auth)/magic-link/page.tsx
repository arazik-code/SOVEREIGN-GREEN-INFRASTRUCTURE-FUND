"use client";

import { useState } from "react";
import { Button, cn } from "@sgif/ui";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, ArrowLeft, Hexagon, Lock, Loader2 } from "lucide-react";

export default function MagicLinkPage() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        setSent(true);
    };

    return (
        <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[400px] relative">
            {/* Background effects */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-sgif-gold/10 rounded-full blur-3xl pointer-events-none" />

            {/* Logo */}
            <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyber-cyan/20 to-sgif-gold/20 border border-white/10 flex items-center justify-center">
                        <Hexagon className="w-10 h-10 text-cyber-cyan" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyber-cyan to-sgif-gold blur-xl opacity-20 animate-pulse" />
                </div>
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        {sent ? "Check Your Email" : "Magic Link Login"}
                    </h1>
                    <p className="text-sm text-gray-500 mt-2 flex items-center justify-center gap-2">
                        <Lock className="w-3 h-3" />
                        {sent ? "Secure link sent" : "Passwordless authentication"}
                    </p>
                </div>
            </div>

            {sent ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 text-center"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sgif-emerald/10 border border-sgif-emerald/20 mb-6">
                        <CheckCircle2 className="h-8 w-8 text-sgif-emerald" />
                    </div>
                    
                    <h2 className="text-xl font-semibold text-white mb-2">Link Sent Successfully</h2>
                    <p className="text-gray-400 text-sm mb-6">
                        We've sent a secure login link to <span className="text-white">{email}</span>. 
                        Click the link in the email to access your account.
                    </p>

                    <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 mb-6">
                        <p className="text-xs text-gray-500">
                            The link will expire in 15 minutes. If you don't see the email, 
                            check your spam folder.
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        onClick={() => setSent(false)}
                        className="w-full border-white/10"
                    >
                        Send Another Link
                    </Button>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="glass-card p-6 space-y-5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent" />
                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2" htmlFor="email">
                                <Mail className="w-4 h-4" />
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={cn(
                                    "flex h-12 w-full rounded-lg border bg-white/5 px-4 py-2 text-sm text-white font-mono",
                                    "placeholder:text-gray-600 transition-all duration-300",
                                    "focus:outline-none focus:ring-1 focus:border-cyber-cyan/50 focus:ring-cyber-cyan/30 border-white/10"
                                )}
                                placeholder="name@organization.com"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading || !email}
                            className="w-full bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black font-semibold gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="h-4 w-4" />
                                    Send Magic Link
                                </>
                            )}
                        </Button>

                        <div className="text-center pt-4 border-t border-white/5">
                            <Link href="/login" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}
