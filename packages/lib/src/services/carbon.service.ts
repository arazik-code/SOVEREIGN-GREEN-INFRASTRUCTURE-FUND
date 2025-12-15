/**
 * Carbon Service
 * API service for carbon offset and ESG data
 */

import { api } from '../api';

export interface CarbonForecastPoint {
    name: string;
    date?: string;
    value: number;
    projected?: number;
    target?: number;
}

export interface CarbonData {
    totalOffset: number;
    totalOffsetFormatted: string;
    unit: string;
    yearToDate: number;
    monthlyAverage: number;
    forecast: CarbonForecastPoint[];
    byProject: Array<{
        projectId: string;
        projectName: string;
        offset: number;
        percentage: number;
    }>;
    certifications: Array<{
        id: string;
        name: string;
        issuedAt: string;
        expiresAt: string;
        status: 'active' | 'expired' | 'pending';
    }>;
}

export interface EsgMetric {
    category: 'environmental' | 'social' | 'governance';
    name: string;
    score: number;
    maxScore: number;
    trend: 'up' | 'down' | 'stable';
    details?: string;
}

export interface CarbonCredit {
    id: string;
    projectId: string;
    type: string;
    quantity: number;
    vintage: number;
    status: 'available' | 'retired' | 'pending';
    verifiedBy: string;
    price?: number;
    createdAt: string;
}

export interface CarbonParams {
    startDate?: string;
    endDate?: string;
    projectIds?: string[];
    granularity?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

/**
 * Carbon Service
 */
export const carbonService = {
    /**
     * Get carbon dashboard data
     */
    getData: async (): Promise<CarbonData> => {
        return api.get<CarbonData>('/api/carbon');
    },

    /**
     * Get carbon forecast data
     */
    getForecast: async (params?: CarbonParams): Promise<CarbonForecastPoint[]> => {
        const searchParams = new URLSearchParams();
        
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value) {
                    if (Array.isArray(value)) {
                        value.forEach(v => searchParams.append(key, v));
                    } else {
                        searchParams.append(key, String(value));
                    }
                }
            });
        }
        
        const query = searchParams.toString();
        const endpoint = query ? `/api/carbon/forecast?${query}` : '/api/carbon/forecast';
        return api.get<CarbonForecastPoint[]>(endpoint);
    },

    /**
     * Get carbon offset by project
     */
    getByProject: async (projectId?: string): Promise<Array<{
        projectId: string;
        projectName: string;
        offset: number;
        offsetFormatted: string;
        percentage: number;
        trend: 'up' | 'down' | 'stable';
    }>> => {
        const endpoint = projectId 
            ? `/api/carbon/by-project/${projectId}` 
            : '/api/carbon/by-project';
        return api.get(endpoint);
    },

    /**
     * Get ESG metrics
     */
    getEsgMetrics: async (): Promise<{
        overall: { score: number; maxScore: number; rating: string };
        metrics: EsgMetric[];
        history: Array<{ date: string; score: number }>;
    }> => {
        return api.get('/api/carbon/esg');
    },

    /**
     * Get carbon certifications
     */
    getCertifications: async (): Promise<CarbonData['certifications']> => {
        return api.get('/api/carbon/certifications');
    },

    /**
     * Get carbon credits
     */
    getCredits: async (params?: {
        status?: 'available' | 'retired' | 'pending';
        projectId?: string;
    }): Promise<CarbonCredit[]> => {
        const searchParams = new URLSearchParams();
        
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value) searchParams.append(key, value);
            });
        }
        
        const query = searchParams.toString();
        const endpoint = query ? `/api/carbon/credits?${query}` : '/api/carbon/credits';
        return api.get<CarbonCredit[]>(endpoint);
    },

    /**
     * Retire carbon credits
     */
    retireCredits: async (creditIds: string[], reason?: string): Promise<{
        retiredCount: number;
        totalOffset: number;
    }> => {
        return api.post('/api/carbon/credits/retire', { creditIds, reason });
    },

    /**
     * Get carbon comparison with targets
     */
    getTargetComparison: async (): Promise<{
        currentOffset: number;
        targetOffset: number;
        percentageAchieved: number;
        projectedYearEnd: number;
        onTrack: boolean;
    }> => {
        return api.get('/api/carbon/targets');
    },

    /**
     * Export carbon data
     */
    export: async (params: {
        format: 'pdf' | 'excel' | 'csv';
        type: 'summary' | 'detailed' | 'credits';
        startDate?: string;
        endDate?: string;
    }): Promise<Blob> => {
        const searchParams = new URLSearchParams(params as Record<string, string>);
        const response = await fetch(`/api/carbon/export?${searchParams.toString()}`);
        return response.blob();
    },

    /**
     * Get carbon impact metrics
     */
    getImpactMetrics: async (): Promise<{
        treesEquivalent: number;
        carsOffRoad: number;
        homesEnergized: number;
        flightsOffset: number;
    }> => {
        return api.get('/api/carbon/impact');
    },
};
