/**
 * UI Store
 * Global UI state management with persistence
 */

import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Types
export type Theme = 'light' | 'dark' | 'system';
export type SidebarState = 'expanded' | 'collapsed' | 'hidden';
export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface Toast {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
    dismissible?: boolean;
}

export interface Modal {
    id: string;
    component: string;
    props?: Record<string, unknown>;
    onClose?: () => void;
}

export interface UIState {
    // Theme
    theme: Theme;
    
    // Sidebar
    sidebarState: SidebarState;
    sidebarWidth: number;
    
    // Notifications
    notificationPosition: NotificationPosition;
    
    // Toasts
    toasts: Toast[];
    
    // Modals
    activeModals: Modal[];
    
    // Command Palette
    commandPaletteOpen: boolean;
    
    // Search
    globalSearchOpen: boolean;
    searchHistory: string[];
    
    // Mobile
    mobileMenuOpen: boolean;
    
    // Onboarding
    onboardingComplete: boolean;
    onboardingStep: number;
    
    // Feature flags (for progressive disclosure)
    enabledFeatures: Set<string>;
    
    // Preferences
    reducedMotion: boolean;
    compactMode: boolean;
    showHints: boolean;
}

export interface UIActions {
    // Theme
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    
    // Sidebar
    setSidebarState: (state: SidebarState) => void;
    toggleSidebar: () => void;
    setSidebarWidth: (width: number) => void;
    
    // Notifications
    setNotificationPosition: (position: NotificationPosition) => void;
    
    // Toasts
    addToast: (toast: Omit<Toast, 'id'>) => string;
    removeToast: (id: string) => void;
    clearToasts: () => void;
    
    // Modals
    openModal: (modal: Omit<Modal, 'id'>) => string;
    closeModal: (id: string) => void;
    closeAllModals: () => void;
    
    // Command Palette
    openCommandPalette: () => void;
    closeCommandPalette: () => void;
    toggleCommandPalette: () => void;
    
    // Search
    openGlobalSearch: () => void;
    closeGlobalSearch: () => void;
    toggleGlobalSearch: () => void;
    addToSearchHistory: (query: string) => void;
    clearSearchHistory: () => void;
    
    // Mobile
    openMobileMenu: () => void;
    closeMobileMenu: () => void;
    toggleMobileMenu: () => void;
    
    // Onboarding
    setOnboardingComplete: (complete: boolean) => void;
    setOnboardingStep: (step: number) => void;
    nextOnboardingStep: () => void;
    
    // Features
    enableFeature: (feature: string) => void;
    disableFeature: (feature: string) => void;
    isFeatureEnabled: (feature: string) => boolean;
    
    // Preferences
    setReducedMotion: (reduced: boolean) => void;
    setCompactMode: (compact: boolean) => void;
    setShowHints: (show: boolean) => void;
    
    // Reset
    resetUI: () => void;
}

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 11);

// Initial state
const initialState: UIState = {
    theme: 'system',
    sidebarState: 'expanded',
    sidebarWidth: 280,
    notificationPosition: 'top-right',
    toasts: [],
    activeModals: [],
    commandPaletteOpen: false,
    globalSearchOpen: false,
    searchHistory: [],
    mobileMenuOpen: false,
    onboardingComplete: false,
    onboardingStep: 0,
    enabledFeatures: new Set(['dashboard', 'projects', 'financials']),
    reducedMotion: false,
    compactMode: false,
    showHints: true,
};

