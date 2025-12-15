"use client";

import * as React from "react";
import { useAuth } from "@sgif/lib";
import { hasPermission, hasAnyPermission, hasAllPermissions, type Permission, type UserRole, ROLE_DEFINITIONS } from "@sgif/lib";
import { cn } from "@sgif/ui";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ShieldOff, AlertCircle, Info } from "lucide-react";

interface PermissionGuardProps {
    permission?: Permission;
    permissions?: Permission[];
    requireAll?: boolean;
    fallback?: React.ReactNode;
    showLockedState?: boolean;
    lockedMessage?: string;
    children: React.ReactNode;
    /** ID for ARIA labelling */
    id?: string;
    /** Description for screen readers */
    ariaDescription?: string;
    /** Callback when access is denied */
    onAccessDenied?: () => void;
    /** Show tooltip on hover for disabled state */
    showTooltip?: boolean;
    /** Custom tooltip message */
    tooltipMessage?: string;
}

/**
 * PermissionGuard - Sovereign-grade access control component
 * Protects UI elements based on user role and permissions
 * Enhanced with ARIA accessibility and keyboard navigation
 */
export function PermissionGuard({
    permission,
    permissions,
    requireAll = false,
    fallback,
    showLockedState = true,
    lockedMessage,
    children,
    id,
    ariaDescription,
    onAccessDenied,
    showTooltip = true,
    tooltipMessage,
}: PermissionGuardProps) {
    const { user } = useAuth();
    const guardId = React.useId();
    const elementId = id || `permission-guard-${guardId}`;
    
    const hasAccess = React.useMemo(() => {
        if (!user?.role) return false;
        
        const role = user.role as UserRole;
        
        if (permission) {
            return hasPermission(role, permission);
        }
        
        if (permissions && permissions.length > 0) {
            return requireAll 
                ? hasAllPermissions(role, permissions)
                : hasAnyPermission(role, permissions);
        }
        
        return true;
    }, [user?.role, permission, permissions, requireAll]);

    // Call onAccessDenied when access is denied
    React.useEffect(() => {
        if (!hasAccess && onAccessDenied) {
            onAccessDenied();
        }
    }, [hasAccess, onAccessDenied]);

    if (hasAccess) {
        return <>{children}</>;
    }

    if (fallback) {
        return <>{fallback}</>;
    }

    if (!showLockedState) {
        return null;
    }

    // Determine which permissions are missing
    const missingPermissions = React.useMemo(() => {
        if (!user?.role) return permission ? [permission] : permissions || [];
        
        const role = user.role as UserRole;
        const perms = permission ? [permission] : permissions || [];
        return perms.filter(p => !hasPermission(role, p));
    }, [user?.role, permission, permissions]);

    return (
        <LockedState 
            id={elementId}
            message={lockedMessage || ariaDescription} 
            missingPermissions={missingPermissions}
            userRole={user?.role as UserRole}
            showTooltip={showTooltip}
            tooltipMessage={tooltipMessage}
        />
    );
}

interface LockedStateProps {
    id?: string;
    message?: string;
    missingPermissions: Permission[];
    userRole?: UserRole;
    showTooltip?: boolean;
    tooltipMessage?: string;
}

