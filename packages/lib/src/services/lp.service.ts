/**
 * LP (Limited Partner) Service
 * API service for LP portal and investor management
 */

import { api } from '../api';

export interface LimitedPartner {
    id: string;
    name: string;
    type: 'institution' | 'sovereign' | 'family_office' | 'individual';
    email: string;
    contactPerson?: string;
    commitment: number;
    contributedCapital: number;
    distributions: number;
    unfundedCommitment: number;
    ownership: number;
    joinedAt: string;
    status: 'active' | 'inactive';
}

export interface CapitalCall {
    id: string;
    lpId: string;
    amount: number;
    currency: string;
    dueDate: string;
    status: 'pending' | 'paid' | 'overdue' | 'cancelled';
    paidAt?: string;
    purpose?: string;
    projectId?: string;
    projectName?: string;
}

export interface Distribution {
    id: string;
    lpId: string;
    amount: number;
    currency: string;
    type: 'dividend' | 'return_of_capital' | 'carry';
    distributedAt: string;
    projectId?: string;
    projectName?: string;
}

export interface LPPerformance {
    tvpi: number;
    dpi: number;
    rvpi: number;
    irr: number;
    moic: number;
}

export interface LPFilters {
    type?: string | string[];
    status?: string;
    search?: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

/**
 * LP Service
 */
export const lpService = {
    /**
     * Get all LPs with optional filtering
     */
    getLPs: async (filters?: LPFilters): Promise<{
        lps: LimitedPartner[];
        pagination: {
            page: number;
            pageSize: number;
            totalItems: number;
            totalPages: number;
        };
        totals: {
            commitment: number;
            contributed: number;
            distributed: number;
        };
    }> => {
        const params = new URLSearchParams();
        
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined) {
                    if (Array.isArray(value)) {
                        value.forEach(v => params.append(key, v));
                    } else {
                        params.append(key, String(value));
                    }
                }
            });
        }
        
        const query = params.toString();
        const endpoint = query ? `/api/lp?${query}` : '/api/lp';
        return api.get(endpoint);
    },

    /**
     * Get LP by ID
     */
    getLP: async (id: string): Promise<LimitedPartner> => {
        return api.get<LimitedPartner>(`/api/lp/${id}`);
    },

    /**
     * Get LP dashboard (for logged-in LP user)
     */
    getDashboard: async (): Promise<{
        lp: LimitedPartner;
        investments: Array<{
            projectId: string;
            projectName: string;
            invested: number;
            currentValue: number;
            irr: number;
            status: string;
        }>;
        capitalCalls: CapitalCall[];
        distributions: Distribution[];
        performance: LPPerformance;
        documents: Array<{
            id: string;
            name: string;
            type: string;
            uploadedAt: string;
        }>;
    }> => {
        return api.get('/api/lp/dashboard');
    },

    /**
     * Get LP capital calls
     */
    getCapitalCalls: async (lpId?: string, status?: string): Promise<CapitalCall[]> => {
        const params = new URLSearchParams();
        if (lpId) params.append('lpId', lpId);
        if (status) params.append('status', status);
        
        const query = params.toString();
        const endpoint = query ? `/api/lp/capital-calls?${query}` : '/api/lp/capital-calls';
        return api.get<CapitalCall[]>(endpoint);
    },

    /**
     * Create capital call
     */
    createCapitalCall: async (data: {
        lpId: string;
        amount: number;
        currency: string;
        dueDate: string;
        purpose?: string;
        projectId?: string;
    }): Promise<CapitalCall> => {
        return api.post<CapitalCall>('/api/lp/capital-calls', data);
    },

    /**
     * Mark capital call as paid
     */
    markCapitalCallPaid: async (id: string, paidAt?: string): Promise<CapitalCall> => {
        return api.patch<CapitalCall>(`/api/lp/capital-calls/${id}/paid`, { paidAt });
    },

    /**
     * Cancel capital call
     */
    cancelCapitalCall: async (id: string): Promise<CapitalCall> => {
        return api.patch<CapitalCall>(`/api/lp/capital-calls/${id}/cancel`);
    },

    /**
     * Get LP distributions
     */
    getDistributions: async (lpId?: string): Promise<Distribution[]> => {
        const endpoint = lpId 
            ? `/api/lp/distributions?lpId=${lpId}` 
            : '/api/lp/distributions';
        return api.get<Distribution[]>(endpoint);
    },

    /**
     * Create distribution
     */
    createDistribution: async (data: {
        lpId: string;
        amount: number;
        currency: string;
        type: 'dividend' | 'return_of_capital' | 'carry';
        projectId?: string;
    }): Promise<Distribution> => {
        return api.post<Distribution>('/api/lp/distributions', data);
    },

    /**
     * Get LP performance metrics
     */
    getPerformance: async (lpId?: string): Promise<LPPerformance & {
        history: Array<{
            date: string;
            nav: number;
            irr: number;
        }>;
    }> => {
        const endpoint = lpId 
            ? `/api/lp/performance?lpId=${lpId}` 
            : '/api/lp/performance';
        return api.get(endpoint);
    },

    /**
     * Get LP statements
     */
    getStatements: async (lpId?: string, year?: number): Promise<Array<{
        id: string;
        type: 'quarterly' | 'annual' | 'k1';
        period: string;
        generatedAt: string;
        downloadUrl: string;
    }>> => {
        const params = new URLSearchParams();
        if (lpId) params.append('lpId', lpId);
        if (year) params.append('year', String(year));
        
        const query = params.toString();
        const endpoint = query ? `/api/lp/statements?${query}` : '/api/lp/statements';
        return api.get(endpoint);
    },

    /**
     * Get LP investment breakdown
     */
    getInvestmentBreakdown: async (lpId?: string): Promise<{
        byProject: Array<{
            projectId: string;
            projectName: string;
            committed: number;
            contributed: number;
            currentValue: number;
            percentage: number;
        }>;
        byType: Array<{
            type: string;
            amount: number;
            percentage: number;
        }>;
        byStatus: Array<{
            status: string;
            amount: number;
            percentage: number;
        }>;
    }> => {
        const endpoint = lpId 
            ? `/api/lp/breakdown?lpId=${lpId}` 
            : '/api/lp/breakdown';
        return api.get(endpoint);
    },

    /**
     * Update LP contact info
     */
    updateContactInfo: async (data: {
        contactPerson?: string;
        email?: string;
        phone?: string;
        address?: string;
    }): Promise<LimitedPartner> => {
        return api.patch<LimitedPartner>('/api/lp/contact', data);
    },

    /**
     * Export LP data
     */
    export: async (params: {
        format: 'pdf' | 'excel';
        type: 'statement' | 'performance' | 'transactions';
        period?: string;
    }): Promise<Blob> => {
        const searchParams = new URLSearchParams(params as Record<string, string>);
        const response = await fetch(`/api/lp/export?${searchParams.toString()}`);
        return response.blob();
    },
};
