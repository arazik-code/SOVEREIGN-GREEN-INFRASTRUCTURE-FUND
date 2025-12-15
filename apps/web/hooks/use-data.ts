import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@sgif/lib";

export interface Project {
    id: string;
    name: string;
    location: string;
    stage: string;
    budget: string;
    irr: string;
    type: string;
}

export interface KpiData {
    aum: string;
    activeProjects: number;
    carbonOffset: string;
    irr: string;
}

export function useProjects() {
    return useQuery({
        queryKey: ["projects"],
        queryFn: () => apiClient<Project[]>("/api/projects"),
    });
}

export function useKpi() {
    return useQuery({
        queryKey: ["kpi"],
        queryFn: () => apiClient<KpiData>("/api/kpi"),
    });
}

export function useCarbonForecast() {
    return useQuery({
        queryKey: ["carbon-forecast"],
        queryFn: () => apiClient<any[]>("/api/carbon/forecast"),
    });
}
