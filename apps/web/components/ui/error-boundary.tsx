"use client";

import * as React from "react";
import { Button, cn } from "@sgif/ui";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home, Bug, ChevronDown, ChevronUp, Copy, Check, RotateCcw, MessageSquare, ExternalLink } from "lucide-react";

// Error reporting service interface
interface ErrorReport {
    id: string;
    name: string;
    message: string;
    stack?: string;
    componentStack?: string;
    timestamp: string;
    userAgent: string;
    url: string;
    userId?: string;
    sessionId?: string;
    additionalContext?: Record<string, unknown>;
}

// Error reporter function - can be overridden with actual implementation
type ErrorReporter = (report: ErrorReport) => Promise<{ reportId: string } | void>;

let errorReporter: ErrorReporter = async (report) => {
    // Default: log to console in development
    if (process.env.NODE_ENV === 'development') {
        console.error('[ErrorBoundary] Error Report:', report);
    }
    // In production, this would send to an error tracking service
    return { reportId: report.id };
};

/**
 * Set a custom error reporter (e.g., Sentry, LogRocket, etc.)
 */
export function setErrorReporter(reporter: ErrorReporter): void {
    errorReporter = reporter;
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
    /** Additional context to include in error reports */
    context?: Record<string, unknown>;
    /** Whether to automatically report errors */
    autoReport?: boolean;
    /** Custom recovery actions */
    recoveryActions?: RecoveryAction[];
}

interface RecoveryAction {
    id: string;
    label: string;
    icon?: React.ReactNode;
    action: () => void | Promise<void>;
    variant?: 'primary' | 'secondary' | 'danger';
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
    errorId: string | null;
    reportSubmitted: boolean;
}

/**
 * Generate a unique error ID
 */
function generateErrorId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `ERR-${timestamp}-${random}`.toUpperCase();
}

