"use client";

import * as React from "react";
import { Button, cn } from "@sgif/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    UserPlus,
    Mail,
    Shield,
    Send,
    Check,
    Loader2,
    AlertCircle,
    Copy,
    Link2,
    User,
    Building2,
    Calendar
} from "lucide-react";
import { type UserRole, ROLE_DEFINITIONS } from "@sgif/lib";

export interface InviteData {
    email: string;
    role: UserRole;
    organization?: string;
    expiresIn: '24h' | '7d' | '30d' | 'never';
    personalMessage?: string;
}

interface UserInviteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onInvite: (data: InviteData) => Promise<{ success: boolean; inviteLink?: string }>;
    className?: string;
}

export function UserInviteModal({
    isOpen,
    onClose,
    onInvite,
    className,
}: UserInviteModalProps) {
    const [step, setStep] = React.useState<'form' | 'sending' | 'success'>('form');
    const [inviteLink, setInviteLink] = React.useState('');
    const [copied, setCopied] = React.useState(false);
    const [error, setError] = React.useState('');
    
    const [formData, setFormData] = React.useState<InviteData>({
        email: '',
        role: 'LP',
        organization: '',
        expiresIn: '7d',
        personalMessage: '',
    });

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        setStep('sending');
        
        try {
            const result = await onInvite(formData);
            if (result.success) {
                setInviteLink(result.inviteLink || '');
                setStep('success');
            } else {
                setError('Failed to send invitation');
                setStep('form');
            }
        } catch (err) {
            setError('An error occurred');
            setStep('form');
        }
    };

    const handleCopyLink = async () => {
        await navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const resetAndClose = () => {
        setStep('form');
        setFormData({
            email: '',
            role: 'LP',
            organization: '',
            expiresIn: '7d',
            personalMessage: '',
        });
        setInviteLink('');
        setError('');
        onClose();
    };

    const roleOptions: UserRole[] = ['LP', 'Advisor', 'Auditor', 'Government_Observer'];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={resetAndClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className={cn(
                            "glass-card w-full max-w-md overflow-hidden relative",
                            className
                        )}>
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent" />

                            {/* Header */}
                            <div className="p-6 border-b border-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20">
                                            <UserPlus className="h-5 w-5 text-cyber-cyan" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-white">Invite User</h2>
                                            <p className="text-xs text-gray-500">Send a secure invitation</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={resetAndClose}
                                        className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <AnimatePresence mode="wait">
                                    {step === 'form' && (
                                        <motion.form
                                            key="form"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            onSubmit={handleSubmit}
                                            className="space-y-5"
                                        >
                                            {/* Email */}
                                            <div>
                                                <label className="text-sm font-medium text-gray-400 flex items-center gap-2 mb-2">
                                                    <Mail className="h-4 w-4" />
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                    placeholder="investor@example.com"
                                                    className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30 transition-all"
                                                    required
                                                />
                                            </div>

                                            {/* Role */}
                                            <div>
                                                <label className="text-sm font-medium text-gray-400 flex items-center gap-2 mb-2">
                                                    <Shield className="h-4 w-4" />
                                                    Access Role
                                                </label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {roleOptions.map(role => {
                                                        const def = ROLE_DEFINITIONS[role];
                                                        const isSelected = formData.role === role;
                                                        
                                                        return (
                                                            <button
                                                                key={role}
                                                                type="button"
                                                                onClick={() => setFormData(prev => ({ ...prev, role }))}
                                                                className={cn(
                                                                    "p-3 rounded-lg border text-left transition-all",
                                                                    isSelected
                                                                        ? `bg-${def.color}/10 border-${def.color}/30`
                                                                        : "bg-white/5 border-white/10 hover:border-white/20"
                                                                )}
                                                            >
                                                                <span className={cn(
                                                                    "text-sm font-medium block",
                                                                    isSelected ? `text-${def.color}` : "text-gray-300"
                                                                )}>
                                                                    {def.displayName}
                                                                </span>
                                                                <span className="text-xs text-gray-500 block mt-0.5 truncate">
                                                                    {def.description}
                                                                </span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Organization */}
                                            <div>
                                                <label className="text-sm font-medium text-gray-400 flex items-center gap-2 mb-2">
                                                    <Building2 className="h-4 w-4" />
                                                    Organization (Optional)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.organization}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                                                    placeholder="Company name"
                                                    className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30 transition-all"
                                                />
                                            </div>

                                            {/* Expiration */}
                                            <div>
                                                <label className="text-sm font-medium text-gray-400 flex items-center gap-2 mb-2">
                                                    <Calendar className="h-4 w-4" />
                                                    Link Expires
                                                </label>
                                                <div className="flex gap-2">
                                                    {(['24h', '7d', '30d', 'never'] as const).map(exp => (
                                                        <button
                                                            key={exp}
                                                            type="button"
                                                            onClick={() => setFormData(prev => ({ ...prev, expiresIn: exp }))}
                                                            className={cn(
                                                                "flex-1 py-2 px-3 rounded-lg border text-sm transition-all",
                                                                formData.expiresIn === exp
                                                                    ? "bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan"
                                                                    : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                                                            )}
                                                        >
                                                            {exp === 'never' ? 'Never' : exp}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Personal message */}
                                            <div>
                                                <label className="text-sm font-medium text-gray-400 mb-2 block">
                                                    Personal Message (Optional)
                                                </label>
                                                <textarea
                                                    value={formData.personalMessage}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, personalMessage: e.target.value }))}
                                                    placeholder="Add a personal note to the invitation..."
                                                    rows={3}
                                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30 transition-all resize-none"
                                                />
                                            </div>

                                            {error && (
                                                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                                    {error}
                                                </div>
                                            )}
                                        </motion.form>
                                    )}

                                    {step === 'sending' && (
                                        <motion.div
                                            key="sending"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="py-12 text-center"
                                        >
                                            <Loader2 className="h-12 w-12 text-cyber-cyan mx-auto animate-spin" />
                                            <p className="text-gray-400 mt-4">Sending invitation...</p>
                                        </motion.div>
                                    )}

                                    {step === 'success' && (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-8"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", delay: 0.1 }}
                                                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sgif-emerald/10 border border-sgif-emerald/20 mb-4"
                                            >
                                                <Check className="h-8 w-8 text-sgif-emerald" />
                                            </motion.div>
                                            
                                            <h3 className="text-xl font-semibold text-white mb-2">Invitation Sent</h3>
                                            <p className="text-gray-400 text-sm mb-6">
                                                An invitation has been sent to {formData.email}
                                            </p>

                                            {inviteLink && (
                                                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 text-left">
                                                    <p className="text-xs text-gray-500 mb-2">Invite Link</p>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            value={inviteLink}
                                                            readOnly
                                                            className="flex-1 px-3 py-2 rounded bg-white/5 border border-white/10 text-xs text-gray-400 font-mono"
                                                        />
                                                        <Button
                                                            size="sm"
                                                            onClick={handleCopyLink}
                                                            className={cn(
                                                                "gap-1",
                                                                copied 
                                                                    ? "bg-sgif-emerald text-white" 
                                                                    : "bg-white/10 text-white"
                                                            )}
                                                        >
                                                            {copied ? (
                                                                <>
                                                                    <Check className="h-3 w-3" />
                                                                    Copied
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Copy className="h-3 w-3" />
                                                                    Copy
                                                                </>
                                                            )}
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-white/5 flex justify-end gap-3">
                                {step === 'form' && (
                                    <>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={resetAndClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={handleSubmit}
                                            className="bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black font-semibold gap-2"
                                        >
                                            <Send className="h-4 w-4" />
                                            Send Invitation
                                        </Button>
                                    </>
                                )}
                                {step === 'success' && (
                                    <>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setStep('form');
                                                setFormData(prev => ({ ...prev, email: '' }));
                                            }}
                                            className="gap-2"
                                        >
                                            <UserPlus className="h-4 w-4" />
                                            Invite Another
                                        </Button>
                                        <Button
                                            onClick={resetAndClose}
                                            className="bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black font-semibold"
                                        >
                                            Done
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
