/**
 * SGIF Role-Based Access Control System
 * Sovereign-grade permission management for institutional investors
 */

// Re-export UserRole from auth for type consistency
export { type UserRole } from './auth';
import { type UserRole } from './auth';

export type Permission =
    // Dashboard
    | 'dashboard:view'
    | 'dashboard:export'
    // Projects
    | 'projects:view'
    | 'projects:create'
    | 'projects:edit'
    | 'projects:delete'
    | 'projects:approve'
    // Carbon
    | 'carbon:view'
    | 'carbon:manage'
    | 'carbon:forecast'
    // Financials
    | 'financials:view'
    | 'financials:manage'
    | 'financials:model'
    | 'financials:approve'
    // Data Room
    | 'dataroom:view'
    | 'dataroom:upload'
    | 'dataroom:download'
    | 'dataroom:manage'
    // Governance
    | 'governance:view'
    | 'governance:vote'
    | 'governance:propose'
    | 'governance:approve'
    // Reports
    | 'reports:view'
    | 'reports:create'
    | 'reports:export'
    // LP Portal
    | 'lp:view'
    | 'lp:manage'
    // Admin
    | 'admin:view'
    | 'admin:users'
    | 'admin:settings'
    | 'admin:integrations'
    // AI
    | 'ai:view'
    | 'ai:advanced'
    // Insights
    | 'insights:view'
    | 'insights:advanced'
    // Maps
    | 'maps:view';

export interface RoleDefinition {
    name: string;
    displayName: string;
    description: string;
    level: number; // Higher = more access
    permissions: Permission[];
    color: string;
    icon: string;
}

export const ROLE_DEFINITIONS: Record<UserRole, RoleDefinition> = {
    Founder: {
        name: 'Founder',
        displayName: 'Founder',
        description: 'Full platform access with override capabilities',
        level: 100,
        color: 'sgif-gold',
        icon: 'Crown',
        permissions: [
            'dashboard:view', 'dashboard:export',
            'projects:view', 'projects:create', 'projects:edit', 'projects:delete', 'projects:approve',
            'carbon:view', 'carbon:manage', 'carbon:forecast',
            'financials:view', 'financials:manage', 'financials:model', 'financials:approve',
            'dataroom:view', 'dataroom:upload', 'dataroom:download', 'dataroom:manage',
            'governance:view', 'governance:vote', 'governance:propose', 'governance:approve',
            'reports:view', 'reports:create', 'reports:export',
            'lp:view', 'lp:manage',
            'admin:view', 'admin:users', 'admin:settings', 'admin:integrations',
            'ai:view', 'ai:advanced',
            'insights:view', 'insights:advanced',
            'maps:view'
        ],
    },
    GP: {
        name: 'GP',
        displayName: 'General Partner',
        description: 'Fund management and investment decisions',
        level: 90,
        color: 'cyber-cyan',
        icon: 'Shield',
        permissions: [
            'dashboard:view', 'dashboard:export',
            'projects:view', 'projects:create', 'projects:edit', 'projects:approve',
            'carbon:view', 'carbon:manage', 'carbon:forecast',
            'financials:view', 'financials:manage', 'financials:model', 'financials:approve',
            'dataroom:view', 'dataroom:upload', 'dataroom:download', 'dataroom:manage',
            'governance:view', 'governance:vote', 'governance:propose', 'governance:approve',
            'reports:view', 'reports:create', 'reports:export',
            'lp:view', 'lp:manage',
            'admin:view', 'admin:users',
            'ai:view', 'ai:advanced',
            'insights:view', 'insights:advanced',
            'maps:view'
        ],
    },
    Admin: {
        name: 'Admin',
        displayName: 'Administrator',
        description: 'System administration and user management',
        level: 85,
        color: 'purple-500',
        icon: 'Settings',
        permissions: [
            'dashboard:view', 'dashboard:export',
            'projects:view', 'projects:create', 'projects:edit',
            'carbon:view', 'carbon:manage',
            'financials:view', 'financials:manage',
            'dataroom:view', 'dataroom:upload', 'dataroom:download', 'dataroom:manage',
            'governance:view',
            'reports:view', 'reports:create', 'reports:export',
            'lp:view',
            'admin:view', 'admin:users', 'admin:settings', 'admin:integrations',
            'ai:view',
            'insights:view',
            'maps:view'
        ],
    },
    Advisor: {
        name: 'Advisor',
        displayName: 'Advisor',
        description: 'Strategic counsel with read access',
        level: 60,
        color: 'sgif-emerald',
        icon: 'Compass',
        permissions: [
            'dashboard:view', 'dashboard:export',
            'projects:view',
            'carbon:view', 'carbon:forecast',
            'financials:view',
            'dataroom:view', 'dataroom:download',
            'governance:view', 'governance:vote',
            'reports:view', 'reports:export',
            'ai:view',
            'insights:view',
            'maps:view'
        ],
    },
    LP: {
        name: 'LP',
        displayName: 'Limited Partner',
        description: 'Investor access to portfolio and documents',
        level: 50,
        color: 'blue-500',
        icon: 'User',
        permissions: [
            'dashboard:view',
            'projects:view',
            'carbon:view',
            'financials:view',
            'dataroom:view', 'dataroom:download',
            'governance:view', 'governance:vote',
            'reports:view',
            'lp:view',
            'maps:view'
        ],
    },
    Auditor: {
        name: 'Auditor',
        displayName: 'Auditor',
        description: 'Read-only access for compliance review',
        level: 40,
        color: 'orange-500',
        icon: 'FileSearch',
        permissions: [
            'dashboard:view',
            'projects:view',
            'carbon:view',
            'financials:view',
            'dataroom:view', 'dataroom:download',
            'governance:view',
            'reports:view',
            'insights:view',
            'maps:view'
        ],
    },
    Government_Observer: {
        name: 'Government_Observer',
        displayName: 'Government Observer',
        description: 'Sovereign oversight with restricted access',
        level: 30,
        color: 'red-500',
        icon: 'Building2',
        permissions: [
            'dashboard:view',
            'projects:view',
            'carbon:view',
            'governance:view',
            'reports:view',
            'maps:view'
        ],
    },
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
    const roleDefinition = ROLE_DEFINITIONS[role];
    if (!roleDefinition) return false;
    return roleDefinition.permissions.includes(permission);
}