function LockedState({ 
    id, 
    message, 
    missingPermissions, 
    userRole,
    showTooltip,
    tooltipMessage,
}: LockedStateProps) {
    const roleInfo = userRole ? ROLE_DEFINITIONS[userRole] : null;
    const [tooltipVisible, setTooltipVisible] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    
    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setTooltipVisible(!tooltipVisible);
        }
        if (e.key === 'Escape') {
            setTooltipVisible(false);
        }
    };

    const accessibilityMessage = message || "You do not have permission to access this resource.";
    const tooltipText = tooltipMessage || `Access restricted. ${missingPermissions.length > 0 
        ? `Missing permissions: ${missingPermissions.join(', ')}` 
        : ''}`;
    
    return (
        <motion.div
            ref={containerRef}
            id={id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 text-center border border-red-500/20 relative"
            role="alert"
            aria-live="polite"
            aria-labelledby={`${id}-title`}
            aria-describedby={`${id}-description`}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onFocus={() => showTooltip && setTooltipVisible(true)}
            onBlur={() => setTooltipVisible(false)}
            onMouseEnter={() => showTooltip && setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
        >
            {/* Screen reader only content */}
            <span className="sr-only">
                Access to this section is restricted. {accessibilityMessage}
                {roleInfo && ` Your current role is ${roleInfo.displayName}.`}
                {missingPermissions.length > 0 && ` Required permissions: ${missingPermissions.join(', ')}.`}
            </span>

            {/* Tooltip */}
            <AnimatePresence>
                {showTooltip && tooltipVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50"
                        role="tooltip"
                        id={`${id}-tooltip`}
                    >
                        <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl border border-white/10 max-w-xs">
                            {tooltipText}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 mb-4"
                aria-hidden="true"
            >
                <Lock className="h-8 w-8 text-red-400" />
            </div>
            
            <h3 
                id={`${id}-title`}
                className="text-lg font-semibold text-white mb-2"
            >
                Access Restricted
            </h3>
            
            <p 
                id={`${id}-description`}
                className="text-sm text-gray-400 mb-4"
            >
                {accessibilityMessage}
            </p>

            {roleInfo && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 mb-4">
                    <span className="text-xs text-gray-500">Current Role:</span>
                    <span className={cn("text-xs font-medium", `text-${roleInfo.color}`)}>
                        {roleInfo.displayName}
                    </span>
                </div>
            )}

            {missingPermissions.length > 0 && (
                <div 
                    className="mt-4 p-3 rounded-lg bg-white/[0.02] border border-white/5"
                    aria-label="Required permissions list"
                >
                    <p className="text-xs text-gray-500 mb-2 flex items-center justify-center gap-1">
                        <AlertCircle className="h-3 w-3" aria-hidden="true" />
                        Required permissions:
                    </p>
                    <ul 
                        className="flex flex-wrap justify-center gap-1"
                        role="list"
                        aria-label="Missing permissions"
                    >
                        {missingPermissions.map(perm => (
                            <li key={perm}>
                                <span 
                                    className="text-xs px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-mono"
                                >
                                    {perm}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Help button for keyboard users */}
            <button
                type="button"
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 rounded px-2 py-1 transition-colors"
                onClick={() => setTooltipVisible(!tooltipVisible)}
                aria-describedby={tooltipVisible ? `${id}-tooltip` : undefined}
            >
                <Info className="h-3 w-3" aria-hidden="true" />
                <span>Need access?</span>
            </button>
        </motion.div>
    );
}

/**
 * Higher-order component for permission-protected pages
 */
export function withPermission<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    permission: Permission | Permission[],
    requireAll = false
) {
    return function ProtectedComponent(props: P) {
        const permissions = Array.isArray(permission) ? permission : [permission];
        
        return (
            <PermissionGuard 
                permissions={permissions} 
                requireAll={requireAll}
                showLockedState={true}
            >
                <WrappedComponent {...props} />
            </PermissionGuard>
        );
    };
}

/**
 * Hook for checking permissions in component logic
 */
export function usePermission(permission: Permission): boolean {
    const { user } = useAuth();
    
    return React.useMemo(() => {
        if (!user?.role) return false;
        return hasPermission(user.role as UserRole, permission);
    }, [user?.role, permission]);
}

/**
 * Hook for checking multiple permissions
 */
export function usePermissions(permissions: Permission[], requireAll = false): boolean {
    const { user } = useAuth();
    
    return React.useMemo(() => {
        if (!user?.role) return false;
        const role = user.role as UserRole;
        return requireAll 
            ? hasAllPermissions(role, permissions)
            : hasAnyPermission(role, permissions);
    }, [user?.role, permissions, requireAll]);
}
