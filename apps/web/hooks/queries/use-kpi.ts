/**
 * KPI Query Hooks
 */

import { useQuery } from "@tanstack/react-query";
import { financialsService } from "@sgif/lib";

// Mock data for offline/demo mode
const MOCK_KPI = {
    aum: "$500M",
    activeProjects: 12,
    carbonOffset: "1.2M tCO2",
    irr: "14.2%"
};

// Query keys factory
export const kpiKeys = {
    all: ['kpi'] as const,
    current: () => [...kpiKeys.all, 'current'] as const,
    comparison: () => [...kpiKeys.all, 'comparison'] as const,
    metrics: (period?: string) => [...kpiKeys.all, 'metrics', period] as const,
};

/**
 * Hook to fetch KPI data
 */
export function useKpi() {
    return useQuery({
        queryKey: kpiKeys.current(),
        queryFn: async () => {
            try {
                return await financialsService.getKpis();
            } catch (error) {
                console.warn("KPI fetch failed, using mock data", error);
                return MOCK_KPI;
            }
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });
}

/**
 * Hook to fetch KPI with comparison to previous period
 */
export function useKpiComparison() {
    return useQuery({
        queryKey: kpiKeys.comparison(),
        queryFn: () => financialsService.getKpisWithComparison(),
    });
}

/**
 * Hook to fetch financial metrics
 */
export function useFinancialMetrics(period?: string) {
    return useQuery({
        queryKey: kpiKeys.metrics(period),
        queryFn: () => financialsService.getMetrics(period),
    });
}

/**
 * Hook to fetch chart data
 */
export function useFinancialChartData(
    chartType: 'revenue' | 'expenses' | 'investments' | 'returns',
    period?: string
) {
    return useQuery({
        queryKey: ['financials', 'charts', chartType, period],
        queryFn: () => financialsService.getChartData(chartType, period),
    });
}

/**
 * Hook to fetch cash flows
 */
export function useCashFlows(params?: {
    startDate?: string;
    endDate?: string;
    type?: 'inflow' | 'outflow';
    projectId?: string;
}) {
    return useQuery({
        queryKey: ['financials', 'cashflows', params],
        queryFn: () => financialsService.getCashFlows(params),
    });
}

/**
 * Hook to fetch investment summary
 */
export function useInvestmentSummary() {
    return useQuery({
        queryKey: ['financials', 'investments', 'summary'],
        queryFn: () => financialsService.getInvestmentSummary(),
    });
}

/**
 * Hook to fetch expense breakdown
 */
export function useExpenseBreakdown(period?: string) {
    return useQuery({
        queryKey: ['financials', 'expenses', 'breakdown', period],
        queryFn: () => financialsService.getExpenseBreakdown(period),
    });
}