export const useUIStore = create<UIState & UIActions>()(
    devtools(
        persist(
            immer((set, get) => ({
                ...initialState,
                
                // Theme
                setTheme: (theme) => set((state) => { state.theme = theme; }),
                toggleTheme: () => set((state) => {
                    const themes: Theme[] = ['light', 'dark', 'system'];
                    const currentIndex = themes.indexOf(state.theme);
                    state.theme = themes[(currentIndex + 1) % themes.length];
                }),
                
                // Sidebar
                setSidebarState: (sidebarState) => set((state) => { state.sidebarState = sidebarState; }),
                toggleSidebar: () => set((state) => {
                    state.sidebarState = state.sidebarState === 'expanded' ? 'collapsed' : 'expanded';
                }),
                setSidebarWidth: (width) => set((state) => { 
                    state.sidebarWidth = Math.max(200, Math.min(400, width)); 
                }),
                
                // Notifications
                setNotificationPosition: (position) => set((state) => { 
                    state.notificationPosition = position; 
                }),
                
                // Toasts
                addToast: (toast) => {
                    const id = generateId();
                    set((state) => {
                        state.toasts.push({ ...toast, id, dismissible: toast.dismissible ?? true });
                    });
                    
                    // Auto-remove after duration (default 5 seconds)
                    const duration = toast.duration ?? 5000;
                    if (duration > 0) {
                        setTimeout(() => {
                            get().removeToast(id);
                        }, duration);
                    }
                    
                    return id;
                },
                removeToast: (id) => set((state) => {
                    state.toasts = state.toasts.filter((t: Toast) => t.id !== id);
                }),
                clearToasts: () => set((state) => { state.toasts = []; }),
                
                // Modals
                openModal: (modal) => {
                    const id = generateId();
                    set((state) => {
                        state.activeModals.push({ ...modal, id });
                    });
                    return id;
                },
                closeModal: (id) => set((state) => {
                    const modal = state.activeModals.find((m: Modal) => m.id === id);
                    modal?.onClose?.();
                    state.activeModals = state.activeModals.filter((m: Modal) => m.id !== id);
                }),
                closeAllModals: () => set((state) => {
                    state.activeModals.forEach((m: Modal) => m.onClose?.());
                    state.activeModals = [];
                }),
                
                // Command Palette
                openCommandPalette: () => set((state) => { state.commandPaletteOpen = true; }),
                closeCommandPalette: () => set((state) => { state.commandPaletteOpen = false; }),
                toggleCommandPalette: () => set((state) => { 
                    state.commandPaletteOpen = !state.commandPaletteOpen; 
                }),
                
                // Search
                openGlobalSearch: () => set((state) => { state.globalSearchOpen = true; }),
                closeGlobalSearch: () => set((state) => { state.globalSearchOpen = false; }),
                toggleGlobalSearch: () => set((state) => { 
                    state.globalSearchOpen = !state.globalSearchOpen; 
                }),
                addToSearchHistory: (query) => set((state) => {
                    // Remove duplicates and add to front
                    state.searchHistory = [
                        query,
                        ...state.searchHistory.filter((q: string) => q !== query),
                    ].slice(0, 10); // Keep max 10 items
                }),
                clearSearchHistory: () => set((state) => { state.searchHistory = []; }),
                
                // Mobile
                openMobileMenu: () => set((state) => { state.mobileMenuOpen = true; }),
                closeMobileMenu: () => set((state) => { state.mobileMenuOpen = false; }),
                toggleMobileMenu: () => set((state) => { 
                    state.mobileMenuOpen = !state.mobileMenuOpen; 
                }),
                
                // Onboarding
                setOnboardingComplete: (complete) => set((state) => { 
                    state.onboardingComplete = complete; 
                }),
                setOnboardingStep: (step) => set((state) => { state.onboardingStep = step; }),
                nextOnboardingStep: () => set((state) => { state.onboardingStep += 1; }),
                
                // Features
                enableFeature: (feature) => set((state) => { 
                    state.enabledFeatures.add(feature); 
                }),
                disableFeature: (feature) => set((state) => { 
                    state.enabledFeatures.delete(feature); 
                }),
                isFeatureEnabled: (feature) => get().enabledFeatures.has(feature),
                
                // Preferences
                setReducedMotion: (reduced) => set((state) => { state.reducedMotion = reduced; }),
                setCompactMode: (compact) => set((state) => { state.compactMode = compact; }),
                setShowHints: (show) => set((state) => { state.showHints = show; }),
                
                // Reset
                resetUI: () => set(() => initialState),
            })),
            {
                name: 'sgif-ui-store',
                partialize: (state) => ({
                    theme: state.theme,
                    sidebarState: state.sidebarState,
                    sidebarWidth: state.sidebarWidth,
                    notificationPosition: state.notificationPosition,
                    searchHistory: state.searchHistory,
                    onboardingComplete: state.onboardingComplete,
                    onboardingStep: state.onboardingStep,
                    enabledFeatures: Array.from(state.enabledFeatures),
                    reducedMotion: state.reducedMotion,
                    compactMode: state.compactMode,
                    showHints: state.showHints,
                }),
                // Custom storage to handle Set serialization
                storage: {
                    getItem: (name) => {
                        const str = localStorage.getItem(name);
                        if (!str) return null;
                        const parsed = JSON.parse(str);
                        if (parsed.state?.enabledFeatures) {
                            parsed.state.enabledFeatures = new Set(parsed.state.enabledFeatures);
                        }
                        return parsed;
                    },
                    setItem: (name, value) => {
                        localStorage.setItem(name, JSON.stringify(value));
                    },
                    removeItem: (name) => {
                        localStorage.removeItem(name);
                    },
                },
            }
        ),
        { name: 'UIStore' }
    )
);

// Selectors for common use cases
export const useTheme = () => useUIStore((state) => state.theme);
export const useSidebar = () => useUIStore((state) => ({
    state: state.sidebarState,
    width: state.sidebarWidth,
    toggle: state.toggleSidebar,
    setState: state.setSidebarState,
}));
export const useToasts = () => useUIStore((state) => ({
    toasts: state.toasts,
    add: state.addToast,
    remove: state.removeToast,
    clear: state.clearToasts,
}));
export const useModals = () => useUIStore((state) => ({
    modals: state.activeModals,
    open: state.openModal,
    close: state.closeModal,
    closeAll: state.closeAllModals,
}));
