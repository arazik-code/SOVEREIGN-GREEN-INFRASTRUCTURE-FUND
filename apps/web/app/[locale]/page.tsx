import { Button } from "@sgif/ui";
import { Link } from "@/navigation";
import {
    ArrowRight,
    ShieldCheck,
    Sparkles,
    Globe2,
    LineChart,
    BadgeDollarSign,
    BatteryCharging,
    CloudSun,
    RadioTower,
    Shield,
    BarChart3,
    Send,
    Factory,
} from "lucide-react";

const stats = [
    { label: "Fund Size", value: "$500M", detail: "Expandable to $2B" },
    { label: "Target IRR", value: "22% Net", detail: "14% Yield · 8% Carbon Alpha" },
    { label: "Multiplier", value: "3.2x", detail: "Sovereign co-invest leverage" },
    { label: "Duration", value: "7 Years", detail: "3 deploy · 4 harvest" },
];

const pillars = [
    {
        icon: BatteryCharging,
        title: "Deploy Capital",
        copy: "Sovereign-de-risked solar, grid efficiency, methane capture with guaranteed offtake.",
    },
    {
        icon: ShieldCheck,
        title: "Assetize Carbon",
        copy: "EU-grade certification layered on GCC assets to unlock compliance-grade credits.",
    },
    {
        icon: BadgeDollarSign,
        title: "Monetize",
        copy: "Route credits to EU ETS and top voluntary buyers with real-time price discovery.",
    },
];

const proofPoints = [
    { icon: Factory, label: "Anchored by sovereign commitments" },
    { icon: Globe2, label: "Bridge GCC capital to global carbon markets" },
    { icon: Shield, label: "No technology risk; execution upside only" },
    { icon: BarChart3, label: "AI ops stack for live NAV and carbon flows" },
];

const timeline = [
    { year: "2025", title: "First Close", detail: "Q3 2025 · Min Ticket $10M" },
    { year: "2025-2027", title: "Deployment", detail: "3-year capital roll into sovereign-backed assets" },
    { year: "2028-2031", title: "Harvest", detail: "4-year yield + carbon alpha realization" },
];

