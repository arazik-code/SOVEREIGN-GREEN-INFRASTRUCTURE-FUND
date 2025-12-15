/**
 * Projects Query Hooks
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsService, type ProjectFilters, type CreateProjectDTO, type UpdateProjectDTO } from "@sgif/lib";

// Query keys factory
export const projectKeys = {
    all: ['projects'] as const,
    lists: () => [...projectKeys.all, 'list'] as const,
    list: (filters: ProjectFilters) => [...projectKeys.lists(), filters] as const,
    details: () => [...projectKeys.all, 'detail'] as const,
    detail: (id: string) => [...projectKeys.details(), id] as const,
    stats: () => [...projectKeys.all, 'stats'] as const,
};

/**
 * Hook to fetch all projects
 */
export function useProjects(filters?: ProjectFilters) {
    return useQuery({
        queryKey: projectKeys.list(filters || {}),
        queryFn: () => projectsService.getAll(filters),
    });
}

/**
 * Hook to fetch paginated projects
 */
export function useProjectsPaginated(filters?: ProjectFilters) {
    return useQuery({
        queryKey: [...projectKeys.list(filters || {}), 'paginated'],
        queryFn: () => projectsService.getPaginated(filters),
    });
}

/**
 * Hook to fetch a single project
 */
export function useProject(id: string) {
    return useQuery({
        queryKey: projectKeys.detail(id),
        queryFn: () => projectsService.getById(id),
        enabled: !!id,
    });
}

/**
 * Hook to fetch project statistics
 */
export function useProjectStats() {
    return useQuery({
        queryKey: projectKeys.stats(),
        queryFn: () => projectsService.getStats(),
    });
}

/**
 * Hook to create a project
 */
export function useCreateProject() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: CreateProjectDTO) => projectsService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
            queryClient.invalidateQueries({ queryKey: projectKeys.stats() });
        },
    });
}

/**
 * Hook to update a project
 */
export function useUpdateProject() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateProjectDTO }) => 
            projectsService.update(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: projectKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
        },
    });
}

/**
 * Hook to delete a project
 */
export function useDeleteProject() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id: string) => projectsService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
            queryClient.invalidateQueries({ queryKey: projectKeys.stats() });
        },
    });
}

/**
 * Hook to update project status
 */
export function useUpdateProjectStatus() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => 
            projectsService.updateStatus(id, status),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: projectKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
        },
    });
}
