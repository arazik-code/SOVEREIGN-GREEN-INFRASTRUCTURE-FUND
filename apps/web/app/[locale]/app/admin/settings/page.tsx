"use client";

import { useState } from "react";
import { cn } from "@sgif/ui";
import { Button } from "@sgif/ui";
import { motion } from "framer-motion";
import {
    Settings,
    Save,
    Shield,
    Bell,
    Mail,
    Globe,
    Lock,
    Key,
    Palette,
    Clock,
    Database,
    FileText,
    AlertTriangle,
    CheckCircle2,
    ChevronRight,
    Info,
    RefreshCw,
    Zap
} from "lucide-react";

interface SettingSection {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
}

const settingSections: SettingSection[] = [
    { id: "security", title: "Security", description: "Authentication, MFA, and access controls", icon: Shield, color: "cyber-cyan" },
    { id: "notifications", title: "Notifications", description: "Email preferences and alerts", icon: Bell, color: "sgif-gold" },
    { id: "branding", title: "Branding", description: "Logo, colors, and white-label settings", icon: Palette, color: "purple-400" },
    { id: "localization", title: "Localization", description: "Language, timezone, and regional settings", icon: Globe, color: "sgif-emerald" },
    { id: "data", title: "Data & Privacy", description: "Data retention and privacy controls", icon: Database, color: "pink-400" },
    { id: "compliance", title: "Compliance", description: "Regulatory and audit settings", icon: FileText, color: "orange-400" },
];

