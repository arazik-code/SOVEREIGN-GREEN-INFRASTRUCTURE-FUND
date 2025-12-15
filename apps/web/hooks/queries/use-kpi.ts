/**
 * KPI Query Hooks
 */

import { useQuery } from "@tanstack/react-query";
import { financialsService } from "@sgif/lib";

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
        queryFn: () => financialsService.getKpis(),
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
