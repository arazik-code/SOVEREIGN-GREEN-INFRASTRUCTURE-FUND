"use client";

import * as React from "react";
import { Button, cn } from "@sgif/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Check,
    ChevronRight,
    ChevronLeft,
    Building2,
    User,
    Shield,
    FileText,
    Upload,
    Briefcase,
    Globe,
    CheckCircle2,
    AlertCircle,
    Hexagon
} from "lucide-react";

type OnboardingStep = 'welcome' | 'profile' | 'organization' | 'kyc' | 'preferences' | 'complete';

interface OnboardingData {
    firstName: string;
    lastName: string;
    title: string;
    organizationName: string;
    organizationType: string;
    country: string;
    kycConsent: boolean;
    investmentPreferences: string[];
    communicationPreferences: string[];
}

interface OnboardingWizardProps {
    isOpen: boolean;
    onComplete: (data: OnboardingData) => Promise<void>;
    onSkip?: () => void;
    className?: string;
}

const steps: { key: OnboardingStep; label: string; icon: React.ElementType }[] = [
    { key: 'welcome', label: 'Welcome', icon: Hexagon },
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'organization', label: 'Organization', icon: Building2 },
    { key: 'kyc', label: 'Verification', icon: Shield },
    { key: 'preferences', label: 'Preferences', icon: Briefcase },
    { key: 'complete', label: 'Complete', icon: CheckCircle2 },
];

