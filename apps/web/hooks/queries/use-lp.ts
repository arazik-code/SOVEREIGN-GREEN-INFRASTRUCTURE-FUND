/**
 * LP (Limited Partner) Query Hooks
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { lpService, type LPFilters } from "@sgif/lib";

// Query keys factory
export const lpKeys = {
    all: ['lp'] as const,
    lists: () => [...lpKeys.all, 'list'] as const,
    list: (params?: LPFilters) => [...lpKeys.lists(), params] as const,
    details: () => [...lpKeys.all, 'detail'] as const,
    detail: (id: string) => [...lpKeys.details(), id] as const,
    dashboard: () => [...lpKeys.all, 'dashboard'] as const,
    performance: (lpId?: string) => [...lpKeys.all, 'performance', lpId] as const,
    capitalCalls: (lpId?: string, status?: string) => [...lpKeys.all, 'capital-calls', lpId, status] as const,
    distributions: (lpId?: string) => [...lpKeys.all, 'distributions', lpId] as const,
    statements: (lpId?: string, year?: number) => [...lpKeys.all, 'statements', lpId, year] as const,
    breakdown: (lpId?: string) => [...lpKeys.all, 'breakdown', lpId] as const,
};

/**
 * Hook to fetch LPs list
 */
export function useLPs(params?: LPFilters) {
    return useQuery({
        queryKey: lpKeys.list(params),
        queryFn: () => lpService.getLPs(params),
    });
}

/**
 * Hook to fetch a single LP
 */
export function useLP(id: string) {
    return useQuery({
        queryKey: lpKeys.detail(id),
        queryFn: () => lpService.getLP(id),
        enabled: !!id,
    });
}

/**
 * Hook to fetch LP dashboard (for logged-in LP user)
 */
export function useLPDashboard() {
    return useQuery({
        queryKey: lpKeys.dashboard(),
        queryFn: () => lpService.getDashboard(),
    });
}

/**
 * Hook to fetch LP performance
 */
export function useLPPerformance(lpId?: string) {
    return useQuery({
        queryKey: lpKeys.performance(lpId),
        queryFn: () => lpService.getPerformance(lpId),
    });
}

/**
 * Hook to fetch capital calls
 */
export function useCapitalCalls(lpId?: string, status?: string) {
    return useQuery({
        queryKey: lpKeys.capitalCalls(lpId, status),
        queryFn: () => lpService.getCapitalCalls(lpId, status),
    });
}

/**
 * Hook to fetch distributions
 */
export function useDistributions(lpId?: string) {
    return useQuery({
        queryKey: lpKeys.distributions(lpId),
        queryFn: () => lpService.getDistributions(lpId),
    });
}

/**
 * Hook to fetch LP statements
 */
export function useLPStatements(lpId?: string, year?: number) {
    return useQuery({
        queryKey: lpKeys.statements(lpId, year),
        queryFn: () => lpService.getStatements(lpId, year),
    });
}

/**
 * Hook to fetch LP investment breakdown
 */
export function useInvestmentBreakdown(lpId?: string) {
    return useQuery({
        queryKey: lpKeys.breakdown(lpId),
        queryFn: () => lpService.getInvestmentBreakdown(lpId),
    });
}

/**
 * Hook to create a capital call
 */
export function useCreateCapitalCall() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: {
            lpId: string;
            amount: number;
            currency: string;
            dueDate: string;
            purpose?: string;
            projectId?: string;
        }) => lpService.createCapitalCall(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: lpKeys.capitalCalls() });
        },
    });
}

/**
 * Hook to mark a capital call as paid
 */
export function useMarkCapitalCallPaid() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, paidAt }: {
            id: string;
            paidAt?: string;
        }) => lpService.markCapitalCallPaid(id, paidAt),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: lpKeys.capitalCalls() });
            queryClient.invalidateQueries({ queryKey: lpKeys.performance() });
        },
    });
}

/**
 * Hook to cancel a capital call
 */
export function useCancelCapitalCall() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id: string) => lpService.cancelCapitalCall(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: lpKeys.capitalCalls() });
        },
    });
}

/**
 * Hook to create a distribution
 */
export function useCreateDistribution() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: {
            lpId: string;
            amount: number;
            currency: string;
            type: 'dividend' | 'return_of_capital' | 'carry';
            projectId?: string;
        }) => lpService.createDistribution(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: lpKeys.distributions() });
            queryClient.invalidateQueries({ queryKey: lpKeys.performance() });
        },
    });
}

/**
 * Hook to update LP contact info
 */
export function useUpdateContactInfo() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: {
            contactPerson?: string;
            email?: string;
            phone?: string;
            address?: string;
        }) => lpService.updateContactInfo(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: lpKeys.dashboard() });
        },
    });
}

/**
 * Hook to export LP data
 */
export function useExportLPData() {
    return useMutation({
        mutationFn: (params: {
            format: 'pdf' | 'excel';
            type: 'statement' | 'performance' | 'transactions';
            period?: string;
        }) => lpService.export(params),
    });
}