export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
    return permissions.some(permission => hasPermission(role, permission));
}

export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
    return permissions.every(permission => hasPermission(role, permission));
}

export function getRoleLevel(role: UserRole): number {
    return ROLE_DEFINITIONS[role]?.level ?? 0;
}

export function canAccessRoute(role: UserRole, route: string): boolean {
    const routePermissions: Record<string, Permission[]> = {
        '/app/dashboard': ['dashboard:view'],
        '/app/projects': ['projects:view'],
        '/app/carbon': ['carbon:view'],
        '/app/financials': ['financials:view'],
        '/app/data-room': ['dataroom:view'],
        '/app/governance': ['governance:view'],
        '/app/reports': ['reports:view'],
        '/app/lp': ['lp:view'],
        '/app/admin': ['admin:view'],
        '/app/ai': ['ai:view'],
        '/app/insights': ['insights:view'],
        '/app/maps': ['maps:view'],
    };

    // Find matching route
    const matchingRoute = Object.keys(routePermissions).find(r => route.startsWith(r));
    if (!matchingRoute) return true; // Allow access to unprotected routes
    
    return hasAnyPermission(role, routePermissions[matchingRoute]);
}

export function getAccessibleRoutes(role: UserRole): string[] {
    const allRoutes = [
        '/app/dashboard',
        '/app/projects',
        '/app/carbon',
        '/app/financials',
        '/app/data-room',
        '/app/governance',
        '/app/reports',
        '/app/lp',
        '/app/admin',
        '/app/ai',
        '/app/insights',
        '/app/maps',
    ];
    
    return allRoutes.filter(route => canAccessRoute(role, route));
}
