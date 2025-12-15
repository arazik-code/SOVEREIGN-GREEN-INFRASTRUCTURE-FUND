"use client";

import { useState } from "react";
import { useAuth, ROLES } from "@sgif/lib";
import { Button, cn } from "@sgif/ui";
import { Link, useRouter } from "@/navigation";
import { useSearchParams } from "next/navigation";
import { Shield, Fingerprint, Scan, Lock, Hexagon } from "lucide-react";

export default function LoginPage() {
    const { login, isLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    // returnTo is without locale prefix (e.g., /app/dashboard)
    const returnTo = searchParams.get('returnTo') || '/app/dashboard';
    const [email, setEmail] = useState("demo@sgif.gov");
    const [selectedRole, setSelectedRole] = useState(ROLES[0]);
    const [focused, setFocused] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, 'demo-password', selectedRole);
        
        // Set cookie for middleware auth check
        document.cookie = `sgif_token=${localStorage.getItem('sgif_token')}; path=/; max-age=${60 * 60 * 24 * 7}`;
        
        // Navigate using next-intl router (adds locale automatically)
        router.push(returnTo);
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
                        Secure Access Portal
                    </h1>
                    <p className="text-sm text-gray-500 mt-2 flex items-center justify-center gap-2">
                        <Lock className="w-3 h-3" />
                        Sovereign-grade authentication required
                    </p>
                </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
                <div className="glass-card p-6 space-y-5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent" />
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 flex items-center gap-2" htmlFor="email">
                            <Scan className="w-4 h-4" />
                            Identifier
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setFocused('email')}
                                onBlur={() => setFocused(null)}
                                className={cn(
                                    "flex h-12 w-full rounded-lg border bg-white/5 px-4 py-2 text-sm text-white font-mono",
                                    "placeholder:text-gray-600 transition-all duration-300",
                                    "focus:outline-none focus:ring-1",
                                    focused === 'email' 
                                        ? "border-cyber-cyan/50 ring-cyber-cyan/30 bg-cyber-cyan/5" 
                                        : "border-white/10"
                                )}
                                placeholder="name@sgif.gov"
                                required
                            />
                            {focused === 'email' && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Access Level
                        </label>
                        <select
                            className={cn(
                                "flex h-12 w-full rounded-lg border bg-white/5 px-4 py-2 text-sm text-white",
                                "border-white/10 focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30",
                                "focus:outline-none transition-all duration-300"
                            )}
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value as any)}
                        >
                            {ROLES.map(role => (
                                <option key={role} value={role} className="bg-gray-900">{role}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <Button 
                    className="w-full h-12 bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black font-bold text-base shadow-neon-cyan hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all" 
                    type="submit" 
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            Authenticating...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <Fingerprint className="w-5 h-5" />
                            Initialize Secure Session
                        </span>
                    )}
                </Button>
            </form>

            <div className="text-center space-y-4">
                <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
                    <span className="text-xs text-gray-600">OR</span>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
                </div>
                
                <p className="text-sm text-gray-500">
                    <Link href="/signup" className="text-cyber-cyan hover:text-cyber-cyan/80 transition-colors">
                        Request Access Credentials
                    </Link>
                </p>
            </div>

            {/* Security badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                <Shield className="w-3 h-3 text-sgif-emerald" />
                <span>256-bit AES Encryption • Zero-Trust Architecture</span>
            </div>
        </div>
    );
}
