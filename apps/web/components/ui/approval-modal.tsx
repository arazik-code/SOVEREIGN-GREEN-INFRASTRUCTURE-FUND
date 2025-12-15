"use client";

import * as React from "react";
import { Button, cn } from "@sgif/ui";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Check,
    ChevronRight,
    ChevronLeft,
    AlertCircle,
    Shield,
    FileText,
    User,
    Loader2,
    Clock,
    Stamp,
    PenTool,
    Users
} from "lucide-react";

export type ApprovalStep = 'review' | 'confirm' | 'authorize' | 'complete';

export interface ApprovalRequest {
    id: string;
    type: 'capital_call' | 'distribution' | 'investment' | 'document' | 'transfer' | 'governance';
    title: string;
    description: string;
    amount?: string;
    requestedBy: {
        name: string;
        role: string;
        avatar?: string;
    };
    requiredApprovers: number;
    currentApprovers: number;
    deadline?: Date;
    priority: 'low' | 'medium' | 'high' | 'critical';
    documents?: { name: string; url: string }[];
}

interface ApprovalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApprove: () => Promise<void>;
    onReject: (reason: string) => Promise<void>;
    request: ApprovalRequest;
    className?: string;
}

const priorityColors = {
    low: 'text-gray-400 bg-gray-400/10 border-gray-400/30',
    medium: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    high: 'text-sgif-gold bg-sgif-gold/10 border-sgif-gold/30',
    critical: 'text-red-400 bg-red-400/10 border-red-400/30',
};

const typeConfig = {
    capital_call: { icon: Shield, label: 'Capital Call', color: 'text-sgif-gold' },
    distribution: { icon: Shield, label: 'Distribution', color: 'text-sgif-emerald' },
    investment: { icon: Shield, label: 'Investment', color: 'text-cyber-cyan' },
    document: { icon: FileText, label: 'Document', color: 'text-blue-400' },
    transfer: { icon: Shield, label: 'Transfer', color: 'text-purple-400' },
    governance: { icon: Users, label: 'Governance', color: 'text-orange-400' },
};

