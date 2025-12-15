"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@sgif/lib";
import { motion } from "framer-motion";
import { Shield, Loader2, CheckCircle2, XCircle, Hexagon } from "lucide-react";
import { Button } from "@sgif/ui";

type SSOState = 'processing' | 'success' | 'error';

export default function SSOCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();
    const [state, setState] = useState<SSOState>('processing');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const processSSO = async () => {
            const code = searchParams.get('code');
            const provider = searchParams.get('provider');
            const errorParam = searchParams.get('error');

            if (errorParam) {
                setState('error');
                setError('Authentication was cancelled or failed. Please try again.');
                return;
            }

            if (!code) {
                setState('error');
                setError('Invalid callback. No authorization code received.');
                return;
            }

            try {
                // Simulate SSO verification
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Mock successful login
                await login('sso-user@organization.com', 'LP');
                
                setState('success');
                
                setTimeout(() => {
                    router.push('/app/dashboard');
                }, 1500);
            } catch (err) {
                setState('error');
                setError('Failed to complete authentication. Please try again.');
            }
        };

        processSSO();
    }, [searchParams, login, router]);

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
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent" />

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyber-cyan/20 to-sgif-gold/20 border border-white/10 flex items-center justify-center">
                        <Hexagon className="w-8 h-8 text-cyber-cyan" />
                    </div>
                </div>

                {state === 'processing' && (
                    <>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-cyber-cyan/10 border border-cyber-cyan/20 mb-6"
                        >
                            <Shield className="h-10 w-10 text-cyber-cyan" />
                        </motion.div>

                        <h1 className="text-2xl font-bold text-white mb-3">
                            Verifying Identity
                        </h1>
                        <p className="text-gray-400 mb-6">
                            Completing secure single sign-on authentication...
                        </p>

                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Processing SSO callback...</span>
                        </div>
                    </>
                )}

                {state === 'success' && (
                    <>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-sgif-emerald/10 border border-sgif-emerald/20 mb-6"
                        >
                            <CheckCircle2 className="h-10 w-10 text-sgif-emerald" />
                        </motion.div>

                        <h1 className="text-2xl font-bold text-white mb-3">
                            Authentication Successful
                        </h1>
                        <p className="text-gray-400 mb-6">
                            Identity verified. Redirecting to your dashboard...
                        </p>

                        <div className="flex items-center justify-center gap-2 text-sm text-sgif-emerald">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Entering secure environment...</span>
                        </div>
                    </>
                )}

                {state === 'error' && (
                    <>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 mb-6"
                        >
                            <XCircle className="h-10 w-10 text-red-400" />
                        </motion.div>

                        <h1 className="text-2xl font-bold text-white mb-3">
                            Authentication Failed
                        </h1>
                        <p className="text-gray-400 mb-6">
                            {error}
                        </p>

                        <div className="flex gap-3 justify-center">
                            <Button
                                variant="outline"
                                onClick={() => router.push('/login')}
                                className="border-white/10"
                            >
                                Back to Login
                            </Button>
                            <Button
                                onClick={() => window.location.reload()}
                                className="bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black"
                            >
                                Try Again
                            </Button>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
}
