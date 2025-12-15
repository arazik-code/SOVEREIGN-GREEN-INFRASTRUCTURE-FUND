"use client";

import { Button } from "@sgif/ui";
import { Settings, User, Bell, Shield, Palette, Globe, Moon, Sun, Fingerprint, Key, Zap, Check } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
    const [notifications, setNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [twoFactor, setTwoFactor] = useState(false);

    return (
        <div className="flex flex-col gap-6 max-w-4xl relative">
            {/* Background effects */}
            <div className="fixed top-1/4 right-1/4 w-72 h-72 bg-sgif-gold/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                            <Settings className="h-8 w-8 text-gray-400" />
                        </div>
                        Settings
                    </h1>
                    <p className="text-gray-500 mt-2">Configure your workspace and preferences</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Profile Section */}
                <div className="glass-card p-6">
                    <h3 className="font-semibold mb-6 text-white flex items-center gap-2">
                        <div className="w-1 h-5 bg-gradient-to-b from-sgif-gold to-orange-400 rounded-full" />
                        <User className="h-5 w-5 text-sgif-gold" /> Profile Settings
                    </h3>
                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="text-sm text-gray-400 mb-1.5 block">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue="Demo User"
                                    className="w-full h-11 rounded-xl border border-white/10 bg-gray-900/50 px-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sgif-gold/50 focus:border-sgif-gold/50 transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 mb-1.5 block">Email</label>
                                <input
                                    type="email"
                                    defaultValue="demo@sgif.gov"
                                    className="w-full h-11 rounded-xl border border-white/10 bg-gray-900/50 px-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sgif-gold/50 focus:border-sgif-gold/50 transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-1.5 block">Role</label>
                            <input
                                type="text"
                                defaultValue="Fund Manager"
                                disabled
                                className="w-full h-11 rounded-xl border border-white/5 bg-gray-900/30 px-4 text-sm text-gray-500 cursor-not-allowed"
                            />
                        </div>
                        <Button className="bg-gradient-to-r from-sgif-gold to-orange-500 hover:from-sgif-gold/90 hover:to-orange-500/90 text-black font-semibold shadow-lg shadow-sgif-gold/25 border border-sgif-gold/30 transition-all duration-300">
                            <Check className="mr-2 h-4 w-4" /> Save Changes
                        </Button>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="glass-card p-6">
                    <h3 className="font-semibold mb-6 text-white flex items-center gap-2">
                        <div className="w-1 h-5 bg-gradient-to-b from-cyber-cyan to-blue-400 rounded-full" />
                        <Bell className="h-5 w-5 text-cyber-cyan" /> Notifications
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                            <div>
                                <p className="font-medium text-white">Email Notifications</p>
                                <p className="text-sm text-gray-500">Receive email updates about your projects</p>
                            </div>
                            <button
                                onClick={() => setNotifications(!notifications)}
                                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ${
                                    notifications 
                                        ? 'bg-gradient-to-r from-sgif-gold to-orange-500 shadow-lg shadow-sgif-gold/30' 
                                        : 'bg-gray-700'
                                }`}
                            >
                                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                                    notifications ? 'translate-x-6' : 'translate-x-1'
                                }`} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                            <div>
                                <p className="font-medium text-white">Push Notifications</p>
                                <p className="text-sm text-gray-500">Receive push notifications in browser</p>
                            </div>
                            <button
                                onClick={() => setPushNotifications(!pushNotifications)}
                                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ${
                                    pushNotifications 
                                        ? 'bg-gradient-to-r from-sgif-gold to-orange-500 shadow-lg shadow-sgif-gold/30' 
                                        : 'bg-gray-700'
                                }`}
                            >
                                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                                    pushNotifications ? 'translate-x-6' : 'translate-x-1'
                                }`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="glass-card p-6">
                    <h3 className="font-semibold mb-6 text-white flex items-center gap-2">
                        <div className="w-1 h-5 bg-gradient-to-b from-sgif-emerald to-green-400 rounded-full" />
                        <Shield className="h-5 w-5 text-sgif-emerald" /> Security
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-sgif-emerald/30 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-sgif-emerald/10 border border-sgif-emerald/20">
                                    <Fingerprint className="h-5 w-5 text-sgif-emerald" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">Two-Factor Authentication</p>
                                    <p className="text-sm text-gray-500">Add an extra layer of quantum-grade security</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setTwoFactor(!twoFactor)}
                                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ${
                                    twoFactor 
                                        ? 'bg-gradient-to-r from-sgif-emerald to-green-500 shadow-lg shadow-sgif-emerald/30' 
                                        : 'bg-gray-700'
                                }`}
                            >
                                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                                    twoFactor ? 'translate-x-6' : 'translate-x-1'
                                }`} />
                            </button>
                        </div>
                        <Button variant="outline" className="border-white/10 hover:border-sgif-emerald/30 hover:bg-sgif-emerald/10 hover:text-sgif-emerald transition-all">
                            <Key className="mr-2 h-4 w-4" /> Change Password
                        </Button>
                    </div>
                </div>

                {/* Appearance Section */}
                <div className="glass-card p-6">
                    <h3 className="font-semibold mb-6 text-white flex items-center gap-2">
                        <div className="w-1 h-5 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full" />
                        <Palette className="h-5 w-5 text-purple-400" /> Appearance
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <p className="font-medium text-white mb-3">Theme</p>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="border-white/10 hover:border-white/20 transition-all">
                                    <Sun className="mr-2 h-4 w-4" /> Light
                                </Button>
                                <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border border-purple-400/30 shadow-lg shadow-purple-500/25">
                                    <Moon className="mr-2 h-4 w-4" /> Dark
                                </Button>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium text-white mb-3">Language</p>
                            <div className="flex gap-2">
                                <Button size="sm" className="bg-gradient-to-r from-cyber-cyan to-blue-500 text-white border border-cyber-cyan/30 shadow-lg shadow-cyber-cyan/25">
                                    <Globe className="mr-2 h-4 w-4" /> English
                                </Button>
                                <Button variant="outline" size="sm" className="border-white/10 hover:border-sgif-gold/30 hover:bg-sgif-gold/10 transition-all">العربية</Button>
                                <Button variant="outline" size="sm" className="border-white/10 hover:border-sgif-emerald/30 hover:bg-sgif-emerald/10 transition-all">Français</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
