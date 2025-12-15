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

// Mock data for offline/demo mode
const MOCK_PROJECTS: Project[] = [
    { id: "1", name: "Al Dhafra Solar PV", location: "UAE", stage: "Construction", budget: "$1.2B", irr: "8.5%", type: "Solar" },
    { id: "2", name: "NEOM Hydrogen Plant", location: "KSA", stage: "Development", budget: "$5.0B", irr: "12.0%", type: "Hydrogen" },
    { id: "3", name: "Barakah Unit 4", location: "UAE", stage: "Operational", budget: "$24B", irr: "7.2%", type: "Nuclear" },
    { id: "4", name: "Oman Green Ammonia", location: "Oman", stage: "Feasibility", budget: "$3.5B", irr: "11.5%", type: "Ammonia" },
    { id: "5", name: "Egypt Wind Farm", location: "Egypt", stage: "Sourcing", budget: "$300M", irr: "9.1%", type: "Wind" },
];

const MOCK_KPI: KpiData = {
    aum: "$500M",
    activeProjects: 12,
    carbonOffset: "1.2M tCO2",
    irr: "14.2%"
};

const MOCK_CARBON_FORECAST = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 280 },
    { name: 'May', value: 590 },
    { name: 'Jun', value: 350 },
    { name: 'Jul', value: 600 },
];

export function useProjects() {
    return useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
            try {
                return await apiClient<Project[]>("/api/projects");
            } catch (error) {
                // Fall back to mock data on API failure
                console.warn("API request failed, using mock project data", error);
                return MOCK_PROJECTS;
            }
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
    });
}

export function useKpi() {
    return useQuery({
        queryKey: ["kpi"],
        queryFn: async () => {
            try {
                return await apiClient<KpiData>("/api/kpi");
            } catch (error) {
                // Fall back to mock data on API failure
                console.warn("API request failed, using mock KPI data", error);
                return MOCK_KPI;
            }
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });
}

export function useCarbonForecast() {
    return useQuery({
        queryKey: ["carbon-forecast"],
        queryFn: async () => {
            try {
                return await apiClient<any[]>("/api/carbon/forecast");
            } catch (error) {
                // Fall back to mock data on API failure
                console.warn("API request failed, using mock carbon forecast data", error);
                return MOCK_CARBON_FORECAST;
            }
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });
}
