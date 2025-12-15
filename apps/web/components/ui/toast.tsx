/**
 * Toast Notification System
 * Accessible, animated toast notifications for user feedback
 */

"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
    CheckCircle, 
    XCircle, 
    AlertTriangle, 
    Info, 
    X,
    Loader2,
} from "lucide-react";
import { cn } from "@sgif/ui";
import { useUIStore, type Toast } from "@/stores/ui.store";

// Toast icon mapping
const TOAST_ICONS = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
    loading: Loader2,
} as const;

// Toast colors
const TOAST_COLORS = {
    success: {
        bg: 'bg-sgif-emerald/10',
        border: 'border-sgif-emerald/20',
        text: 'text-sgif-emerald',
        icon: 'text-sgif-emerald',
    },
    error: {
        bg: 'bg-red-500/10',
        border: 'border-red-500/20',
        text: 'text-red-400',
        icon: 'text-red-400',
    },
    warning: {
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
        text: 'text-amber-400',
        icon: 'text-amber-400',
    },
    info: {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        text: 'text-blue-400',
        icon: 'text-blue-400',
    },
} as const;

// Animation variants
const toastVariants = {
    initial: { opacity: 0, y: -20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 },
};

interface ToastItemProps {
    toast: Toast;
    onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
    const Icon = TOAST_ICONS[toast.type] || TOAST_ICONS.info;
    const colors = TOAST_COLORS[toast.type] || TOAST_COLORS.info;
    const isLoading = false; // Loading state handled by icon animation

    return (
        <motion.div
            layout
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", stiffness: 500, damping: 40 }}
            className={cn(
                "pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl",
                "backdrop-blur-xl border shadow-lg",
                colors.bg,
                colors.border
            )}
            role="alert"
            aria-live="polite"
            aria-atomic="true"
        >
            <div className="p-4">
                <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={cn("flex-shrink-0", colors.icon)}>
                        <Icon 
                            className={cn("h-5 w-5", isLoading && "animate-spin")} 
                            aria-hidden="true" 
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-0.5">
                        <p className={cn("text-sm font-medium", colors.text)}>
                            {toast.title}
                        </p>
                        {toast.message && (
                            <p className="mt-1 text-sm text-gray-400">
                                {toast.message}
                            </p>
                        )}
                        {toast.action && (
                            <button
                                onClick={toast.action.onClick}
                                className={cn(
                                    "mt-2 text-sm font-medium",
                                    colors.text,
                                    "hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2",
                                    "focus:ring-offset-transparent focus:ring-current rounded"
                                )}
                            >
                                {toast.action.label}
                            </button>
                        )}
                    </div>

                    {/* Dismiss button */}
                    {toast.dismissible !== false && (
                        <div className="flex-shrink-0">
                            <button
                                onClick={() => onDismiss(toast.id)}
                                className={cn(
                                    "inline-flex rounded-lg p-1.5",
                                    "text-gray-500 hover:text-gray-300",
                                    "focus:outline-none focus:ring-2 focus:ring-white/20",
                                    "transition-colors"
                                )}
                                aria-label="Dismiss notification"
                            >
                                <X className="h-4 w-4" aria-hidden="true" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Progress bar for timed toasts */}
            {toast.duration && toast.duration > 0 && (
                <motion.div
                    className={cn("h-1", colors.bg.replace('/10', '/30'))}
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: toast.duration / 1000, ease: "linear" }}
                />
            )}
        </motion.div>
    );
}

interface ToastContainerProps {
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const POSITION_CLASSES = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'top-center': 'top-0 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
};

/**
 * Toast Container Component
 * Renders all active toasts
 */
export function ToastContainer({ position = 'top-right' }: ToastContainerProps) {
    const toasts = useUIStore((state) => state.toasts);
    const removeToast = useUIStore((state) => state.removeToast);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <div
            className={cn(
                "fixed z-50 flex flex-col gap-2 p-4",
                "pointer-events-none",
                POSITION_CLASSES[position]
            )}
            aria-label="Notifications"
            role="region"
        >
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <ToastItem
                        key={toast.id}
                        toast={toast}
                        onDismiss={removeToast}
                    />
                ))}
            </AnimatePresence>
        </div>,
        document.body
    );
}

/**
 * Hook for showing toasts
 */
export function useToast() {
    const addToast = useUIStore((state) => state.addToast);
    const removeToast = useUIStore((state) => state.removeToast);
    const clearToasts = useUIStore((state) => state.clearToasts);

    const toast = React.useCallback((options: Omit<Toast, 'id'>) => {
        return addToast(options);
    }, [addToast]);

    const success = React.useCallback((title: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title'>>) => {
        return addToast({ type: 'success', title, ...options });
    }, [addToast]);

    const error = React.useCallback((title: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title'>>) => {
        return addToast({ type: 'error', title, duration: 8000, ...options });
    }, [addToast]);

    const warning = React.useCallback((title: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title'>>) => {
        return addToast({ type: 'warning', title, ...options });
    }, [addToast]);

    const info = React.useCallback((title: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title'>>) => {
        return addToast({ type: 'info', title, ...options });
    }, [addToast]);

    const loading = React.useCallback((title: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title'>>) => {
        return addToast({ type: 'info', title, duration: 0, dismissible: false, ...options });
    }, [addToast]);

    const promise = React.useCallback(async <T,>(
        promise: Promise<T>,
        options: {
            loading: string;
            success: string | ((data: T) => string);
            error: string | ((error: Error) => string);
        }
    ): Promise<T> => {
        const toastId = addToast({ 
            type: 'info', 
            title: options.loading, 
            duration: 0, 
            dismissible: false 
        });

        try {
            const data = await promise;
            removeToast(toastId);
            addToast({ 
                type: 'success', 
                title: typeof options.success === 'function' ? options.success(data) : options.success 
            });
            return data;
        } catch (err) {
            removeToast(toastId);
            addToast({ 
                type: 'error', 
                title: typeof options.error === 'function' ? options.error(err as Error) : options.error,
                duration: 8000,
            });
            throw err;
        }
    }, [addToast, removeToast]);

    return {
        toast,
        success,
        error,
        warning,
        info,
        loading,
        promise,
        dismiss: removeToast,
        dismissAll: clearToasts,
    };
}

// Export standalone toast function for use outside React components
let toastFn: ReturnType<typeof useToast> | null = null;

export function setToastHandler(handler: ReturnType<typeof useToast>) {
    toastFn = handler;
}

export const toast = {
    success: (title: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title'>>) => 
        toastFn?.success(title, options),
    error: (title: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title'>>) => 
        toastFn?.error(title, options),
    warning: (title: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title'>>) => 
        toastFn?.warning(title, options),
    info: (title: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title'>>) => 
        toastFn?.info(title, options),
    dismiss: (id: string) => toastFn?.dismiss(id),
    dismissAll: () => toastFn?.dismissAll(),
};
