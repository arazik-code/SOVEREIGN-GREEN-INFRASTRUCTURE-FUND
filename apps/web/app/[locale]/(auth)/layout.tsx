export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            {/* Left Panel - Branding */}
            <div className="relative hidden h-full flex-col p-10 text-white lg:flex overflow-hidden">
                {/* Dark background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
                
                {/* Grid pattern */}
                <div className="absolute inset-0 grid-pattern opacity-30" />
                
                {/* Animated orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyber-cyan/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-sgif-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
                <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-sgif-emerald/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1.5s' }} />
                
                {/* Top edge glow */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent" />
                
                {/* Logo */}
                <div className="relative z-20 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-cyan to-sgif-gold flex items-center justify-center">
                        <span className="text-xl font-bold text-black">S</span>
                    </div>
                    <div>
                        <span className="text-xl font-bold bg-gradient-to-r from-cyber-cyan to-sgif-gold bg-clip-text text-transparent">SGIF</span>
                        <span className="text-gray-500 ml-2">Portal</span>
                    </div>
                </div>
                
                {/* Center content */}
                <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-8">
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                        Sovereign Green Infrastructure
                    </h2>
                    <p className="text-lg text-gray-400 max-w-md">
                        Powering the sustainable future of the Gulf Cooperation Council
                    </p>
                    
                    {/* Stats */}
                    <div className="mt-12 grid grid-cols-3 gap-8">
                        {[
                            { value: "$500M", label: "Fund Size" },
                            { value: "8", label: "Active Projects" },
                            { value: "14.2%", label: "Target IRR" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <p className="text-2xl font-bold text-cyber-cyan">{stat.value}</p>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Bottom quote */}
                <div className="relative z-20">
                    <div className="glass-card p-4 rounded-lg">
                        <p className="text-sm text-gray-400 italic">
                            "Building tomorrow's infrastructure with sovereign-grade security and AI-powered insights."
                        </p>
                        <p className="text-xs text-cyber-cyan mt-2">— Masdar City Initiative</p>
                    </div>
                </div>
            </div>
            
            {/* Right Panel - Auth Form */}
            <div className="relative lg:p-8 flex items-center justify-center min-h-screen">
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-950 lg:bg-transparent" />
                <div className="absolute inset-0 grid-pattern opacity-20 lg:opacity-10" />
                
                <div className="relative z-10 w-full max-w-md px-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