export default function AdminSettingsPage() {
    const [activeSection, setActiveSection] = useState("security");
    const [hasChanges, setHasChanges] = useState(false);
    const [saving, setSaving] = useState(false);

    // Security settings state
    const [mfaRequired, setMfaRequired] = useState(true);
    const [sessionTimeout, setSessionTimeout] = useState(30);
    const [passwordPolicy, setPasswordPolicy] = useState("strong");
    const [ipWhitelist, setIpWhitelist] = useState(true);

    // Notification settings state
    const [emailDigest, setEmailDigest] = useState("daily");
    const [alertsEnabled, setAlertsEnabled] = useState(true);
    const [reportNotifications, setReportNotifications] = useState(true);

    // Localization settings state
    const [defaultLanguage, setDefaultLanguage] = useState("en");
    const [timezone, setTimezone] = useState("Asia/Dubai");
    const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
    const [currency, setCurrency] = useState("USD");

    const handleSave = async () => {
        setSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSaving(false);
        setHasChanges(false);
    };

    const handleChange = () => {
        setHasChanges(true);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Settings</h1>
                    <p className="text-gray-400 mt-1">Configure platform settings and preferences</p>
                </div>
                <div className="flex items-center gap-3">
                    {hasChanges && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-sm text-sgif-gold flex items-center gap-1"
                        >
                            <AlertTriangle className="h-4 w-4" />
                            Unsaved changes
                        </motion.span>
                    )}
                    <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black gap-2"
                        onClick={handleSave}
                        disabled={!hasChanges || saving}
                    >
                        {saving ? (
                            <>
                                <RefreshCw className="h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="space-y-2">
                    {settingSections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={cn(
                                "w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left",
                                activeSection === section.id
                                    ? "bg-white/10 border border-white/10"
                                    : "hover:bg-white/5"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-lg border",
                                activeSection === section.id
                                    ? `bg-${section.color}/20 border-${section.color}/30`
                                    : "bg-white/5 border-white/10"
                            )}>
                                <section.icon className={cn(
                                    "h-4 w-4",
                                    activeSection === section.id ? `text-${section.color}` : "text-gray-400"
                                )} />
                            </div>
                            <div className="flex-1">
                                <p className={cn(
                                    "font-medium text-sm",
                                    activeSection === section.id ? "text-white" : "text-gray-400"
                                )}>
                                    {section.title}
                                </p>
                            </div>
                            <ChevronRight className={cn(
                                "h-4 w-4",
                                activeSection === section.id ? "text-white" : "text-gray-600"
                            )} />
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="lg:col-span-3">
                    <div className="glass-card p-6 space-y-6">
                        {/* Security Settings */}
                        {activeSection === "security" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                                    <Shield className="h-6 w-6 text-cyber-cyan" />
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">Security Settings</h2>
                                        <p className="text-sm text-gray-500">Configure authentication and access controls</p>
                                    </div>
                                </div>

                                {/* MFA */}
                                <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <Key className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="font-medium text-white">Require MFA</p>
                                            <p className="text-sm text-gray-500">Enforce multi-factor authentication for all users</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { setMfaRequired(!mfaRequired); handleChange(); }}
                                        className={cn(
                                            "w-12 h-6 rounded-full transition-colors relative",
                                            mfaRequired ? "bg-sgif-emerald" : "bg-white/20"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                                            mfaRequired ? "translate-x-7" : "translate-x-1"
                                        )} />
                                    </button>
                                </div>

                                {/* Session Timeout */}
                                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Clock className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="font-medium text-white">Session Timeout</p>
                                            <p className="text-sm text-gray-500">Automatically log out inactive users</p>
                                        </div>
                                    </div>
                                    <select
                                        value={sessionTimeout}
                                        onChange={(e) => { setSessionTimeout(parseInt(e.target.value)); handleChange(); }}
                                        className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyber-cyan/50"
                                    >
                                        <option value="15" className="bg-gray-900">15 minutes</option>
                                        <option value="30" className="bg-gray-900">30 minutes</option>
                                        <option value="60" className="bg-gray-900">1 hour</option>
                                        <option value="120" className="bg-gray-900">2 hours</option>
                                    </select>
                                </div>

                                {/* Password Policy */}
                                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="font-medium text-white">Password Policy</p>
                                            <p className="text-sm text-gray-500">Set minimum password requirements</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {["basic", "strong", "enterprise"].map(policy => (
                                            <button
                                                key={policy}
                                                onClick={() => { setPasswordPolicy(policy); handleChange(); }}
                                                className={cn(
                                                    "p-3 rounded-lg border text-sm font-medium capitalize transition-all",
                                                    passwordPolicy === policy
                                                        ? "bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan"
                                                        : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                                                )}
                                            >
                                                {policy}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* IP Whitelist */}
                                <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <Globe className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="font-medium text-white">IP Whitelist</p>
                                            <p className="text-sm text-gray-500">Restrict access to approved IP addresses</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { setIpWhitelist(!ipWhitelist); handleChange(); }}
                                        className={cn(
                                            "w-12 h-6 rounded-full transition-colors relative",
                                            ipWhitelist ? "bg-sgif-emerald" : "bg-white/20"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                                            ipWhitelist ? "translate-x-7" : "translate-x-1"
                                        )} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Notifications Settings */}
                        {activeSection === "notifications" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                                    <Bell className="h-6 w-6 text-sgif-gold" />
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">Notification Settings</h2>
                                        <p className="text-sm text-gray-500">Configure email and alert preferences</p>
                                    </div>
                                </div>

                                {/* Email Digest */}
                                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="font-medium text-white">Email Digest Frequency</p>
                                            <p className="text-sm text-gray-500">How often to send summary emails</p>
                                        </div>
                                    </div>
                                    <select
                                        value={emailDigest}
                                        onChange={(e) => { setEmailDigest(e.target.value); handleChange(); }}
                                        className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyber-cyan/50"
                                    >
                                        <option value="realtime" className="bg-gray-900">Real-time</option>
                                        <option value="daily" className="bg-gray-900">Daily</option>
                                        <option value="weekly" className="bg-gray-900">Weekly</option>
                                        <option value="never" className="bg-gray-900">Never</option>
                                    </select>
                                </div>

                                {/* Alerts */}
                                <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <Zap className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="font-medium text-white">System Alerts</p>
                                            <p className="text-sm text-gray-500">Receive alerts for important events</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { setAlertsEnabled(!alertsEnabled); handleChange(); }}
                                        className={cn(
                                            "w-12 h-6 rounded-full transition-colors relative",
                                            alertsEnabled ? "bg-sgif-emerald" : "bg-white/20"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                                            alertsEnabled ? "translate-x-7" : "translate-x-1"
                                        )} />
                                    </button>
                                </div>

                                {/* Report Notifications */}
                                <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="font-medium text-white">Report Notifications</p>
                                            <p className="text-sm text-gray-500">Notify when new reports are published</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { setReportNotifications(!reportNotifications); handleChange(); }}
                                        className={cn(
                                            "w-12 h-6 rounded-full transition-colors relative",
                                            reportNotifications ? "bg-sgif-emerald" : "bg-white/20"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                                            reportNotifications ? "translate-x-7" : "translate-x-1"
                                        )} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Localization Settings */}
                        {activeSection === "localization" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                                    <Globe className="h-6 w-6 text-sgif-emerald" />
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">Localization Settings</h2>
                                        <p className="text-sm text-gray-500">Configure language and regional preferences</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {/* Language */}
                                    <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                        <p className="font-medium text-white mb-3">Default Language</p>
                                        <select
                                            value={defaultLanguage}
                                            onChange={(e) => { setDefaultLanguage(e.target.value); handleChange(); }}
                                            className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyber-cyan/50"
                                        >
                                            <option value="en" className="bg-gray-900">English</option>
                                            <option value="ar" className="bg-gray-900">العربية (Arabic)</option>
                                            <option value="fr" className="bg-gray-900">Français (French)</option>
                                        </select>
                                    </div>

                                    {/* Timezone */}
                                    <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                        <p className="font-medium text-white mb-3">Timezone</p>
                                        <select
                                            value={timezone}
                                            onChange={(e) => { setTimezone(e.target.value); handleChange(); }}
                                            className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyber-cyan/50"
                                        >
                                            <option value="Asia/Dubai" className="bg-gray-900">Dubai (GST, UTC+4)</option>
                                            <option value="Asia/Riyadh" className="bg-gray-900">Riyadh (AST, UTC+3)</option>
                                            <option value="Europe/London" className="bg-gray-900">London (GMT/BST)</option>
                                            <option value="America/New_York" className="bg-gray-900">New York (EST/EDT)</option>
                                        </select>
                                    </div>

                                    {/* Date Format */}
                                    <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                        <p className="font-medium text-white mb-3">Date Format</p>
                                        <select
                                            value={dateFormat}
                                            onChange={(e) => { setDateFormat(e.target.value); handleChange(); }}
                                            className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyber-cyan/50"
                                        >
                                            <option value="DD/MM/YYYY" className="bg-gray-900">DD/MM/YYYY</option>
                                            <option value="MM/DD/YYYY" className="bg-gray-900">MM/DD/YYYY</option>
                                            <option value="YYYY-MM-DD" className="bg-gray-900">YYYY-MM-DD</option>
                                        </select>
                                    </div>

                                    {/* Currency */}
                                    <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                                        <p className="font-medium text-white mb-3">Display Currency</p>
                                        <select
                                            value={currency}
                                            onChange={(e) => { setCurrency(e.target.value); handleChange(); }}
                                            className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyber-cyan/50"
                                        >
                                            <option value="USD" className="bg-gray-900">USD ($)</option>
                                            <option value="AED" className="bg-gray-900">AED (د.إ)</option>
                                            <option value="SAR" className="bg-gray-900">SAR (﷼)</option>
                                            <option value="EUR" className="bg-gray-900">EUR (€)</option>
                                        </select>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Placeholder for other sections */}
                        {["branding", "data", "compliance"].includes(activeSection) && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-12"
                            >
                                <Settings className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-white mb-2">
                                    {settingSections.find(s => s.id === activeSection)?.title} Settings
                                </h3>
                                <p className="text-gray-500">
                                    Configure {settingSections.find(s => s.id === activeSection)?.description.toLowerCase()}
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
