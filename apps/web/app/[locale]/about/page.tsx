import { cn } from "@sgif/ui";
import { Link } from "@/navigation";
import { Hexagon, Leaf, Globe, Shield, TrendingUp, Users, Award, ArrowRight } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-24 px-4">
                {/* Background effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sgif-emerald/5 rounded-full blur-3xl" />
                </div>

                <div className="max-w-6xl mx-auto relative">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyber-cyan/20 to-sgif-gold/20 border border-white/10 mb-6">
                            <Hexagon className="w-10 h-10 text-cyber-cyan" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-6">
                            Sovereign Green Infrastructure Fund
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Accelerating the transition to a sustainable future through strategic 
                            infrastructure investments across the Gulf Cooperation Council region.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        {[
                            { value: "$500M", label: "Fund Size", color: "sgif-gold" },
                            { value: "8", label: "Active Projects", color: "cyber-cyan" },
                            { value: "1.2M", label: "Tonnes CO₂ Offset", color: "sgif-emerald" },
                            { value: "14.2%", label: "Target IRR", color: "purple-400" },
                        ].map((stat, i) => (
                            <div key={i} className="glass-card p-6 text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                <p className={cn("text-4xl font-bold mb-2 font-mono", `text-${stat.color}`)}>
                                    {stat.value}
                                </p>
                                <p className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 px-4 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                            <p className="text-gray-400 mb-6">
                                SGIF is dedicated to deploying sovereign capital into transformative 
                                green infrastructure projects that generate both attractive financial 
                                returns and meaningful environmental impact.
                            </p>
                            <p className="text-gray-400 mb-6">
                                We partner with governments, development finance institutions, and 
                                leading private sector operators to identify, structure, and execute 
                                investments that advance the region's sustainability objectives.
                            </p>
                            <Link 
                                href="/contact"
                                className="inline-flex items-center gap-2 text-cyber-cyan hover:text-white transition-colors"
                            >
                                Learn more about our approach
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Leaf, title: "Sustainability", description: "ESG-integrated investment approach" },
                                { icon: Shield, title: "Governance", description: "Institutional-grade oversight" },
                                { icon: TrendingUp, title: "Returns", description: "Risk-adjusted performance" },
                                { icon: Globe, title: "Impact", description: "Measurable environmental outcomes" },
                            ].map((item, i) => (
                                <div key={i} className="glass-card p-6 group hover:border-white/20 transition-all">
                                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 inline-block mb-4 group-hover:bg-white/10 transition-colors">
                                        <item.icon className="h-6 w-6 text-sgif-emerald" />
                                    </div>
                                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                                    <p className="text-sm text-gray-500">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Investment Focus */}
            <section className="py-24 px-4 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">Investment Focus</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Renewable Energy",
                                description: "Utility-scale solar, wind, and energy storage projects powering the GCC's clean energy transition.",
                                projects: "4 Active",
                                icon: "☀️"
                            },
                            {
                                title: "Green Infrastructure",
                                description: "Sustainable transportation, water treatment, and waste management infrastructure.",
                                projects: "2 Active",
                                icon: "🏗️"
                            },
                            {
                                title: "Carbon Markets",
                                description: "Strategic investments in high-quality carbon offset projects and credit trading.",
                                projects: "2 Active",
                                icon: "🌿"
                            },
                        ].map((focus, i) => (
                            <div key={i} className="glass-card p-8 group hover:border-sgif-emerald/30 transition-all relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sgif-emerald/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="text-4xl mb-4">{focus.icon}</div>
                                <h3 className="text-xl font-semibold text-white mb-3">{focus.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{focus.description}</p>
                                <span className="text-xs px-2 py-1 rounded bg-sgif-emerald/10 text-sgif-emerald border border-sgif-emerald/20">
                                    {focus.projects}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 px-4 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">Leadership</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { name: "H.E. Mohammed Al-Rashid", role: "Chairman", org: "Ministry of Finance" },
                            { name: "Sarah Chen", role: "Managing Partner", org: "SGIF Management" },
                            { name: "Dr. Ahmed Hassan", role: "Chief Investment Officer", org: "SGIF Management" },
                            { name: "James Williams", role: "Head of ESG", org: "SGIF Management" },
                        ].map((person, i) => (
                            <div key={i} className="glass-card p-6 text-center group hover:border-white/20 transition-all">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyber-cyan/20 to-sgif-gold/20 border border-white/10 flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="font-semibold text-white">{person.name}</h3>
                                <p className="text-sm text-sgif-gold">{person.role}</p>
                                <p className="text-xs text-gray-500 mt-1">{person.org}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <Award className="h-12 w-12 text-sgif-gold mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-6">Partner With Us</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        SGIF welcomes discussions with institutional investors, sovereign wealth funds, 
                        and development finance institutions interested in sustainable infrastructure.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link 
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black font-semibold hover:opacity-90 transition-opacity"
                        >
                            Contact Us
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link 
                            href="/login"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
                        >
                            LP Login
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
