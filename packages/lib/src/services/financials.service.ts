/**
 * Financials Service
 * API service for financial data management
 */

import { api } from '../api';

export interface KpiData {
    aum: string;
    aumValue: number;
    activeProjects: number;
    carbonOffset: string;
    carbonOffsetValue: number;
    irr: string;
    irrValue: number;
    totalInvested: number;
    totalReturns: number;
    netAssetValue: number;
}

export interface FinancialMetric {
    name: string;
    value: number;
    previousValue?: number;
    change?: number;
    changePercent?: number;
    trend: 'up' | 'down' | 'neutral';
    unit?: string;
    period: string;
}

export interface CashFlow {
    id: string;
    date: string;
    type: 'inflow' | 'outflow';
    category: string;
    amount: number;
    currency: string;
    description?: string;
    projectId?: string;
}

export interface FinancialChartData {
    name: string;
    value: number;
    projected?: number;
    target?: number;
    volume?: number;
}

export interface FinancialReportParams {
    startDate: string;
    endDate: string;
    projectIds?: string[];
    reportType: 'summary' | 'detailed' | 'quarterly' | 'annual';
}

export interface FinancialReport {
    period: { start: string; end: string };
    totalInvestments: number;
    totalReturns: number;
    netIncome: number;
    expenses: number;
    irr: number;
    moic: number;
    byProject: Array<{
        projectId: string;
        projectName: string;
        invested: number;
        returns: number;
        irr: number;
    }>;
    charts: {
        monthlyReturns: FinancialChartData[];
        expenseBreakdown: Array<{ category: string; amount: number; percentage: number }>;
    };
}

/**
 * Financials Service
 */
export const financialsService = {
    /**
     * Get KPI dashboard data
     */
    getKpis: async (): Promise<KpiData> => {
        return api.get<KpiData>('/api/kpi');
    },

    /**
     * Get KPIs with comparison to previous period
     */
    getKpisWithComparison: async (): Promise<{
        current: KpiData;
        previous: KpiData;
        trends: Record<string, { change: number; trend: 'up' | 'down' | 'neutral' }>;
    }> => {
        return api.get('/api/kpi/comparison');
    },

    /**
     * Get financial metrics
     */
    getMetrics: async (period?: string): Promise<FinancialMetric[]> => {
        const endpoint = period ? `/api/financials/metrics?period=${period}` : '/api/financials/metrics';
        return api.get<FinancialMetric[]>(endpoint);
    },

    /**
     * Get cash flows
     */
    getCashFlows: async (params?: {
        startDate?: string;
        endDate?: string;
        type?: 'inflow' | 'outflow';
        projectId?: string;
    }): Promise<CashFlow[]> => {
        const searchParams = new URLSearchParams();
        
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value) searchParams.append(key, value);
            });
        }
        
        const query = searchParams.toString();
        const endpoint = query ? `/api/financials/cashflows?${query}` : '/api/financials/cashflows';
        return api.get<CashFlow[]>(endpoint);
    },

    /**
     * Get chart data for financial visualization
     */
    getChartData: async (chartType: 'revenue' | 'expenses' | 'investments' | 'returns', period?: string): Promise<FinancialChartData[]> => {
        const params = new URLSearchParams({ type: chartType });
        if (period) params.append('period', period);
        return api.get<FinancialChartData[]>(`/api/financials/charts?${params.toString()}`);
    },

    /**
     * Generate financial report
     */
    generateReport: async (params: FinancialReportParams): Promise<FinancialReport> => {
        return api.post<FinancialReport>('/api/financials/reports', params);
    },

    /**
     * Export financial data
     */
    export: async (params: {
        type: 'kpi' | 'cashflows' | 'report';
        format: 'pdf' | 'excel' | 'csv';
        startDate?: string;
        endDate?: string;
    }): Promise<Blob> => {
        const searchParams = new URLSearchParams(params as Record<string, string>);
        const response = await fetch(`/api/financials/export?${searchParams.toString()}`);
        return response.blob();
    },

    /**
     * Get investment summary by project
     */
    getInvestmentSummary: async (): Promise<Array<{
        projectId: string;
        projectName: string;
        invested: number;
        currentValue: number;
        returns: number;
        irr: number;
        status: string;
    }>> => {
        return api.get('/api/financials/investments/summary');
    },

    /**
     * Get expense breakdown
     */
    getExpenseBreakdown: async (period?: string): Promise<Array<{
        category: string;
        amount: number;
        percentage: number;
        previousAmount?: number;
        change?: number;
    }>> => {
        const endpoint = period 
            ? `/api/financials/expenses/breakdown?period=${period}` 
            : '/api/financials/expenses/breakdown';
        return api.get(endpoint);
    },
};
