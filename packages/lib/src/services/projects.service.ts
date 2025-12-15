/**
 * Projects Service
 * API service for project management
 */

import { api } from '../api';

// Types (these would normally come from @sgif/types)
export interface Project {
    id: string;
    name: string;
    description?: string;
    location: string;
    country: string;
    status: string;
    type: string;
    budget: number;
    budgetCurrency: string;
    irr?: number;
    carbonOffset?: number;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectSummary {
    id: string;
    name: string;
    location: string;
    stage: string;
    budget: string;
    irr: string;
    type: string;
}

export interface CreateProjectDTO {
    name: string;
    description?: string;
    location: string;
    country: string;
    type: string;
    budget: number;
    budgetCurrency?: string;
    capacity?: string;
    expectedCompletionDate?: string;
    tags?: string[];
}

export interface UpdateProjectDTO {
    name?: string;
    description?: string;
    status?: string;
    budget?: number;
    irr?: number;
    carbonOffset?: number;
    tags?: string[];
}

export interface ProjectFilters {
    status?: string | string[];
    type?: string | string[];
    country?: string;
    minBudget?: number;
    maxBudget?: number;
    search?: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface PaginatedProjects {
    data: ProjectSummary[];
    pagination: {
        page: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
    };
}

/**
 * Projects Service
 */
export const projectsService = {
    /**
     * Get all projects with optional filtering
     */
    getAll: async (filters?: ProjectFilters): Promise<ProjectSummary[]> => {
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
        const endpoint = query ? `/api/projects?${query}` : '/api/projects';
        return api.get<ProjectSummary[]>(endpoint);
    },

    /**
     * Get paginated projects
     */
    getPaginated: async (filters?: ProjectFilters): Promise<PaginatedProjects> => {
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
        const endpoint = query ? `/api/projects/paginated?${query}` : '/api/projects/paginated';
        return api.get<PaginatedProjects>(endpoint);
    },

    /**
     * Get a single project by ID
     */
    getById: async (id: string): Promise<Project> => {
        return api.get<Project>(`/api/projects/${id}`);
    },

    /**
     * Create a new project
     */
    create: async (data: CreateProjectDTO): Promise<Project> => {
        return api.post<Project>('/api/projects', data);
    },

    /**
     * Update an existing project
     */
    update: async (id: string, data: UpdateProjectDTO): Promise<Project> => {
        return api.patch<Project>(`/api/projects/${id}`, data);
    },

    /**
     * Delete a project
     */
    delete: async (id: string): Promise<void> => {
        return api.delete<void>(`/api/projects/${id}`);
    },

    /**
     * Get project statistics
     */
    getStats: async (): Promise<{
        total: number;
        byStatus: Record<string, number>;
        byType: Record<string, number>;
        totalBudget: number;
        averageIrr: number;
    }> => {
        return api.get('/api/projects/stats');
    },

    /**
     * Update project status
     */
    updateStatus: async (id: string, status: string): Promise<Project> => {
        return api.patch<Project>(`/api/projects/${id}/status`, { status });
    },

    /**
     * Add team member to project
     */
    addTeamMember: async (projectId: string, userId: string, role: string): Promise<void> => {
        return api.post(`/api/projects/${projectId}/team`, { userId, role });
    },

    /**
     * Remove team member from project
     */
    removeTeamMember: async (projectId: string, userId: string): Promise<void> => {
        return api.delete(`/api/projects/${projectId}/team/${userId}`);
    },

    /**
     * Export project data
     */
    export: async (filters?: ProjectFilters, format: 'pdf' | 'excel' | 'csv' = 'excel'): Promise<Blob> => {
        const params = new URLSearchParams({ format });
        
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && key !== 'page' && key !== 'pageSize') {
                    params.append(key, String(value));
                }
            });
        }
        
        const response = await fetch(`/api/projects/export?${params.toString()}`);
        return response.blob();
    },
};
