import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';

/**
 * SGIF Institutional User Roles
 * 
 * - Founder: Platform creator with full access
 * - GP: General Partner managing investments
 * - LP: Limited Partner investor with portfolio access
 * - Advisor: External advisors with consulting access
 * - Admin: System administrators
 * - Auditor: Read-only compliance access
 * - Government_Observer: Sovereign oversight role
 */
export type UserRole = 
    | 'Founder'
    | 'GP'
    | 'LP'
    | 'Advisor'
    | 'Admin'
    | 'Auditor'
    | 'Government_Observer';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl?: string;
    organization?: string;
    permissions?: string[];
    createdAt?: string;
    lastLoginAt?: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
}

interface AuthState {
    user: User | null;
    tokens: AuthTokens | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
    lastActivity: number;
    
    // Actions
    login: (email: string, password: string, role?: UserRole) => Promise<void>;
    loginWithMagicLink: (token: string) => Promise<void>;
    loginWithSSO: (provider: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshSession: () => Promise<void>;
    updateUser: (updates: Partial<User>) => void;
    clearError: () => void;
    checkSession: () => boolean;
    updateActivity: () => void;
}

// Session timeout in milliseconds (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000;

// Token refresh threshold (5 minutes before expiry)
const REFRESH_THRESHOLD = 5 * 60 * 1000;

/**
 * Check if tokens are expired or near expiry
 */
function shouldRefreshToken(tokens: AuthTokens | null): boolean {
    if (!tokens) return false;
    return Date.now() >= tokens.expiresAt - REFRESH_THRESHOLD;
}

/**
 * Check if session is still valid
 */
function isSessionValid(lastActivity: number): boolean {
    return Date.now() - lastActivity < SESSION_TIMEOUT;
}

/**
 * Generate mock tokens for development
 */
function generateMockTokens(): AuthTokens {
    return {
        accessToken: `mock_access_${crypto.randomUUID()}`,
        refreshToken: `mock_refresh_${crypto.randomUUID()}`,
        expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
    };
}

/**
 * Secure auth store with persist and devtools middleware
 */
export const useAuth = create<AuthState>()(
    devtools(
        persist(
            (set, get) => ({
                user: null,
                tokens: null,
                isLoading: false,
                isAuthenticated: false,
                error: null,
                lastActivity: Date.now(),

                login: async (email: string, password: string, role: UserRole = 'LP') => {
                    set({ isLoading: true, error: null });
                    
                    try {
                        // Simulate API call - replace with real implementation
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                        
                        // In production, this would be an API call
                        // const response = await api.post<{ user: User; tokens: AuthTokens }>('/auth/login', { email, password });
                        
                        const mockUser: User = {
                            id: crypto.randomUUID(),
                            name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                            email,
                            role,
                            organization: 'SGIF',
                            createdAt: new Date().toISOString(),
                            lastLoginAt: new Date().toISOString(),
                        };
                        
                        const tokens = generateMockTokens();
                        
                        // Store token in localStorage for API interceptor
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('sgif_token', tokens.accessToken);
                        }
                        
                        set({
                            user: mockUser,
                            tokens,
                            isLoading: false,
                            isAuthenticated: true,
                            lastActivity: Date.now(),
                        });
                    } catch (error) {
                        set({
                            isLoading: false,
                            error: error instanceof Error ? error.message : 'Login failed',
                        });
                        throw error;
                    }
                },

                loginWithMagicLink: async (token: string) => {
                    set({ isLoading: true, error: null });
                    
                    try {
                        // Simulate API call
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                        
                        // In production: const response = await api.post('/auth/magic-link/verify', { token });
                        
                        const mockUser: User = {
                            id: crypto.randomUUID(),
                            name: 'Magic Link User',
                            email: 'user@sgif.gov',
                            role: 'LP',
                            organization: 'SGIF',
                            lastLoginAt: new Date().toISOString(),
                        };
                        
                        const tokens = generateMockTokens();
                        
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('sgif_token', tokens.accessToken);
                        }
                        
                        set({
                            user: mockUser,
                            tokens,
                            isLoading: false,
                            isAuthenticated: true,
                            lastActivity: Date.now(),
                        });
                    } catch (error) {
                        set({
                            isLoading: false,
                            error: 'Invalid or expired magic link',
                        });
                        throw error;
                    }
                },

                loginWithSSO: async (provider: string) => {
                    set({ isLoading: true, error: null });
                    
                    try {
                        // In production, redirect to SSO provider
                        await new Promise((resolve) => setTimeout(resolve, 1500));
                        
                        const mockUser: User = {
                            id: crypto.randomUUID(),
                            name: `${provider} User`,
                            email: `user@${provider.toLowerCase()}.com`,
                            role: 'GP',
                            organization: provider,
                            lastLoginAt: new Date().toISOString(),
                        };
                        
                        const tokens = generateMockTokens();
                        
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('sgif_token', tokens.accessToken);
                        }
                        
                        set({
                            user: mockUser,
                            tokens,
                            isLoading: false,
                            isAuthenticated: true,
                            lastActivity: Date.now(),
                        });
                    } catch (error) {
                        set({
                            isLoading: false,
                            error: `SSO authentication failed with ${provider}`,
                        });
                        throw error;
                    }
                },

                logout: async () => {
                    set({ isLoading: true });
                    
                    try {
                        // In production: await api.post('/auth/logout');
                        await new Promise((resolve) => setTimeout(resolve, 500));
                        
                        if (typeof window !== 'undefined') {
                            localStorage.removeItem('sgif_token');
                        }
                        
                        set({
                            user: null,
                            tokens: null,
                            isLoading: false,
                            isAuthenticated: false,
                            error: null,
                        });
                    } catch (error) {
                        // Force logout even on error
                        if (typeof window !== 'undefined') {
                            localStorage.removeItem('sgif_token');
                        }
                        
                        set({
                            user: null,
                            tokens: null,
                            isLoading: false,
                            isAuthenticated: false,
                        });
                    }
                },

                refreshSession: async () => {
                    const { tokens } = get();
                    
                    if (!tokens || !shouldRefreshToken(tokens)) {
                        return;
                    }
                    
                    try {
                        // In production: const response = await api.post('/auth/refresh', { refreshToken: tokens.refreshToken });
                        await new Promise((resolve) => setTimeout(resolve, 500));
                        
                        const newTokens = generateMockTokens();
                        
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('sgif_token', newTokens.accessToken);
                        }
                        
                        set({
                            tokens: newTokens,
                            lastActivity: Date.now(),
                        });
                    } catch (error) {
                        // If refresh fails, logout
                        await get().logout();
                    }
                },

                updateUser: (updates: Partial<User>) => {
                    const { user } = get();
                    if (user) {
                        set({ user: { ...user, ...updates } });
                    }
                },

                clearError: () => {
                    set({ error: null });
                },

                checkSession: () => {
                    const { isAuthenticated, lastActivity, tokens } = get();
                    
                    if (!isAuthenticated) return false;
                    
                    // Check for session timeout
                    if (!isSessionValid(lastActivity)) {
                        get().logout();
                        return false;
                    }
                    
                    // Check for token refresh
                    if (shouldRefreshToken(tokens)) {
                        get().refreshSession();
                    }
                    
                    return true;
                },

                updateActivity: () => {
                    set({ lastActivity: Date.now() });
                },
            }),
            {
                name: 'sgif-auth-storage',
                storage: createJSONStorage(() => {
                    // Use sessionStorage for sensitive data in production
                    if (typeof window !== 'undefined') {
                        return process.env.NODE_ENV === 'production' 
                            ? sessionStorage 
                            : localStorage;
                    }
                    return {
                        getItem: () => null,
                        setItem: () => {},
                        removeItem: () => {},
                    };
                }),
                partialize: (state) => ({
                    user: state.user,
                    tokens: state.tokens,
                    isAuthenticated: state.isAuthenticated,
                    lastActivity: state.lastActivity,
                }),
            }
        ),
        { name: 'SGIF Auth Store' }
    )
);

