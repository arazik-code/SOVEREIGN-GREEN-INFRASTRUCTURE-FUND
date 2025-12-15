/**
 * Dynamic Imports
 * Lazy loaded components with loading states for better performance
 */

"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// Loading skeleton component
function ComponentSkeleton({ 
    height = "400px", 
    className = "" 
}: { 
    height?: string; 
    className?: string;
}) {
    return (
        <div 
            className={`animate-pulse bg-white/5 rounded-xl border border-white/10 ${className}`}
            style={{ height }}
            role="status"
            aria-label="Loading..."
        >
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
                    <span className="text-xs text-gray-500">Loading component...</span>
                </div>
            </div>
        </div>
    );
}

// Chart skeleton with chart-specific loading state
function ChartSkeleton() {
    return (
        <div 
            className="animate-pulse bg-white/5 rounded-xl border border-white/10 p-6"
            style={{ height: '400px' }}
            role="status"
            aria-label="Loading chart..."
        >
            <div className="flex flex-col h-full">
                {/* Title skeleton */}
                <div className="h-6 w-48 bg-white/10 rounded mb-4" />
                
                {/* Chart area skeleton */}
                <div className="flex-1 flex items-end justify-between gap-2 px-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div 
                            key={i}
                            className="bg-white/10 rounded-t flex-1"
                            style={{ 
                                height: `${Math.random() * 60 + 20}%`,
                                animationDelay: `${i * 0.1}s` 
                            }}
                        />
                    ))}
                </div>
                
                {/* X-axis skeleton */}
                <div className="flex justify-between mt-4 px-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-3 w-8 bg-white/10 rounded" />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Map skeleton with map-specific loading state
