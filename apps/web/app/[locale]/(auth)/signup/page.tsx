import { Link } from "@/navigation";
import { Button } from "@sgif/ui";
import { UserPlus, ArrowLeft, Shield, Fingerprint } from "lucide-react";

export default function SignupPage() {
    return (
        <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[400px] relative">
            {/* Background decoration */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-sgif-emerald/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col space-y-2 text-center relative">
                <div className="mx-auto p-4 rounded-2xl bg-gradient-to-br from-sgif-emerald/20 to-cyber-cyan/10 border border-sgif-emerald/20 mb-4">
                    <UserPlus className="h-10 w-10 text-sgif-emerald" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-sgif-emerald/80 to-cyber-cyan bg-clip-text text-transparent">Request Access</h1>
                <p className="text-sm text-gray-400">
                    Enter your details to request LP or Partner access
                </p>
            </div>
            
            <div className="glass-card p-8 space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-sgif-emerald/5 border border-sgif-emerald/20">
                    <div className="p-2 rounded-lg bg-sgif-emerald/10 border border-sgif-emerald/20">
                        <Shield className="h-5 w-5 text-sgif-emerald" />
                    </div>
                    <div>
                        <p className="text-sm text-white font-medium">Invite-Only Access</p>
                        <p className="text-xs text-gray-500">Registration requires verified Sovereign ID or partner invitation</p>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-300 mb-1.5 block">Organization Name</label>
                        <input
                            type="text"
                            placeholder="Enter organization name"
                            className="w-full h-12 rounded-xl border border-white/10 bg-gray-900/50 px-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sgif-emerald/50 focus:border-sgif-emerald/50 transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-300 mb-1.5 block">Contact Email</label>
                        <input
                            type="email"
                            placeholder="Enter email address"
                            className="w-full h-12 rounded-xl border border-white/10 bg-gray-900/50 px-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sgif-emerald/50 focus:border-sgif-emerald/50 transition-all"
                        />
                    </div>
                    
                    <Button className="w-full h-12 bg-gradient-to-r from-sgif-emerald to-green-500 text-white hover:from-sgif-emerald/90 hover:to-green-500/90 shadow-lg shadow-sgif-emerald/25 border border-sgif-emerald/30 transition-all duration-300 font-semibold group">
                        <Fingerprint className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                        Submit Access Request
                    </Button>
                </div>
                
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-gray-900 px-2 text-gray-500">Or</span>
                    </div>
                </div>
                
                <Link href="/login">
                    <Button variant="outline" className="w-full h-11 border-white/10 hover:border-cyber-cyan/30 hover:bg-cyber-cyan/10 hover:text-cyber-cyan transition-all group">
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Login
                    </Button>
                </Link>
            </div>
        </div>
    );
}