/**
 * ErrorBoundary - Sovereign-grade error handling component
 * Catches and displays errors with institutional-level UX
 * Enhanced with error reporting and multiple recovery options
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { 
            hasError: false, 
            error: null, 
            errorInfo: null,
            errorId: null,
            reportSubmitted: false,
        };
    }

    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        return { 
            hasError: true, 
            error,
            errorId: generateErrorId(),
        };
    }

    async componentDidCatch(error: Error, errorInfo: React.ErrorInfo): Promise<void> {
        this.setState({ errorInfo });
        this.props.onError?.(error, errorInfo);
        
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('ErrorBoundary caught an error:', error, errorInfo);
        }

        // Auto-report if enabled (default: true in production)
        const shouldAutoReport = this.props.autoReport ?? process.env.NODE_ENV === 'production';
        if (shouldAutoReport) {
            await this.reportError(error, errorInfo);
        }
    }

    private async reportError(error: Error, errorInfo: React.ErrorInfo | null): Promise<void> {
        try {
            const report: ErrorReport = {
                id: this.state.errorId || generateErrorId(),
                name: error.name,
                message: error.message,
                stack: error.stack,
                componentStack: errorInfo?.componentStack || undefined,
                timestamp: new Date().toISOString(),
                userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
                url: typeof window !== 'undefined' ? window.location.href : 'N/A',
                additionalContext: this.props.context,
            };

            await errorReporter(report);
            this.setState({ reportSubmitted: true });
        } catch (reportError) {
            console.error('Failed to report error:', reportError);
        }
    }

    handleReset = (): void => {
        this.setState({ 
            hasError: false, 
            error: null, 
            errorInfo: null,
            errorId: null,
            reportSubmitted: false,
        });
    };

    handleManualReport = async (): Promise<void> => {
        if (this.state.error) {
            await this.reportError(this.state.error, this.state.errorInfo);
        }
    };

    render(): React.ReactNode {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <ErrorFallback
                    error={this.state.error}
                    errorInfo={this.state.errorInfo}
                    errorId={this.state.errorId}
                    onReset={this.handleReset}
                    onReport={this.handleManualReport}
                    reportSubmitted={this.state.reportSubmitted}
                    customRecoveryActions={this.props.recoveryActions}
                />
            );
        }

        return this.props.children;
    }
}

interface ErrorFallbackProps {
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
    errorId: string | null;
    onReset: () => void;
    onReport: () => Promise<void>;
    reportSubmitted: boolean;
    customRecoveryActions?: RecoveryAction[];
}

function ErrorFallback({ 
    error, 
    errorInfo, 
    errorId, 
    onReset, 
    onReport,
    reportSubmitted,
    customRecoveryActions,
}: ErrorFallbackProps) {
    const [showDetails, setShowDetails] = React.useState(false);
    const [copied, setCopied] = React.useState(false);
    const [isReporting, setIsReporting] = React.useState(false);

    const errorDetails = React.useMemo(() => {
        return JSON.stringify({
            id: errorId,
            name: error?.name,
            message: error?.message,
            stack: error?.stack,
            componentStack: errorInfo?.componentStack,
            timestamp: new Date().toISOString(),
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
            url: typeof window !== 'undefined' ? window.location.href : 'N/A',
        }, null, 2);
    }, [error, errorInfo, errorId]);

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(errorDetails);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReport = async () => {
        setIsReporting(true);
        try {
            await onReport();
        } finally {
            setIsReporting(false);
        }
    };

    // Default recovery actions
    const defaultRecoveryActions: RecoveryAction[] = [
        {
            id: 'retry',
            label: 'Try Again',
            icon: <RefreshCw className="h-4 w-4" />,
            action: onReset,
            variant: 'primary',
        },
        {
            id: 'home',
            label: 'Go Home',
            icon: <Home className="h-4 w-4" />,
            action: () => { window.location.href = '/'; },
            variant: 'secondary',
        },
        {
            id: 'reload',
            label: 'Reload Page',
            icon: <RotateCcw className="h-4 w-4" />,
            action: () => { window.location.reload(); },
            variant: 'secondary',
        },
    ];

    const recoveryActions = customRecoveryActions || defaultRecoveryActions;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-[400px] flex items-center justify-center p-8"
        >
            <div className="max-w-lg w-full">
                <div className="glass-card p-8 text-center border border-red-500/20 relative overflow-hidden">
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                    
                    {/* Error icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.1 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 mb-6"
                    >
                        <AlertTriangle className="h-10 w-10 text-red-400" />
                    </motion.div>

                    <h2 className="text-2xl font-bold text-white mb-3">
                        System Anomaly Detected
                    </h2>
                    
                    <p className="text-gray-400 mb-6">
                        An unexpected error occurred in the system. Our team has been notified.
                    </p>

                    {/* Error message preview */}
                    {error?.message && (
                        <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10 mb-6 text-left">
                            <p className="text-xs text-red-400 font-mono truncate">
                                {error.message}
                            </p>
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                        {recoveryActions.map((action) => (
                            <Button
                                key={action.id}
                                onClick={action.action}
                                variant={action.variant === 'primary' ? 'default' : 'outline'}
                                className={cn(
                                    "gap-2",
                                    action.variant === 'primary' && "bg-gradient-to-r from-cyber-cyan to-sgif-emerald text-black font-semibold",
                                    action.variant === 'secondary' && "border-white/10",
                                    action.variant === 'danger' && "border-red-500/30 text-red-400 hover:bg-red-500/10"
                                )}
                            >
                                {action.icon}
                                {action.label}
                            </Button>
                        ))}
                    </div>

                    {/* Report error button */}
                    {!reportSubmitted && (
                        <div className="mb-6">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleReport}
                                disabled={isReporting}
                                className="border-white/10 gap-2 text-xs"
                            >
                                <MessageSquare className="h-3 w-3" />
                                {isReporting ? 'Submitting...' : 'Report this issue'}
                            </Button>
                        </div>
                    )}

                    {reportSubmitted && (
                        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sgif-emerald/10 border border-sgif-emerald/20">
                            <Check className="h-4 w-4 text-sgif-emerald" />
                            <span className="text-xs text-sgif-emerald">Error report submitted</span>
                        </div>
                    )}

                    {/* Expandable details */}
                    <div className="border-t border-white/5 pt-4">
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors mx-auto"
                        >
                            <Bug className="h-3 w-3" />
                            {showDetails ? 'Hide' : 'Show'} technical details
                            {showDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        </button>

                        {showDetails && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mt-4"
                            >
                                <div className="relative">
                                    <pre className="p-4 rounded-lg bg-black/40 text-left text-xs text-gray-400 font-mono overflow-auto max-h-48 border border-white/5">
                                        {errorDetails}
                                    </pre>
                                    <button
                                        onClick={copyToClipboard}
                                        className="absolute top-2 right-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                    >
                                        {copied ? (
                                            <Check className="h-4 w-4 text-sgif-emerald" />
                                        ) : (
                                            <Copy className="h-4 w-4 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Reference ID */}
                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-600">
                        <span>Reference:</span>
                        <code className="px-2 py-0.5 rounded bg-white/5 font-mono">
                            {errorId || `ERR-${Date.now().toString(36).toUpperCase()}`}
                        </code>
                    </div>

                    {/* Support link */}
                    <div className="mt-4">
                        <a 
                            href="/contact?subject=error-report" 
                            className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                        >
                            <ExternalLink className="h-3 w-3" />
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/**
 * RouteErrorBoundary - For use with Next.js error.tsx files
 * Enhanced with reporting capabilities
 */
export function RouteErrorBoundary({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const [reportSubmitted, setReportSubmitted] = React.useState(false);
    const errorId = React.useMemo(() => generateErrorId(), []);

    const handleReport = async () => {
        const report: ErrorReport = {
            id: errorId,
            name: error.name,
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
            url: typeof window !== 'undefined' ? window.location.href : 'N/A',
            additionalContext: { digest: error.digest },
        };
        await errorReporter(report);
        setReportSubmitted(true);
    };

    return (
        <ErrorFallback
            error={error}
            errorInfo={null}
            errorId={errorId}
            onReset={reset}
            onReport={handleReport}
            reportSubmitted={reportSubmitted}
        />
    );
}

/**
 * Hook to imperatively report errors
 */
export function useErrorReporter() {
    return React.useCallback(async (
        error: Error, 
        context?: Record<string, unknown>
    ) => {
        const report: ErrorReport = {
            id: generateErrorId(),
            name: error.name,
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
            url: typeof window !== 'undefined' ? window.location.href : 'N/A',
            additionalContext: context,
        };
        return errorReporter(report);
    }, []);
}
