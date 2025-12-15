"use client";

import { useState } from "react";
import { Button, cn } from "@sgif/ui";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { 
    Mail, 
    Phone, 
    MapPin, 
    Send, 
    Hexagon, 
    CheckCircle2, 
    Loader2,
    Building2,
    Globe,
    Clock
} from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        organization: "",
        type: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-background py-24 px-4">
            {/* Background effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-sgif-gold/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto relative">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyber-cyan/20 to-sgif-gold/20 border border-white/10 mb-6">
                        <Hexagon className="w-8 h-8 text-cyber-cyan" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
                        Contact Us
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Connect with our team for investment inquiries, partnership opportunities, 
                        or general information about SGIF.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="glass-card p-6">
                            <h3 className="text-lg font-semibold text-white mb-6">Get in Touch</h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20">
                                        <MapPin className="h-5 w-5 text-cyber-cyan" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Headquarters</p>
                                        <p className="text-sm text-gray-400">
                                            SGIF Tower, Floor 42<br />
                                            Abu Dhabi Global Market Square<br />
                                            Abu Dhabi, UAE
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-sgif-gold/10 border border-sgif-gold/20">
                                        <Mail className="h-5 w-5 text-sgif-gold" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Email</p>
                                        <p className="text-sm text-gray-400">
                                            General: info@sgif.gov<br />
                                            Investor Relations: ir@sgif.gov
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-sgif-emerald/10 border border-sgif-emerald/20">
                                        <Phone className="h-5 w-5 text-sgif-emerald" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Phone</p>
                                        <p className="text-sm text-gray-400">
                                            +971 2 XXX XXXX<br />
                                            Available 9AM - 6PM GST
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Global Offices</h3>
                            <div className="space-y-3">
                                {[
                                    { city: "Riyadh", country: "Saudi Arabia" },
                                    { city: "London", country: "United Kingdom" },
                                    { city: "Singapore", country: "Singapore" },
                                ].map((office, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                                        <Globe className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm text-gray-300">{office.city}</span>
                                        <span className="text-xs text-gray-600">{office.country}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Office Hours</h3>
                            <div className="flex items-center gap-3">
                                <Clock className="h-5 w-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-300">Sunday - Thursday</p>
                                    <p className="text-xs text-gray-500">9:00 AM - 6:00 PM GST</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="glass-card p-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent" />
                            
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-sgif-emerald/10 border border-sgif-emerald/20 mb-6">
                                        <CheckCircle2 className="h-10 w-10 text-sgif-emerald" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3">Message Received</h3>
                                    <p className="text-gray-400 max-w-md mx-auto mb-8">
                                        Thank you for contacting SGIF. Our team will review your inquiry 
                                        and respond within 2-3 business days.
                                    </p>
                                    <Button
                                        onClick={() => {
                                            setSubmitted(false);
                                            setFormData({ name: "", email: "", organization: "", type: "", message: "" });
                                        }}
                                        variant="outline"
                                        className="border-white/10"
                                    >
                                        Send Another Message
                                    </Button>
                                </motion.div>
                            ) : (
                                <>
                                    <h3 className="text-xl font-semibold text-white mb-6">Send a Message</h3>
                                    
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-sm font-medium text-gray-400 block mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                    className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30 transition-all"
                                                    placeholder="John Smith"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-400 block mb-2">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                    className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30 transition-all"
                                                    placeholder="john@organization.com"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-sm font-medium text-gray-400 block mb-2">
                                                    Organization
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.organization}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                                                    className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30 transition-all"
                                                    placeholder="Your organization"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-400 block mb-2">
                                                    Inquiry Type *
                                                </label>
                                                <select
                                                    value={formData.type}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                                                    className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30 transition-all"
                                                    required
                                                >
                                                    <option value="" className="bg-gray-900">Select type</option>
                                                    <option value="investment" className="bg-gray-900">Investment Inquiry</option>
                                                    <option value="partnership" className="bg-gray-900">Partnership</option>
                                                    <option value="media" className="bg-gray-900">Media / Press</option>
                                                    <option value="general" className="bg-gray-900">General Inquiry</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-400 block mb-2">
                                                Message *
                                            </label>
                                            <textarea
                                                value={formData.message}
                                                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                                rows={5}
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30 transition-all resize-none"
                                                placeholder="Tell us about your inquiry..."
                                                required
                                            />
                                        </div>

                                        <div className="flex items-center justify-between pt-4">
                                            <p className="text-xs text-gray-600">
                                                * Required fields
                                            </p>
                                            <Button
                                                type="submit"
                                                disabled={loading}
                                                className="bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black font-semibold gap-2"
                                            >
                                                {loading ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="h-4 w-4" />
                                                        Send Message
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