export function ApprovalModal({
    isOpen,
    onClose,
    onApprove,
    onReject,
    request,
    className,
}: ApprovalModalProps) {
    const [step, setStep] = React.useState<ApprovalStep>('review');
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [rejectionReason, setRejectionReason] = React.useState('');
    const [showRejection, setShowRejection] = React.useState(false);
    const [confirmChecks, setConfirmChecks] = React.useState({
        reviewed: false,
        authority: false,
        compliance: false,
    });

    const config = typeConfig[request.type];
    const TypeIcon = config.icon;

    const steps: { key: ApprovalStep; label: string }[] = [
        { key: 'review', label: 'Review' },
        { key: 'confirm', label: 'Confirm' },
        { key: 'authorize', label: 'Authorize' },
        { key: 'complete', label: 'Complete' },
    ];

    const currentStepIndex = steps.findIndex(s => s.key === step);
    const canProceed = step === 'confirm' 
        ? Object.values(confirmChecks).every(Boolean)
        : true;

    const handleApprove = async () => {
        if (step === 'authorize') {
            setIsProcessing(true);
            try {
                await onApprove();
                setStep('complete');
            } finally {
                setIsProcessing(false);
            }
        } else {
            setStep(steps[currentStepIndex + 1].key);
        }
    };

    const handleReject = async () => {
        if (!rejectionReason.trim()) return;
        setIsProcessing(true);
        try {
            await onReject(rejectionReason);
            onClose();
        } finally {
            setIsProcessing(false);
        }
    };

    const resetAndClose = () => {
        setStep('review');
        setConfirmChecks({ reviewed: false, authority: false, compliance: false });
        setRejectionReason('');
        setShowRejection(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                        onClick={resetAndClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className={cn(
                            "glass-card w-full max-w-xl overflow-hidden relative",
                            className
                        )}>
                            {/* Top accent with priority color */}
                            <div className={cn(
                                "absolute top-0 left-0 right-0 h-1",
                                request.priority === 'critical' && "bg-gradient-to-r from-red-500 via-red-400 to-red-500",
                                request.priority === 'high' && "bg-gradient-to-r from-sgif-gold via-yellow-400 to-sgif-gold",
                                request.priority === 'medium' && "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500",
                                request.priority === 'low' && "bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500"
                            )} />

                            {/* Header */}
                            <div className="p-6 border-b border-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "p-2 rounded-lg border",
                                            request.priority === 'critical' && "bg-red-500/10 border-red-500/30",
                                            request.priority === 'high' && "bg-sgif-gold/10 border-sgif-gold/30",
                                            request.priority === 'medium' && "bg-blue-500/10 border-blue-500/30",
                                            request.priority === 'low' && "bg-gray-500/10 border-gray-500/30"
                                        )}>
                                            <TypeIcon className={cn("h-5 w-5", config.color)} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h2 className="text-lg font-semibold text-white">Approval Required</h2>
                                                <span className={cn(
                                                    "text-xs px-2 py-0.5 rounded border font-medium capitalize",
                                                    priorityColors[request.priority]
                                                )}>
                                                    {request.priority}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500">{config.label} • {request.id}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={resetAndClose}
                                        className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* Progress steps */}
                                <div className="mt-6 flex items-center justify-between">
                                    {steps.map((s, i) => (
                                        <React.Fragment key={s.key}>
                                            <div className="flex flex-col items-center">
                                                <div className={cn(
                                                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all",
                                                    i < currentStepIndex && "bg-sgif-emerald border-sgif-emerald text-black",
                                                    i === currentStepIndex && "bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan",
                                                    i > currentStepIndex && "bg-white/5 border-white/20 text-gray-500"
                                                )}>
                                                    {i < currentStepIndex ? (
                                                        <Check className="h-4 w-4" />
                                                    ) : (
                                                        i + 1
                                                    )}
                                                </div>
                                                <span className={cn(
                                                    "text-xs mt-1.5",
                                                    i <= currentStepIndex ? "text-white" : "text-gray-500"
                                                )}>
                                                    {s.label}
                                                </span>
                                            </div>
                                            {i < steps.length - 1 && (
                                                <div className={cn(
                                                    "flex-1 h-px mx-2",
                                                    i < currentStepIndex ? "bg-sgif-emerald" : "bg-white/10"
                                                )} />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 min-h-[300px]">
                                <AnimatePresence mode="wait">
                                    {step === 'review' && (
                                        <ReviewStep 
                                            key="review"
                                            request={request} 
                                        />
                                    )}
                                    {step === 'confirm' && (
                                        <ConfirmStep 
                                            key="confirm"
                                            checks={confirmChecks}
                                            onCheckChange={setConfirmChecks}
                                        />
                                    )}
                                    {step === 'authorize' && (
                                        <AuthorizeStep 
                                            key="authorize"
                                            request={request}
                                        />
                                    )}
                                    {step === 'complete' && (
                                        <CompleteStep 
                                            key="complete"
                                            request={request}
                                        />
                                    )}
                                </AnimatePresence>

                                {/* Rejection form */}
                                {showRejection && step !== 'complete' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-6 p-4 rounded-lg bg-red-500/5 border border-red-500/20"
                                    >
                                        <label className="text-sm font-medium text-red-400 block mb-2">
                                            Rejection Reason (Required)
                                        </label>
                                        <textarea
                                            value={rejectionReason}
                                            onChange={(e) => setRejectionReason(e.target.value)}
                                            placeholder="Provide detailed reason for rejection..."
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 resize-none"
                                        />
                                    </motion.div>
                                )}
                            </div>

                            {/* Footer */}
                            {step !== 'complete' && (
                                <div className="p-6 border-t border-white/5 flex items-center justify-between">
                                    <div>
                                        {currentStepIndex > 0 && !showRejection && (
                                            <Button
                                                variant="ghost"
                                                onClick={() => setStep(steps[currentStepIndex - 1].key)}
                                                disabled={isProcessing}
                                                className="gap-2 text-gray-400"
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                                Back
                                            </Button>
                                        )}
                                    </div>
                                    <div className="flex gap-3">
                                        {showRejection ? (
                                            <>
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => setShowRejection(false)}
                                                    disabled={isProcessing}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    onClick={handleReject}
                                                    disabled={isProcessing || !rejectionReason.trim()}
                                                    className="bg-red-500 hover:bg-red-600 text-white gap-2"
                                                >
                                                    {isProcessing ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <X className="h-4 w-4" />
                                                    )}
                                                    Confirm Rejection
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setShowRejection(true)}
                                                    disabled={isProcessing}
                                                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                                                >
                                                    Reject
                                                </Button>
                                                <Button
                                                    onClick={handleApprove}
                                                    disabled={isProcessing || !canProceed}
                                                    className="bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black font-semibold gap-2"
                                                >
                                                    {isProcessing ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : step === 'authorize' ? (
                                                        <>
                                                            <PenTool className="h-4 w-4" />
                                                            Authorize
                                                        </>
                                                    ) : (
                                                        <>
                                                            Continue
                                                            <ChevronRight className="h-4 w-4" />
                                                        </>
                                                    )}
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            {step === 'complete' && (
                                <div className="p-6 border-t border-white/5 flex justify-end">
                                    <Button
                                        onClick={resetAndClose}
                                        className="bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black font-semibold"
                                    >
                                        Done
                                    </Button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function ReviewStep({ request }: { request: ApprovalRequest }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
        >
            <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-1">{request.title}</h3>
                <p className="text-sm text-gray-400">{request.description}</p>
            </div>

            {request.amount && (
                <div className="p-4 rounded-lg bg-sgif-gold/5 border border-sgif-gold/20">
                    <span className="text-xs text-gray-500 block mb-1">Amount</span>
                    <span className="text-2xl font-bold text-sgif-gold font-mono">{request.amount}</span>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-xs text-gray-500 block mb-2">Requested By</span>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-400" />
                        </div>
                        <div>
                            <p className="text-sm text-white">{request.requestedBy.name}</p>
                            <p className="text-xs text-gray-500">{request.requestedBy.role}</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-xs text-gray-500 block mb-2">Approval Status</span>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-cyber-cyan to-sgif-emerald rounded-full"
                                style={{ width: `${(request.currentApprovers / request.requiredApprovers) * 100}%` }}
                            />
                        </div>
                        <span className="text-sm text-white font-mono">
                            {request.currentApprovers}/{request.requiredApprovers}
                        </span>
                    </div>
                </div>
            </div>

            {request.deadline && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    Deadline: {new Intl.DateTimeFormat('en-US', { 
                        dateStyle: 'medium', 
                        timeStyle: 'short' 
                    }).format(request.deadline)}
                </div>
            )}
        </motion.div>
    );
}

function ConfirmStep({ 
    checks, 
    onCheckChange 
}: { 
    checks: { reviewed: boolean; authority: boolean; compliance: boolean };
    onCheckChange: (checks: { reviewed: boolean; authority: boolean; compliance: boolean }) => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
        >
            <div className="flex items-center gap-2 text-yellow-400 p-3 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">Please confirm the following before proceeding</p>
            </div>

            {[
                { key: 'reviewed', label: 'I have reviewed all request details and supporting documents' },
                { key: 'authority', label: 'I have the authority to approve this request' },
                { key: 'compliance', label: 'This approval complies with fund policies and regulations' },
            ].map(item => (
                <label
                    key={item.key}
                    className={cn(
                        "flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all",
                        checks[item.key as keyof typeof checks]
                            ? "bg-sgif-emerald/5 border-sgif-emerald/30"
                            : "bg-white/[0.02] border-white/5 hover:border-white/10"
                    )}
                >
                    <input
                        type="checkbox"
                        checked={checks[item.key as keyof typeof checks]}
                        onChange={(e) => onCheckChange({ 
                            ...checks, 
                            [item.key]: e.target.checked 
                        })}
                        className="mt-0.5 w-5 h-5 rounded border-white/20 bg-white/5 text-sgif-emerald focus:ring-sgif-emerald/50"
                    />
                    <span className="text-sm text-gray-300">{item.label}</span>
                </label>
            ))}
        </motion.div>
    );
}

function AuthorizeStep({ request }: { request: ApprovalRequest }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center py-8"
        >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-cyber-cyan/10 border border-cyber-cyan/20 mb-6">
                <PenTool className="h-10 w-10 text-cyber-cyan" />
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-2">Final Authorization</h3>
            <p className="text-gray-400 mb-6 max-w-sm mx-auto">
                You are about to authorize this {request.type.replace('_', ' ')}. 
                This action will be logged and cannot be undone.
            </p>

            {request.amount && (
                <div className="inline-block p-4 rounded-lg bg-sgif-gold/10 border border-sgif-gold/20">
                    <span className="text-xs text-gray-500 block mb-1">Amount to Authorize</span>
                    <span className="text-3xl font-bold text-sgif-gold font-mono">{request.amount}</span>
                </div>
            )}

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Shield className="h-3 w-3" />
                Digitally signed with your credentials
            </div>
        </motion.div>
    );
}

function CompleteStep({ request }: { request: ApprovalRequest }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-8"
        >
            <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-sgif-emerald/10 border border-sgif-emerald/20 mb-6"
            >
                <Check className="h-10 w-10 text-sgif-emerald" />
            </motion.div>
            
            <h3 className="text-xl font-semibold text-white mb-2">Authorization Complete</h3>
            <p className="text-gray-400 mb-6">
                The {request.type.replace('_', ' ')} has been successfully authorized.
            </p>

            <div className="inline-block p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-xs text-gray-500 block mb-2">Confirmation ID</span>
                <span className="text-sm font-mono text-cyber-cyan">
                    APR-{Date.now().toString(36).toUpperCase()}
                </span>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Stamp className="h-3 w-3" />
                Timestamp: {new Date().toISOString()}
            </div>
        </motion.div>
    );
}