export const ROLES: UserRole[] = [
    'Founder', 
    'GP', 
    'LP', 
    'Advisor', 
    'Admin', 
    'Auditor', 
    'Government_Observer'
];

/**
 * Hook to check if user has a specific role
 */
export function useHasRole(roles: UserRole | UserRole[]): boolean {
    const user = useAuth((state) => state.user);
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
}

/**
 * Hook to get current user role level
 */
export function useRoleLevel(): number {
    const user = useAuth((state) => state.user);
    if (!user) return 0;
    
    const roleLevels: Record<UserRole, number> = {
        Founder: 100,
        GP: 90,
        Admin: 85,
        Advisor: 60,
        LP: 50,
        Auditor: 40,
        Government_Observer: 30,
    };
    
    return roleLevels[user.role] || 0;
}

/**
 * Initialize auth - check session on mount
 */
export function initializeAuth(): void {
    const { checkSession, updateActivity } = useAuth.getState();
    
    // Check session validity
    checkSession();
    
    // Set up activity tracking
    if (typeof window !== 'undefined') {
        const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
        
        const handleActivity = () => {
            updateActivity();
        };
        
        events.forEach((event) => {
            window.addEventListener(event, handleActivity, { passive: true });
        });
        
        // Set up periodic session check
        setInterval(() => {
            checkSession();
        }, 60000); // Check every minute
    }
}