export function OnboardingWizard({ isOpen, onComplete, onSkip, className }: OnboardingWizardProps) {
    const [currentStep, setCurrentStep] = React.useState<OnboardingStep>('welcome');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [data, setData] = React.useState<OnboardingData>({
        firstName: '',
        lastName: '',
        title: '',
        organizationName: '',
        organizationType: '',
        country: '',
        kycConsent: false,
        investmentPreferences: [],
        communicationPreferences: ['email'],
    });

    const currentIndex = steps.findIndex(s => s.key === currentStep);
    
    const goNext = async () => {
        if (currentStep === 'preferences') {
            setIsSubmitting(true);
            await onComplete(data);
            setIsSubmitting(false);
            setCurrentStep('complete');
        } else {
            setCurrentStep(steps[currentIndex + 1].key);
        }
    };

    const goBack = () => {
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1].key);
        }
    };

    const canProceed = React.useMemo(() => {
        switch (currentStep) {
            case 'welcome':
                return true;
            case 'profile':
                return data.firstName && data.lastName;
            case 'organization':
                return data.organizationName && data.organizationType;
            case 'kyc':
                return data.kycConsent;
            case 'preferences':
                return true;
            default:
                return true;
        }
    }, [currentStep, data]);

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={cn(
                    "glass-card w-full max-w-2xl max-h-[90vh] overflow-hidden relative",
                    className
                )}
            >
                {/* Decorative top gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-cyan via-sgif-gold to-sgif-emerald" />

                {/* Progress header */}
                {currentStep !== 'complete' && (
                    <div className="p-6 border-b border-white/5">
                        <div className="flex items-center justify-between mb-6">
                            {steps.slice(0, -1).map((step, i) => (
                                <React.Fragment key={step.key}>
                                    <div className="flex flex-col items-center">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                                            i < currentIndex && "bg-sgif-emerald border-sgif-emerald",
                                            i === currentIndex && "bg-cyber-cyan/20 border-cyber-cyan",
                                            i > currentIndex && "bg-white/5 border-white/20"
                                        )}>
                                            {i < currentIndex ? (
                                                <Check className="h-5 w-5 text-black" />
                                            ) : (
                                                <step.icon className={cn(
                                                    "h-5 w-5",
                                                    i === currentIndex ? "text-cyber-cyan" : "text-gray-500"
                                                )} />
                                            )}
                                        </div>
                                        <span className={cn(
                                            "text-xs mt-2",
                                            i <= currentIndex ? "text-white" : "text-gray-500"
                                        )}>
                                            {step.label}
                                        </span>
                                    </div>
                                    {i < steps.length - 2 && (
                                        <div className={cn(
                                            "flex-1 h-px mx-3",
                                            i < currentIndex ? "bg-sgif-emerald" : "bg-white/10"
                                        )} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="p-8 min-h-[400px] overflow-y-auto">
                    <AnimatePresence mode="wait">
                        {currentStep === 'welcome' && (
                            <WelcomeStep key="welcome" />
                        )}
                        {currentStep === 'profile' && (
                            <ProfileStep key="profile" data={data} onChange={setData} />
                        )}
                        {currentStep === 'organization' && (
                            <OrganizationStep key="organization" data={data} onChange={setData} />
                        )}
                        {currentStep === 'kyc' && (
                            <KYCStep key="kyc" data={data} onChange={setData} />
                        )}
                        {currentStep === 'preferences' && (
                            <PreferencesStep key="preferences" data={data} onChange={setData} />
                        )}
                        {currentStep === 'complete' && (
                            <CompleteStep key="complete" data={data} />
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/5 flex items-center justify-between">
                    <div>
                        {currentIndex > 0 && currentStep !== 'complete' && (
                            <Button variant="ghost" onClick={goBack} className="gap-2">
                                <ChevronLeft className="h-4 w-4" />
                                Back
                            </Button>
                        )}
                        {currentStep === 'welcome' && onSkip && (
                            <Button variant="ghost" onClick={onSkip} className="text-gray-500">
                                Skip for now
                            </Button>
                        )}
                    </div>
                    <div>
                        {currentStep !== 'complete' ? (
                            <Button
                                onClick={goNext}
                                disabled={!canProceed || isSubmitting}
                                className="bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black font-semibold gap-2"
                            >
                                {currentStep === 'preferences' ? 'Complete Setup' : 'Continue'}
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        ) : (
                            <Button
                                onClick={() => window.location.href = '/app/dashboard'}
                                className="bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black font-semibold gap-2"
                            >
                                Enter Platform
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function WelcomeStep() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-8"
        >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-cyber-cyan/20 to-sgif-gold/20 border border-white/10 mb-6">
                <Hexagon className="h-12 w-12 text-cyber-cyan" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
                Welcome to SGIF
            </h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
                The Sovereign Green Infrastructure Fund platform provides secure access to 
                fund performance, documents, and governance tools.
            </p>

            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
                {[
                    { icon: Shield, label: 'Bank-Grade Security' },
                    { icon: Globe, label: 'Multi-Language' },
                    { icon: FileText, label: 'Secure Documents' },
                ].map((item, i) => (
                    <div key={i} className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-2">
                            <item.icon className="h-6 w-6 text-gray-400" />
                        </div>
                        <span className="text-xs text-gray-500">{item.label}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

function ProfileStep({ data, onChange }: { data: OnboardingData; onChange: (data: OnboardingData) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Your Profile</h2>
                <p className="text-gray-400">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <InputField
                    label="First Name"
                    value={data.firstName}
                    onChange={(v) => onChange({ ...data, firstName: v })}
                    placeholder="John"
                    required
                />
                <InputField
                    label="Last Name"
                    value={data.lastName}
                    onChange={(v) => onChange({ ...data, lastName: v })}
                    placeholder="Smith"
                    required
                />
            </div>
            <InputField
                label="Title / Position"
                value={data.title}
                onChange={(v) => onChange({ ...data, title: v })}
                placeholder="Chief Investment Officer"
            />
        </motion.div>
    );
}

function OrganizationStep({ data, onChange }: { data: OnboardingData; onChange: (data: OnboardingData) => void }) {
    const orgTypes = ['Sovereign Wealth Fund', 'Family Office', 'Pension Fund', 'Insurance Company', 'Bank', 'Other'];
    
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Your Organization</h2>
                <p className="text-gray-400">Help us understand your institution</p>
            </div>

            <InputField
                label="Organization Name"
                value={data.organizationName}
                onChange={(v) => onChange({ ...data, organizationName: v })}
                placeholder="Abu Dhabi Investment Authority"
                required
            />

            <div>
                <label className="text-sm font-medium text-gray-400 block mb-3">Organization Type</label>
                <div className="grid grid-cols-2 gap-2">
                    {orgTypes.map(type => (
                        <button
                            key={type}
                            onClick={() => onChange({ ...data, organizationType: type })}
                            className={cn(
                                "p-3 rounded-lg border text-left transition-all text-sm",
                                data.organizationType === type
                                    ? "bg-cyber-cyan/10 border-cyber-cyan/30 text-white"
                                    : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                            )}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <InputField
                label="Country"
                value={data.country}
                onChange={(v) => onChange({ ...data, country: v })}
                placeholder="United Arab Emirates"
            />
        </motion.div>
    );
}

function KYCStep({ data, onChange }: { data: OnboardingData; onChange: (data: OnboardingData) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Verification</h2>
                <p className="text-gray-400">Regulatory compliance requirements</p>
            </div>

            <div className="p-6 rounded-xl bg-sgif-gold/5 border border-sgif-gold/20">
                <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-sgif-gold/10 border border-sgif-gold/20">
                        <Shield className="h-6 w-6 text-sgif-gold" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white mb-2">KYC/AML Verification</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            As a regulated investment platform, we are required to verify all investors 
                            in accordance with international KYC and AML regulations.
                        </p>
                        <ul className="text-sm text-gray-500 space-y-2">
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-sgif-emerald" />
                                Identity verification
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-sgif-emerald" />
                                Accredited investor status
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-sgif-emerald" />
                                Source of funds documentation
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <label className="flex items-start gap-3 p-4 rounded-lg bg-white/[0.02] border border-white/5 cursor-pointer hover:bg-white/[0.04] transition-colors">
                <input
                    type="checkbox"
                    checked={data.kycConsent}
                    onChange={(e) => onChange({ ...data, kycConsent: e.target.checked })}
                    className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-sgif-emerald focus:ring-sgif-emerald/50"
                />
                <div>
                    <span className="text-white block">I consent to KYC verification</span>
                    <span className="text-xs text-gray-500">
                        I agree to provide the necessary documentation for identity verification 
                        and understand that my information will be processed in accordance with 
                        applicable regulations and the SGIF Privacy Policy.
                    </span>
                </div>
            </label>
        </motion.div>
    );
}

function PreferencesStep({ data, onChange }: { data: OnboardingData; onChange: (data: OnboardingData) => void }) {
    const investmentOptions = ['Renewable Energy', 'Green Infrastructure', 'Sustainable Real Estate', 'Carbon Credits', 'Green Bonds'];
    const commOptions = ['email', 'sms', 'push'];

    const toggleInvestment = (option: string) => {
        const current = data.investmentPreferences;
        const updated = current.includes(option)
            ? current.filter(o => o !== option)
            : [...current, option];
        onChange({ ...data, investmentPreferences: updated });
    };

    const toggleComm = (option: string) => {
        const current = data.communicationPreferences;
        const updated = current.includes(option)
            ? current.filter(o => o !== option)
            : [...current, option];
        onChange({ ...data, communicationPreferences: updated });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Preferences</h2>
                <p className="text-gray-400">Customize your experience</p>
            </div>

            <div>
                <label className="text-sm font-medium text-gray-400 block mb-3">Investment Interests</label>
                <div className="flex flex-wrap gap-2">
                    {investmentOptions.map(option => (
                        <button
                            key={option}
                            onClick={() => toggleInvestment(option)}
                            className={cn(
                                "px-3 py-2 rounded-lg border text-sm transition-all",
                                data.investmentPreferences.includes(option)
                                    ? "bg-sgif-emerald/10 border-sgif-emerald/30 text-sgif-emerald"
                                    : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                            )}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-sm font-medium text-gray-400 block mb-3">Communication Preferences</label>
                <div className="flex gap-2">
                    {commOptions.map(option => (
                        <button
                            key={option}
                            onClick={() => toggleComm(option)}
                            className={cn(
                                "flex-1 py-3 rounded-lg border text-sm transition-all capitalize",
                                data.communicationPreferences.includes(option)
                                    ? "bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan"
                                    : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                            )}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

function CompleteStep({ data }: { data: OnboardingData }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-sgif-emerald/10 border border-sgif-emerald/20 mb-6"
            >
                <CheckCircle2 className="h-12 w-12 text-sgif-emerald" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
                Welcome, {data.firstName}!
            </h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
                Your account has been set up successfully. You now have access to 
                the SGIF platform.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <Building2 className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">{data.organizationName}</span>
            </div>
        </motion.div>
    );
}

function InputField({
    label,
    value,
    onChange,
    placeholder,
    required,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
}) {
    return (
        <div>
            <label className="text-sm font-medium text-gray-400 block mb-2">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30 transition-all"
            />
        </div>
    );
}
