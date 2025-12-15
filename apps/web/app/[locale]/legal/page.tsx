import { cn } from "@sgif/ui";
import { Link } from "@/navigation";
import { Hexagon, FileText, Shield, Scale, AlertCircle } from "lucide-react";

export default function LegalPage() {
    return (
        <div className="min-h-screen bg-background py-24 px-4">
            {/* Background effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto relative">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyber-cyan/20 to-sgif-gold/20 border border-white/10 mb-6">
                        <Scale className="w-8 h-8 text-cyber-cyan" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
                        Legal Information
                    </h1>
                    <p className="text-gray-400">
                        Important legal notices, terms of use, and regulatory information.
                    </p>
                </div>

                {/* Navigation */}
                <div className="flex flex-wrap gap-3 justify-center mb-12">
                    {[
                        { id: "terms", label: "Terms of Use" },
                        { id: "privacy", label: "Privacy Policy" },
                        { id: "disclaimer", label: "Disclaimer" },
                        { id: "regulatory", label: "Regulatory" },
                    ].map(item => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all text-sm"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                {/* Content Sections */}
                <div className="space-y-12">
                    {/* Terms of Use */}
                    <section id="terms" className="glass-card p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent" />
                        
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20">
                                <FileText className="h-5 w-5 text-cyber-cyan" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Terms of Use</h2>
                        </div>

                        <div className="prose prose-invert prose-sm max-w-none">
                            <p className="text-gray-400">
                                Last updated: December 2024
                            </p>
                            
                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">1. Acceptance of Terms</h3>
                            <p className="text-gray-400">
                                By accessing and using the Sovereign Green Infrastructure Fund ("SGIF") platform, 
                                you agree to be bound by these Terms of Use. If you do not agree to these terms, 
                                please do not access or use the platform.
                            </p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">2. Eligibility</h3>
                            <p className="text-gray-400">
                                The SGIF platform is intended for use by qualified institutional investors, 
                                sovereign wealth funds, and accredited investors. Access is subject to verification 
                                of your investor status and completion of required KYC/AML procedures.
                            </p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">3. Account Security</h3>
                            <p className="text-gray-400">
                                You are responsible for maintaining the confidentiality of your account credentials 
                                and for all activities that occur under your account. You must immediately notify 
                                SGIF of any unauthorized use of your account.
                            </p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">4. Intellectual Property</h3>
                            <p className="text-gray-400">
                                All content, data, and materials on this platform are the property of SGIF or its 
                                licensors and are protected by intellectual property laws. Unauthorized reproduction 
                                or distribution is strictly prohibited.
                            </p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">5. Limitation of Liability</h3>
                            <p className="text-gray-400">
                                SGIF shall not be liable for any indirect, incidental, special, consequential, or 
                                punitive damages resulting from your use of or inability to use the platform.
                            </p>
                        </div>
                    </section>

                    {/* Privacy Policy */}
                    <section id="privacy" className="glass-card p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sgif-gold to-transparent" />
                        
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-sgif-gold/10 border border-sgif-gold/20">
                                <Shield className="h-5 w-5 text-sgif-gold" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Privacy Policy</h2>
                        </div>

                        <div className="prose prose-invert prose-sm max-w-none">
                            <p className="text-gray-400">
                                Last updated: December 2024
                            </p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Data Collection</h3>
                            <p className="text-gray-400">
                                We collect information that you provide directly to us, including personal 
                                identification information, financial information, and organizational details 
                                required for KYC compliance and investment processing.
                            </p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Data Usage</h3>
                            <p className="text-gray-400">
                                Your data is used to verify your identity, process investments, provide platform 
                                access, generate reports, and comply with regulatory requirements. We do not sell 
                                or share your personal information with third parties for marketing purposes.
                            </p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Data Security</h3>
                            <p className="text-gray-400">
                                We implement institutional-grade security measures including encryption, 
                                access controls, and regular security audits to protect your information. 
                                Data is stored in secure, compliant facilities.
                            </p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Your Rights</h3>
                            <p className="text-gray-400">
                                You have the right to access, correct, or delete your personal information. 
                                Contact our privacy team at privacy@sgif.gov for any privacy-related requests.
                            </p>
                        </div>
                    </section>

                    {/* Disclaimer */}
                    <section id="disclaimer" className="glass-card p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                        
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                                <AlertCircle className="h-5 w-5 text-red-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Important Disclaimer</h2>
                        </div>

                        <div className="prose prose-invert prose-sm max-w-none">
                            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20 mb-6">
                                <p className="text-red-400 text-sm">
                                    This material is provided for informational purposes only and does not constitute 
                                    investment advice, an offer to sell, or a solicitation of an offer to buy any 
                                    securities or investment products.
                                </p>
                            </div>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Investment Risks</h3>
                            <p className="text-gray-400">
                                Investments in infrastructure and private equity involve significant risks including 
                                the potential loss of principal. Past performance is not indicative of future results. 
                                Investors should carefully consider their investment objectives and risk tolerance.
                            </p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Forward-Looking Statements</h3>
                            <p className="text-gray-400">
                                This platform may contain forward-looking statements including projections and 
                                forecasts. These statements are based on current expectations and involve inherent 
                                risks and uncertainties. Actual results may differ materially.
                            </p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">No Guarantee</h3>
                            <p className="text-gray-400">
                                SGIF does not guarantee any specific level of return or the achievement of investment 
                                objectives. IRR projections and other metrics are targets only and should not be 
                                construed as promises or guarantees.
                            </p>
                        </div>
                    </section>

                    {/* Regulatory */}
                    <section id="regulatory" className="glass-card p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sgif-emerald to-transparent" />
                        
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-sgif-emerald/10 border border-sgif-emerald/20">
                                <Hexagon className="h-5 w-5 text-sgif-emerald" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Regulatory Information</h2>
                        </div>

                        <div className="prose prose-invert prose-sm max-w-none">
                            <p className="text-gray-400">
                                The Sovereign Green Infrastructure Fund is registered and regulated in the 
                                Abu Dhabi Global Market (ADGM). SGIF Management Company is authorized by the 
                                Financial Services Regulatory Authority (FSRA).
                            </p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Registration Details</h3>
                            <ul className="text-gray-400 space-y-2">
                                <li>• FSRA Registration Number: FS-XXXXXX</li>
                                <li>• Fund License: FL-XXXXXX</li>
                                <li>• Legal Entity Identifier (LEI): XXXXXXXXXXXXXXXXXXXX</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Compliance</h3>
                            <p className="text-gray-400">
                                SGIF maintains compliance with applicable regulations including anti-money 
                                laundering (AML), know your customer (KYC), and sanctions requirements. 
                                We adhere to ESG reporting standards and international best practices.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center text-sm text-gray-600">
                    <p>© {new Date().getFullYear()} Sovereign Green Infrastructure Fund. All rights reserved.</p>
                    <p className="mt-2">
                        For legal inquiries, contact <a href="mailto:legal@sgif.gov" className="text-cyber-cyan hover:underline">legal@sgif.gov</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
