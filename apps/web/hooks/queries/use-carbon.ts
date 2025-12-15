/**
 * Carbon Query Hooks
 */

import { useQuery } from "@tanstack/react-query";
import { carbonService, type CarbonParams } from "@sgif/lib";

// Query keys factory
export const carbonKeys = {
    all: ['carbon'] as const,
    data: () => [...carbonKeys.all, 'data'] as const,
    forecast: (params?: CarbonParams) => [...carbonKeys.all, 'forecast', params] as const,
    byProject: (projectId?: string) => [...carbonKeys.all, 'byProject', projectId] as const,
    esg: () => [...carbonKeys.all, 'esg'] as const,
    credits: (params?: object) => [...carbonKeys.all, 'credits', params] as const,
    certifications: () => [...carbonKeys.all, 'certifications'] as const,
    targets: () => [...carbonKeys.all, 'targets'] as const,
    impact: () => [...carbonKeys.all, 'impact'] as const,
};

/**
 * Hook to fetch carbon dashboard data
 */
export function useCarbonData() {
    return useQuery({
        queryKey: carbonKeys.data(),
        queryFn: () => carbonService.getData(),
    });
}

/**
 * Hook to fetch carbon forecast
 */
export function useCarbonForecast(params?: CarbonParams) {
    return useQuery({
        queryKey: carbonKeys.forecast(params),
        queryFn: () => carbonService.getForecast(params),
    });
}

/**
 * Hook to fetch carbon by project
 */
export function useCarbonByProject(projectId?: string) {
    return useQuery({
        queryKey: carbonKeys.byProject(projectId),
        queryFn: () => carbonService.getByProject(projectId),
    });
}

/**
 * Hook to fetch ESG metrics
 */
export function useEsgMetrics() {
    return useQuery({
        queryKey: carbonKeys.esg(),
        queryFn: () => carbonService.getEsgMetrics(),
    });
}

/**
 * Hook to fetch carbon certifications
 */
export function useCarbonCertifications() {
    return useQuery({
        queryKey: carbonKeys.certifications(),
        queryFn: () => carbonService.getCertifications(),
    });
}

/**
 * Hook to fetch carbon credits
 */
export function useCarbonCredits(params?: {
    status?: 'available' | 'retired' | 'pending';
    projectId?: string;
}) {
    return useQuery({
        queryKey: carbonKeys.credits(params),
        queryFn: () => carbonService.getCredits(params),
    });
}

/**
 * Hook to fetch carbon target comparison
 */
export function useCarbonTargets() {
    return useQuery({
        queryKey: carbonKeys.targets(),
        queryFn: () => carbonService.getTargetComparison(),
    });
}

/**
 * Hook to fetch carbon impact metrics
 */
export function useCarbonImpact() {
    return useQuery({
        queryKey: carbonKeys.impact(),
        queryFn: () => carbonService.getImpactMetrics(),
    });
}