function MapSkeleton() {
    return (
        <div 
            className="animate-pulse bg-gradient-to-br from-blue-950/50 to-indigo-950/50 rounded-xl border border-white/10 overflow-hidden"
            style={{ height: '500px' }}
            role="status"
            aria-label="Loading map..."
        >
            <div className="h-full flex flex-col">
                {/* Map header skeleton */}
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <div className="h-5 w-32 bg-white/10 rounded" />
                    <div className="flex gap-2">
                        <div className="h-8 w-8 bg-white/10 rounded" />
                        <div className="h-8 w-8 bg-white/10 rounded" />
                    </div>
                </div>
                
                {/* Map content skeleton */}
                <div className="flex-1 flex items-center justify-center relative">
                    {/* Fake map grid */}
                    <div className="absolute inset-4 grid grid-cols-8 grid-rows-6 gap-1 opacity-20">
                        {Array.from({ length: 48 }).map((_, i) => (
                            <div key={i} className="bg-white/10 rounded" />
                        ))}
                    </div>
                    
                    {/* Loading indicator */}
                    <div className="flex flex-col items-center gap-3 z-10">
                        <div className="w-12 h-12 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
                        <span className="text-sm text-gray-400">Loading map data...</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// KPI Card skeleton
function KpiCardSkeleton() {
    return (
        <div 
            className="animate-pulse bg-white/5 rounded-xl border border-white/10 p-6"
            role="status"
            aria-label="Loading KPI..."
        >
            <div className="flex justify-between items-start mb-4">
                <div className="h-4 w-24 bg-white/10 rounded" />
                <div className="h-6 w-6 bg-white/10 rounded" />
            </div>
            <div className="h-8 w-32 bg-white/10 rounded mb-2" />
            <div className="h-3 w-20 bg-white/10 rounded" />
        </div>
    );
}

// Error fallback component
function LoadError({ 
    error, 
    retry 
}: { 
    error: Error; 
    retry: () => void; 
}) {
    return (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
            <p className="text-red-400 text-sm mb-4">
                Failed to load component
            </p>
            <button
                onClick={retry}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm transition-colors"
            >
                Try Again
            </button>
        </div>
    );
}

/**
 * Lazily loaded Financial Chart component
 * Uses dynamic import to reduce initial bundle size
 */
export const LazyFinancialChart = dynamic(
    () => import('@/components/dashboard/financial-chart').then(mod => ({ 
        default: mod.FinancialChart 
    })),
    {
        loading: () => <ChartSkeleton />,
        ssr: false, // Charts often use browser APIs
    }
);

/**
 * Lazily loaded Project Map component
 * MapLibre GL is a large dependency, so lazy loading is important
 */
export const LazyProjectMap = dynamic(
    () => import('@/components/dashboard/project-map').then(mod => ({ 
        default: mod.ProjectMap 
    })),
    {
        loading: () => <MapSkeleton />,
        ssr: false, // MapLibre requires DOM
    }
);

/**
 * Lazily loaded KPI Card component
 */
export const LazyKpiCard = dynamic(
    () => import('@/components/dashboard/kpi-card').then(mod => ({ 
        default: mod.KpiCard 
    })),
    {
        loading: () => <KpiCardSkeleton />,
    }
);

/**
 * Lazily loaded Document Viewer component
 */
export const LazyDocumentViewer = dynamic(
    () => import('@/components/ui/document-viewer').then(mod => ({ 
        default: mod.DocumentViewer 
    })),
    {
        loading: () => <ComponentSkeleton height="600px" />,
        ssr: false,
    }
);

/**
 * Lazily loaded Pipeline Board component
 */
export const LazyPipelineBoard = dynamic(
    () => import('@/components/projects/pipeline-board').then(mod => ({ 
        default: mod.PipelineBoard 
    })),
    {
        loading: () => <ComponentSkeleton height="500px" />,
        ssr: false, // Uses drag-and-drop
    }
);

/**
 * Lazily loaded Data Visualization components
 */
export const LazyLiveMetric = dynamic(
    () => import('@/components/ui/data-viz').then(mod => ({ 
        default: mod.LiveMetric 
    })),
    {
        loading: () => <ChartSkeleton />,
        ssr: false,
    }
);

export const LazySparklineChart = dynamic(
    () => import('@/components/ui/data-viz').then(mod => ({ 
        default: mod.SparklineChart 
    })),
    {
        loading: () => <ChartSkeleton />,
        ssr: false,
    }
);

export const LazyRadialProgress = dynamic(
    () => import('@/components/ui/data-viz').then(mod => ({ 
        default: mod.RadialProgress 
    })),
    {
        loading: () => <ChartSkeleton />,
        ssr: false,
    }
);

/**
 * Lazily loaded Audit Timeline component
 */
export const LazyAuditTimeline = dynamic(
    () => import('@/components/ui/audit-timeline').then(mod => ({ 
        default: mod.AuditTimeline 
    })),
    {
        loading: () => <ComponentSkeleton height="400px" />,
    }
);

/**
 * Lazily loaded AI Copilot component
 */
export const LazyAICopilot = dynamic(
    () => import('@/components/ai-copilot').then(mod => ({ 
        default: mod.AiCopilot 
    })),
    {
        loading: () => (
            <div className="fixed bottom-4 right-4 w-14 h-14 bg-white/5 rounded-full animate-pulse" />
        ),
        ssr: false,
    }
);

/**
 * Lazily loaded Onboarding Wizard component
 */
export const LazyOnboardingWizard = dynamic(
    () => import('@/components/ui/onboarding-wizard').then(mod => ({ 
        default: mod.OnboardingWizard 
    })),
    {
        loading: () => null,
        ssr: false,
    }
);

/**
 * Lazily loaded LP Performance Widget component
 */
export const LazyLPPerformanceWidget = dynamic(
    () => import('@/components/ui/lp-performance-widget').then(mod => ({ 
        default: mod.LPPerformanceWidget 
    })),
    {
        loading: () => <ChartSkeleton />,
        ssr: false,
    }
);

/**
 * Lazily loaded Cyber Effects components
 */
export const LazyCyberGrid = dynamic(
    () => import('@/components/ui/cyber-effects').then(mod => ({ 
        default: mod.CyberGrid 
    })),
    {
        loading: () => null,
        ssr: false,
    }
);

export const LazyHolographicCard = dynamic(
    () => import('@/components/ui/cyber-effects').then(mod => ({ 
        default: mod.HolographicCard 
    })),
    {
        loading: () => null,
        ssr: false,
    }
);

export const LazyGlowingOrb = dynamic(
    () => import('@/components/ui/cyber-effects').then(mod => ({ 
        default: mod.GlowingOrb 
    })),
    {
        loading: () => null,
        ssr: false,
    }
);

// Export skeletons for use in other components
export { 
    ComponentSkeleton, 
    ChartSkeleton, 
    MapSkeleton, 
    KpiCardSkeleton,
    LoadError,
};