export default function Home() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sgif-charcoal via-black to-[#050510] text-white">
            <div className="pointer-events-none absolute inset-0 opacity-60 hyper-grid" />
            <div className="pointer-events-none absolute inset-0 mix-blend-screen">
                <div className="aurora-blur top-[-10%] left-[5%]" />
                <div className="aurora-blur bottom-[-10%] right-[10%] delay-700" />
                <div className="orbital-light top-[20%] right-[35%]" />
                <div className="orbital-light bottom-[15%] left-[25%]" />
            </div>

            <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 lg:px-10">
                <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Gradients and filters */}
                            <defs>
                                <linearGradient id="sgifGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#00ffff" />
                                    <stop offset="50%" stopColor="#d4af37" />
                                    <stop offset="100%" stopColor="#029a76" />
                                </linearGradient>
                                <filter id="sgifGlow">
                                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                                    <feMerge>
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            
                            {/* Outer hexagon */}
                            <polygon points="60,8 108,34 108,86 60,112 12,86 12,34" stroke="url(#sgifGradient)" strokeWidth="2" fill="none" filter="url(#sgifGlow)" opacity="0.85"/>
                            
                            {/* Inner hexagon */}
                            <polygon points="60,24 96,48 96,72 60,96 24,72 24,48" stroke="#00ffff" strokeWidth="1.5" fill="none" opacity="0.4"/>
                            
                            {/* Center circle */}
                            <circle cx="60" cy="60" r="22" fill="url(#sgifGradient)" opacity="0.9" filter="url(#sgifGlow)"/>
                            <circle cx="60" cy="60" r="15" fill="#0a0a0f"/>
                            
                            {/* Center S letter */}
                            <text x="60" y="70" fontSize="28" fontWeight="900" textAnchor="middle" fill="url(#sgifGradient)" fontFamily="Arial, sans-serif">S</text>
                            
                            {/* Radiating points */}
                            <line x1="60" y1="3" x2="60" y2="12" stroke="#00ffff" strokeWidth="1.5" opacity="0.7"/>
                            <line x1="60" y1="108" x2="60" y2="117" stroke="#00ffff" strokeWidth="1.5" opacity="0.7"/>
                            <line x1="3" y1="60" x2="12" y2="60" stroke="#d4af37" strokeWidth="1.5" opacity="0.7"/>
                            <line x1="108" y1="60" x2="117" y2="60" stroke="#d4af37" strokeWidth="1.5" opacity="0.7"/>
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan to-sgif-gold rounded-full blur-lg opacity-30 animate-pulse" style={{animationDuration: '4s'}} />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-gray-400 leading-tight">Sovereign Green</p>
                        <p className="text-sm font-bold bg-gradient-to-r from-cyber-cyan to-sgif-gold bg-clip-text text-transparent">Infrastructure Fund</p>
                    </div>
                </div>
                <nav className="flex items-center gap-3">
                    <Button variant="ghost" asChild className="text-gray-200 hover:text-cyber-cyan">
                        <Link href="/login">Investor Login</Link>
                    </Button>
                    <Button asChild className="btn-futuristic border-cyber-cyan/60 text-cyber-cyan">
                        <Link href="/signup">Request Access</Link>
                    </Button>
                </nav>
            </header>

            <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-8 lg:px-10 lg:pt-10">
                <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyber-cyan shadow-inner-glow">
                            <Sparkles className="h-4 w-4" />
                            Future-grade sovereign climate capital
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                                <span className="bg-gradient-to-r from-white via-cyber-cyan to-sgif-gold bg-clip-text text-transparent">
                                    SOVEREIGN GREEN INFRASTRUCTURE FUND (SGIF)
                                </span>
                            </h1>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button asChild size="lg" className="group bg-gradient-to-r from-cyber-cyan via-sgif-gold to-sgif-emerald text-black shadow-neon-cyan">
                                <Link href="/app/dashboard" className="flex items-center gap-2">
                                    Enter Data Room
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" className="border-white/30 bg-white/5 text-white hover:border-cyber-cyan/80 hover:text-cyber-cyan">
                                Download Investor Thesis
                            </Button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {stats.map((stat) => (
                                <div key={stat.label} className="glass-card h-full rounded-xl border-white/10 p-4 text-left transition duration-300 hover:-translate-y-1 hover:border-cyber-cyan/50">
                                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{stat.label}</p>
                                    <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
                                    <p className="text-sm text-gray-400">{stat.detail}</p>
                                </div>
                            ))}
                        </div>

                        {/* What You Get Box */}
                        <div className="glass-card rounded-2xl border border-cyber-cyan/30 bg-gradient-to-b from-cyber-cyan/8 to-transparent p-6 lg:p-8">
                            <h3 className="text-xl font-semibold text-cyber-cyan mb-4">What You Get</h3>
                            <div className="grid sm:grid-cols-3 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-cyber-cyan mt-1.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-white font-medium">Real-Time Data Access</p>
                                        <p className="text-sm text-gray-400">Live NAV, portfolio performance & carbon issuance tracking</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-sgif-gold mt-1.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-white font-medium">Governance Seat</p>
                                        <p className="text-sm text-gray-400">Board-level input on capital deployment & exit strategy</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-sgif-emerald mt-1.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-white font-medium">Quarterly Reporting</p>
                                        <p className="text-sm text-gray-400">Detailed IRR tracking, carbon metrics & regulatory compliance</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="holo-panel relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glass">
                            <div className="beam-grid" />
                            <div className="relative space-y-6">
                                <div className="flex items-center gap-3">
                                    <LineChart className="h-6 w-6 text-cyber-cyan" />
                                    <h3 className="text-xl font-semibold">Dual-Revenue Engine</h3>
                                </div>
                                <div className="grid gap-4">
                                    {pillars.map((pillar) => (
                                        <div key={pillar.title} className="group relative rounded-xl border border-white/10 bg-black/60 p-4 backdrop-blur">
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500" style={{ background: "linear-gradient(135deg, rgba(0,255,255,0.05), rgba(212,175,55,0.06))" }} />
                                            <div className="relative flex items-start gap-3">
                                                <pillar.icon className="h-6 w-6 text-cyber-cyan" />
                                                <div className="space-y-1">
                                                    <p className="font-semibold text-white">{pillar.title}</p>
                                                    <p className="text-sm text-gray-400">{pillar.copy}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="rounded-xl border border-cyber-cyan/20 bg-cyber-cyan/5 p-4 text-sm text-cyber-cyan">
                                    We do not take technology risk. We take execution upside.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4-Step Deployment Flow */}
                <section className="relative">
                    <div className="space-y-8">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">Capital Deployment Path</p>
                            <h2 className="text-3xl font-semibold text-white">7-Year Value Creation</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                            {/* Connection lines */}
                            <div className="absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent hidden md:block" />
                            
                            {[
                                {
                                    step: "01",
                                    title: "Capital Commitment",
                                    description: "Deploy capital into sovereign-backed solar, grid, methane assets",
                                    timeline: "2025",
                                    color: "cyber-cyan"
                                },
                                {
                                    step: "02",
                                    title: "Asset Certification",
                                    description: "Layer EU-grade MRV & carbon issuance verification protocols",
                                    timeline: "2025-2026",
                                    color: "sgif-gold"
                                },
                                {
                                    step: "03",
                                    title: "Yield Generation",
                                    description: "Harvest 14% annual energy yield + 8% carbon alpha",
                                    timeline: "2026-2028",
                                    color: "sgif-emerald"
                                },
                                {
                                    step: "04",
                                    title: "Exit & Distribution",
                                    description: "Crystallize gains via infrastructure refinance or partial exit",
                                    timeline: "2028-2032",
                                    color: "cyber-purple"
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="relative">
                                    <div className={`glass-card rounded-xl border border-${item.color}/20 bg-${item.color}/5 p-5 group hover:border-${item.color}/50 transition`}>
                                        <div className={`w-10 h-10 rounded-full bg-${item.color}/20 border border-${item.color}/50 flex items-center justify-center text-${item.color} font-bold text-sm mb-4`}>
                                            {item.step}
                                        </div>
                                        <h3 className={`text-white font-semibold mb-2 text-${item.color}`}>{item.title}</h3>
                                        <p className="text-sm text-gray-400 mb-3">{item.description}</p>
                                        <p className={`text-xs uppercase tracking-[0.15em] text-${item.color}`}>{item.timeline}</p>
                                    </div>
                                    {idx < 3 && (
                                        <div className="hidden md:block absolute -right-2 top-1/2 transform -translate-y-1/2">
                                            <ArrowRight className="h-5 w-5 text-gray-600" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#0a0f1c] via-[#0d0b15] to-[#0b1a1a] p-6 lg:p-10">
                    <div className="beam-line" />
                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <div className="max-w-xl space-y-3">
                            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Opportunity</p>
                            <h2 className="text-3xl font-semibold text-white">The bridge between GCC energy and Europe carbon monetization</h2>
                            <p className="text-gray-300">
                                SGIF converts sovereign-backed infrastructure into tradable carbon assets. We fuse energy yield with carbon alpha, routing certified credits to EU compliance buyers and premium voluntary demand.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {proofPoints.map((point) => (
                                <div key={point.label} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200">
                                    <point.icon className="h-4 w-4 text-cyber-cyan" />
                                    <span>{point.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-6 shadow-glass">
                        <div className="matrix-rain pointer-events-none absolute inset-0 opacity-40" />
                        <div className="relative space-y-6">
                            <div className="flex items-center gap-3">
                                <RadioTower className="h-5 w-5 text-sgif-emerald" />
                                <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Execution Path</p>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3">
                                {timeline.map((stage) => (
                                    <div key={stage.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                                        <p className="text-xs uppercase tracking-[0.2em] text-cyber-cyan">{stage.year}</p>
                                        <p className="mt-2 text-lg font-semibold text-white">{stage.title}</p>
                                        <p className="text-sm text-gray-400">{stage.detail}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="rounded-xl border border-cyber-cyan/30 bg-cyber-cyan/5 p-4 text-sm text-gray-200">
                                Minimum ticket: $10M · First close: Q3 2025 · Closed-end structure with AI-driven monitoring and sovereign co-invest governance.
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6">
                        <div className="beam-grid" />
                        <div className="relative space-y-4">
                            <div className="flex items-center gap-2">
                                <CloudSun className="h-5 w-5 text-sgif-gold" />
                                <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Carbon Intelligence</p>
                            </div>
                            <h3 className="text-2xl font-semibold text-white">Live carbon revenue strip</h3>
                            <p className="text-gray-300">EU-grade MRV stack, geospatial proof, and automated issuance scheduling feed directly into investor dashboards.</p>
                            <div className="flex flex-col gap-3">
                                {["EU ETS certified pathways", "Automated forward curves", "On-chain attestations for credits"].map((item) => (
                                    <div key={item} className="flex items-center gap-2 text-sm text-gray-200">
                                        <div className="h-2 w-2 rounded-full bg-cyber-cyan animate-neon-pulse" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="rounded-xl border border-sgif-gold/30 bg-sgif-gold/5 p-4 text-sm text-sgif-gold">
                                Carbon alpha compounds yield; we target 22% net IRR with sovereign downside protection.
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/70 p-6 lg:p-10">
                    <div className="beam-line" />
                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <div className="space-y-2">
                            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Partners</p>
                            <h3 className="text-3xl font-semibold text-white">Anchored by sovereign commitments</h3>
                            <p className="text-gray-300">Managed by infrastructure and carbon market veterans with aligned sovereign co-invest.</p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {["PIF", "DEWA", "SEC", "EU ETS Buyers"].map((name) => (
                                <div key={name} className="holo-chip">
                                    <span>{name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: "Energy Yield", value: "14%", icon: LineChart },
                            { label: "Carbon Alpha", value: "8%", icon: ArrowRight },
                            { label: "Downside", value: "Sovereign-de-risked", icon: ShieldCheck },
                            { label: "Optionality", value: "Compliance + Voluntary", icon: Send },
                        ].map((item) => (
                            <div key={item.label} className="glass-card flex items-center gap-3 rounded-xl border-white/10 p-4">
                                <item.icon className="h-6 w-6 text-cyber-cyan" />
                                <div>
                                    <p className="text-sm text-gray-400">{item.label}</p>
                                    <p className="text-lg font-semibold text-white">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="relative z-10 border-t border-white/5 bg-black/60 py-8">
                <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
                    <div>
                        <p className="text-sm uppercase tracking-[0.25em] text-gray-500">SGIF · Sovereign Grade Security</p>
                        <p className="text-xs text-gray-400">Masdar City, UAE · Carbon-native infrastructure fund</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="border-white/20 text-gray-200 hover:border-cyber-cyan hover:text-cyber-cyan">Schedule a call</Button>
                        <Button size="sm" className="bg-cyber-cyan text-black hover:bg-cyber-cyan/80">Get the memo</Button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
